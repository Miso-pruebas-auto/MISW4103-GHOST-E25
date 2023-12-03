'use strict';
const fs = require('fs').promises;
const path = require('path');
const argv = require('yargs').argv;

/**
 * Obtener cada una de la rutas de las imagenes por scenario
 * @param {*} excludeFile   - Archivo a excluir
 */
async function getImagesFromFolder(folderPath) {
  try {
    const files = await fs.readdir(folderPath);
    const sortedFiles = files.sort((a, b) => {
      const regex = /\d+/;
      const numberA = parseInt(a.match(regex)[0], 10);
      const numberB = parseInt(b.match(regex)[0], 10);
      return numberA - numberB;
    });
    return sortedFiles.filter(file => file.toLowerCase().endsWith('.png'));
  } catch (error) {
    console.error(`Error al leer la carpeta ${folderPath}: `, error);
    throw error;
  }
}

async function cleanReferenceImages(folderPath) {
  try {
    const referenceFolder = path.join(__dirname, folderPath);
    try {
      await fs.access(referenceFolder, fs.constants.F_OK);
    } catch (err) {
      return;
    }
    const files = await fs.readdir(referenceFolder);
    for (const file of files) {
      const filePath = path.join(referenceFolder, file);
      if (path.extname(file).toLowerCase() === '.png' || path.extname(file).toLowerCase() === '.js' || path.extname(file).toLowerCase() === '.html') {
        await fs.unlink(filePath);
      } else if ((await fs.stat(filePath)).isDirectory()) {
        await fs.rm(filePath, { recursive: true, force: true });
      }
    }
    console.log(`Carpeta ${referenceFolder} limpiada.`);
  } catch (error) {
    console.error(`Error al limpiar carpeta de bits de referencia`, error);
    throw error;
  }
}

/**
 * Genera la configuración de los escenarios de BackstopJS
 * @param {*} scenariosData - Datos de los escenarios
 * @param {*} misMatchThreshold - Umbral de diferencia entre imágenes
 */
async function generateScenarioConfig(scenariosData, misMatchThreshold) {
  const scenarios = [];
  const urlImages = await getImagesFromFolder(scenariosData.url);
  const refUrlImages = await getImagesFromFolder(scenariosData.referenceUrl);
  if (urlImages.length !== refUrlImages.length) {
    console.warn(`El número de imágenes en las carpetas de referencia y prueba no coincide para el escenario ${scenaryName}.`);
  } else {
    const scenarioConfig = urlImages.map((referenceImage, index) => ({
      label: `Functionality: ${scenariosData.funtionality} - scenario: ${scenariosData.scenary} - Step: ${index + 1}`,
      url: path.join(scenariosData.url, referenceImage),
      referenceUrl: path.join(scenariosData.referenceUrl, refUrlImages[index]),
      readyEvent: '',
      delay: 0,
      misMatchThreshold,
      readySelector: "",
      hideSelectors: [],
      removeSelectors: [],
      hoverSelector: "",
      clickSelector: "",
      postInteractionWait: 0,
      selectors: [],
      selectorExpansion: true,
      expect: 0,
      requireSameDimensions: true
    }))
    scenarios.push(...scenarioConfig);
  }
  return scenarios;
}

/**
 * Genera estructura de configuración de escenarios de BackstopJS
 * @param {*} id - Identificador del escenario
 * @param {*} scenarios - Escenarios
 * @param {*} bitmaps_reference - Ruta de la carpeta de imágenes de referencia
 * @param {*} bitmaps_test - Ruta de la carpeta de imágenes de prueba
 * @param {*} engine_scripts - Ruta de la carpeta de scripts de motor
 * @param {*} html_report - Ruta de la carpeta de reportes HTML
 */
async function generateBackStopConfig(
    id,
    scenarios,
    bitmaps_reference,
    bitmaps_test,
    engine_scripts,
    html_report,
    ci_report,
  ) {
  return {
    id,
    onBeforeScript: "puppet/onBefore.js",
    onReadyScript: "puppet/onReady.js",
    viewports: [
      {
        label: 'desktop',
        width: 800,
        height: 600
      },
    ],
    scenarios,
    paths: {
      bitmaps_reference,
      bitmaps_test,
      engine_scripts,
      html_report,
      ci_report,
    },
    report: ['html'],
    engine: 'puppeteer',
    engineOptions: {
      headless: 'new',
      args: ['--no-sandbox'],
    },
    asyncCaptureLimit: 5,
    asyncCompareLimit: 50,
    debug: false,
    debugWindow: false,
  };
}

/**
 * Genera el archivo de configuración de BackstopJS
 * @param {*} misMatchThreshold - Umbral de diferencia entre imágenes
 */
async function saveBackStopConfig(misMatchThreshold, unique) {
  const backstopConfigs = [];
  // Lee el archivo de configuración de escenarios
  const scenariosFilePath = path.join(__dirname, 'scenarios.json');
  const scenariosContent = await fs.readFile(scenariosFilePath, 'utf-8');
  const scenarios = await JSON.parse(scenariosContent).scenarios;
  if (unique) {
    const combinedScenarios = [];
    for (const scenario of scenarios) {
      const result = await generateScenarioConfig(scenario, misMatchThreshold);
      combinedScenarios.push(...result);
    }
    const backstopConfig = await generateBackStopConfig(
      `Ghost - VRT - All Scenarios`,
      combinedScenarios,
      '../backstop-report/bitmaps_reference',
      '../backstop-report/bitmaps_test',
      'backstop_data/engine_scripts',
      '../backstop-report',
      'backstop_data/ci_report/all',
    );
    const configFilePath = path.join(__dirname, `backstop.json`);
    await fs.writeFile(configFilePath, JSON.stringify(backstopConfig, null, 2), 'utf-8');
    console.log(`\n ============================== \n Ahora puede ejecutar: npm run test:scenary:all \n ==============================`);
  } else {
    for (const scenario of scenarios) {
      const result = await generateScenarioConfig(scenario, misMatchThreshold);
      const folderName = `${scenario.funtionality}_${scenario.scenary}`.replace(/\s+/g, '_');
      const backstopConfig = await generateBackStopConfig(
        `Ghost - VRT - ${scenario.funtionality} - ${scenario.scenary}`,
        result,
        `backstop_data/bitmaps_reference/${folderName}`,
        `backstop_data/bitmaps_test/${folderName}`,
        'backstop_data/engine_scripts',
        `backstop_data/html_report/${scenario.funtionality} ${scenario.scenary}`,
        `backstop_data/ci_report/${folderName}`,
      );
      backstopConfig['name'] = `${scenario.scenary.replace(/\s+/g, '_')}`;
      //AGREGAR CONFIGURACION DE ESCENARIOS
      await backstopConfigs.push(backstopConfig);
    }
    for (const [index, backstopConfig] of backstopConfigs.entries()) {
      const configFilePath = path.join(__dirname, `backstop_${backstopConfig.name}.json`);
      console.log(`Ahora puede ejecutar la prueba: node runBackStop.js --config=backstop_${backstopConfig.name}.json`);
      delete backstopConfig.name;
      await fs.writeFile(configFilePath, JSON.stringify(backstopConfig, null, 2), 'utf-8');
      console.log('------------------------------------------------------');
    }
  }
}

async function main() {
    const misMatch = argv.misMatchThreshold;
    const unique = argv.unique;
    try {
        //LIMPIA CARPETA DE REFERENCIA
        const reportFolderPath = '../backstop-report'
        await cleanReferenceImages(reportFolderPath);
        const folderPath = 'backstop_data/bitmaps_reference'
        await cleanReferenceImages(folderPath);
        //GENERA CONFIGURACIONES DE BACKSTOP POR CADA SCENARIO
        saveBackStopConfig(misMatch, unique);
    } catch (e) {
        console.error('Error al ejecturar VRT: ', e);
    }
}

main();