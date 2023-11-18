const compareImages = require('resemblejs/compareImages');
const fs = require('mz/fs');

const resultScreenshotFolders = [
  '../kraken-ghost-4-38.0/screenshots',
  '../kraken-ghost-4-48.9/screenshots'
];

const ignoreFiles = ['.DS_Store', '.gitkeep'];


function getImagesToCompare() {
  const featuresToCompare = {};

  return new Promise((resolve, reject) => {
    resultScreenshotFolders.forEach(async (folder) => {
      const ghostVersion = folder.split('/')[1];

      const items = await fs.readdir(folder);

      if (items.length === 0) {
        console.log(`No screenshots found in ${folder}`);
        reject();
        return;
      }

      const features = items.filter((item) => !ignoreFiles.includes(item));

      for (const feature of features) {
        const scenarios = await fs.readdir(`${folder}/${feature}`);

        if (scenarios.length === 0) {
          console.log(`No scenarios found in ${folder}/${feature}`);
          reject();
          continue;
        }

        for (const scenario of scenarios) {
          const steps = await fs.readdir(`${folder}/${feature}/${scenario}`);

          if (steps.length === 0) {
            console.log(`No steps found in ${folder}/${feature}/${scenario}`);
            reject();
            continue;
          }

          const stepWithEntirePath = steps.map((step) => {
            return `${folder}/${feature}/${scenario}/${step}`;
          }).sort((a, b) => {
            return parseInt(a.split('/').pop().split('.')[0]) - parseInt(b.split('/').pop().split('.')[0]);
          });


          const folderName = `${feature}/${scenario}`;

          if (!featuresToCompare[folderName]) {
            featuresToCompare[folderName] = [
              {
                ghostVersion,
                steps: stepWithEntirePath
              }
            ];
          } else {
            featuresToCompare[folderName].push({
              ghostVersion,
              steps: stepWithEntirePath
            });
          }
        }
      }

      resolve(featuresToCompare);
    });
  });
}

async function getDifferenceForImage(from, to) {
  const options = {
    output: {
      errorColor: {
        red: 255,
        green: 0,
        blue: 255
      },
      errorType: 'movement',
      transparency: 0.3,
      largeImageThreshold: 1200,
      useCrossOrigin: false,
      outputDiff: true
    },
    scaleToSameSize: true,
    ignore: 'antialiasing'
  };


  console.log('Comparing images...');
  console.log(from);
  console.log(to);
  console.log('__________________________');

  return await compareImages(
    await fs.readFile(from),
    await fs.readFile(to),
    options
  );
}

async function makeDir(dirPath) {
  try {
    await fs.mkdir(dirPath, { recursive: true });
  } catch (err) {
    if (err.code !== 'EEXIST') throw err;
  }
}

async function compare() {
  const images = await getImagesToCompare();

  for (const [key, steps] of Object.entries(images)) {
    if (steps.length === 2) {
      const from = steps[0];
      const to = steps[1];

      for (let i = 0; i < from.steps.length; i++) {
        const fromStep = from.steps[i];
        const toStep = to.steps[i];
        const resultPath = `./results/resemblejs/${key}`;
        const result = await getDifferenceForImage(fromStep, toStep);

        await makeDir(resultPath);
        await storeResult(`${resultPath}/${i + 1}.png`, result);
      }
    }
  }
}

async function storeResult(resultPath, result) {
  await fs.writeFile(resultPath, result.getBuffer());
}

compare().then((res) => {
  console.log('Images compared successfully');
});
