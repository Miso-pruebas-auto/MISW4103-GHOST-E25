const compareImages = require('resemblejs/compareImages');
const fs = require('mz/fs');
const path = require('path');
const ignoreFiles = ['.DS_Store', '.gitkeep'];


function getImagesToCompare(paths) {
  const featuresToCompare = {};

  return new Promise((resolve, reject) => {
    paths.forEach(async (folder) => {
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
            featuresToCompare[folderName] = [{
              ghostVersion, steps: stepWithEntirePath
            }];
          } else {
            featuresToCompare[folderName].push({
              ghostVersion, steps: stepWithEntirePath
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
        red: 255, green: 0, blue: 255
      }, errorType: 'movement', transparency: 0.3, largeImageThreshold: 1200, useCrossOrigin: false, outputDiff: true
    }, scaleToSameSize: true, ignore: 'antialiasing'
  };


  console.log('Comparing images...');
  console.log(from);
  console.log(to);
  console.log('__________________________');

  return await compareImages(await fs.readFile(from), await fs.readFile(to), options);
}

async function makeDir(dirPath) {
  try {
    await fs.mkdir(dirPath, { recursive: true });
  } catch (err) {
    if (err.code !== 'EEXIST') throw err;
  }
}

async function compare(paths, framework) {
  return new Promise(async (resolve, reject) => {
    const images = await getImagesToCompare(paths);
    const results = [];

    for (const [key, steps] of Object.entries(images)) {
      if (steps.length === 2) {
        const from = steps[0];
        const to = steps[1];

        for (let i = 0; i < from.steps.length; i++) {
          const fromStep = from.steps[i];
          const toStep = to.steps[i];
          const resultPath = `./results/resemblejs/${key}`;
          const nextJsImagesPath = path.join(__dirname, `../resemble-report/public/results/${framework}`, key);
          const nextJsResultsPath = path.join(__dirname, `../resemble-report/src/results/${framework}`, key);
          const result = await getDifferenceForImage(fromStep, toStep);

          results.push({
            path: key, compare: `${i + 1}.png`, from: fromStep, to: toStep, data: result
          });

          await toNextJs(nextJsResultsPath, nextJsImagesPath, i, result, fromStep, toStep);
        }
      }
    }

    resolve(results);
  });
}

async function toNextJs(nextJsPath, imagesPath, i, result, fromStep, toStep) {
  await makeDir(nextJsPath);
  await makeDir(imagesPath);
  await storeResult(`${imagesPath}/${i + 1}.png`, result);
  await copyFile(fromStep, `${imagesPath}/${i + 1}-from.png`);
  await copyFile(toStep, `${imagesPath}/${i + 1}-to.png`);
}

async function storeResult(resultPath, result) {
  await fs.writeFile(resultPath, result.getBuffer());
}

async function copyFile(source, target) {
  await fs.copyFile(source, target);
}

compare(['../kraken-ghost-4-38.0/screenshots', '../kraken-ghost-4-48.9/screenshots'], 'kraken').then(async (res) => {
  await fs.writeFile('../resemble-report/src/results/kraken/results.json', JSON.stringify(res, null, 2));
  console.log('Images compared successfully');
});

compare(['../playwright-ghost-4-38.0/screenshots', '../playwright-ghost-4-48.9/screenshots'], 'playwright').then(async (res) => {
  await fs.writeFile('../resemble-report/src/results/playwright/results.json', JSON.stringify(res, null, 2));
  console.log('Images compared successfully');
});
