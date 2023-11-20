"use strict";
const fs = require("fs").promises;
const path = require("path");
const argv = require("yargs").argv;
const { exec } = require("child_process");
const util = require("util");
const execAsync = util.promisify(exec);

/**
 * Renbombra los archivos
 * @param {*} config   - Nombre del archivo de configuración
 * @param {*} report   - Tipo de reporte
 */
async function updateFiles(config, report) {
  let folderPath = "./backstop.json";
  if (config) {
    folderPath = `./${config}`;
  }
  const scenariosFilePath = path.join(__dirname, folderPath);
  const scenariosContent = await fs.readFile(scenariosFilePath, { encoding: 'utf-8' });
  const backstopConfig = await JSON.parse(scenariosContent);
  const scenarios = await backstopConfig.scenarios;
  // console.log(scenarios);
  const updateScenarios = scenarios.map((file) => {
    const referenceUrl = file.url;
    const url = file.referenceUrl;
    return {
      ...file,
      url,
      referenceUrl,
    }
  });
  // console.log(updateScenarios);
  backstopConfig['scenarios'] = updateScenarios;
  backstopConfig['report'] = ['browser']; 
  await fs.writeFile(scenariosFilePath, JSON.stringify(backstopConfig, null, 2), 'utf-8');
}

/**
 * corre un comando de backstop
 * @param {*} config - Nombre del archivo de configuración
 * @param {*} operation - Operación a ejecutar
 */
async function runOperation(config, operation) {
  try {
    let command = operation;
    if (config) command += ` --config=${config}`;
    await execAsync(command)
  } catch (e) {
    //Lo serrores son esperados por la cherramienta de backstop si al principio fallan las pruebas
  }
}
 
async function main() {
  const config = argv.config;
  try {
    console.log(`Ejecutando pruebas...`);
    await runOperation(config, 'backstop test');
    console.log("Actualizando pruebas...");
    await updateFiles(config, 'html');
    console.log("Aceptando pruebas...");
    await runOperation(config, 'backstop approve');
    console.log("Generando Reporte...");
    await runOperation(config, 'backstop test');
    console.log("Limpiando...");
    await updateFiles(config, 'browser');
  } catch (e) {
    console.error("Error: ", e);
  }
}

main();
