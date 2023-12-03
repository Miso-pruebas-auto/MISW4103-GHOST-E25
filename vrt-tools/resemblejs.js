const compareImages = require("resemblejs/compareImages");
const fs = require("mz/fs");
const path = require("path");
const ignoreFiles = [".DS_Store", ".gitkeep"];


function getImagesToCompare(paths) {
  const featuresToCompare = {};

  return new Promise((resolve, reject) => {
    paths.forEach(async (folder) => {
      const ghostVersion = folder.split("/")[1];

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
            return parseInt(a.split("/").pop().split(".")[0]) - parseInt(b.split("/").pop().split(".")[0]);
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
      }, errorType: "movement", transparency: 0.3, largeImageThreshold: 1200, useCrossOrigin: false, outputDiff: true
    }, scaleToSameSize: true, ignore: "antialiasing"
  };


  console.log("Comparing images...");
  console.log(from);
  console.log(to);
  console.log("__________________________");

  return await compareImages(await fs.readFile(from), await fs.readFile(to), options);
}

async function makeDir(dirPath) {
  try {
    await fs.mkdir(dirPath, { recursive: true });
  } catch (err) {
    if (err.code !== "EEXIST") throw err;
  }
}

async function compare(paths, framework) {
  return new Promise(async (resolve, reject) => {
    const images = await getImagesToCompare(paths);
    const results = [];
    const missing = [];


    for (const [key, steps] of Object.entries(images)) {
      if (steps.length === 2) {
        const from = steps[0];
        const to = steps[1];

        const longer = from.length > to.length ? from.steps : to.steps;
        const shorter = from.length <= to.length ? to.steps : from.steps;

        const resultArr = longer.map((step, i) => {
          const afterLastSlash = step.split("/").pop();
          const equivalent = shorter.find((shorterStep) => {
            return shorterStep.split("/").pop() === afterLastSlash;
          });

          return [
            step, equivalent
          ];
        });


        for (const [i, buffer] of resultArr.entries()) {
          const fromStep = buffer[0];
          const toStep = buffer[1];
          const missingStep = () => {
            if (!toStep && !fromStep) {
              return "Both steps are missing";
            }

            return fromStep ? fromStep : toStep;
          };

          if (!fromStep || !toStep) {
            missing.push({
              from: fromStep || "missing", to: toStep || "missing"
            });

            console.log("Missing step:", missingStep());
          }


          const resultPath = `./results/resemblejs/${key}`;
          const nextJsImagesPath = path.join(__dirname, `../resemble-report/public/results/${framework}`, key);
          const nextJsResultsPath = path.join(__dirname, `../resemble-report/src/results/${framework}`, key);
          const result = fromStep && toStep ? await getDifferenceForImage(fromStep, toStep) : null;

          results.push({
            path: key, compare: `${i + 1}.png`, from: fromStep, to: toStep, data: result
          });

          await toNextJs(nextJsResultsPath, nextJsImagesPath, i, result, fromStep, toStep);
        }
      }
    }

    resolve(results, missing);
  });
}

async function toNextJs(nextJsPath, imagesPath, i, result, fromStep, toStep) {
  const buffer = path.join(__dirname, "images/missing.png");

  await makeDir(nextJsPath);
  await makeDir(imagesPath);
  if (!result) {
    await copyFile(buffer, `${imagesPath}/${i + 1}.png`);
  } else {
    await storeResult(`${imagesPath}/${i + 1}.png`, result);
  }
  await copyFile(fromStep ?? buffer, `${imagesPath}/${i + 1}-from.png`);
  await copyFile(toStep ?? buffer, `${imagesPath}/${i + 1}-to.png`);
}

async function storeResult(resultPath, result) {
  await fs.writeFile(resultPath, result.getBuffer());
}

async function copyFile(source, target) {
  await fs.copyFile(source, target);
}

compare(["../playwright-ghost-4-48.9/screenshots", "../playwright-ghost-5.74.5/screenshots"], "playwright").then(async (res) => {
  await fs.writeFile("../resemble-report/src/results/playwright/results.json", JSON.stringify(res, null, 2));
  console.log("Images compared successfully");
});
