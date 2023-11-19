'use strict';
const fs = require('fs');
const path = require('path');
const argv = require('yargs').argv;
const { exec } = require('child_process');
const util = require('util');
const execAsync = util.promisify(exec);

/**
 * Renbombra los archivos
 * @param {*} newExtension  - Nueva extensión
 * @param {*} oldExtension  - Antigua extensión
 * @param {*} excludeFile   - Archivo a excluir
 */
async function renameFiles(newExtension, oldExtension, excludeFile) {
    const folderPath = './features';
    const files = fs.readdirSync(folderPath);
    files.forEach(file => {
        if (file && file.endsWith(oldExtension) && file !== excludeFile) {
            const oldPath = path.join(folderPath, file);
            const newPath = path.join(folderPath, file.replace(`.${oldExtension}`, `.${newExtension}`));
            fs.renameSync(oldPath, newPath);
        }
    });
}

async function runTests() {
    const command = 'npm run kraken';
    await execAsync(command);
}

async function main() {
    const featureFile = argv.feature;
    const fileType = 'md';
    const actualfileType = 'feature';
    try {
        console.log(`Ejecutando pruebas para ${featureFile}`);
        await renameFiles(fileType, actualfileType, featureFile);
        console.log('Ejecutando pruebas...');
        await runTests();
        console.log('Pruebas finalizadas...');
        await renameFiles(actualfileType, fileType, featureFile);
    } catch (e) {
        console.error('Error: ', e);
        await renameFiles(actualfileType, fileType, featureFile);
    }
}

main();