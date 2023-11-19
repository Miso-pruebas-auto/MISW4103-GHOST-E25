# Visual Regression Testing Tools

## Introducción

Este proyecto contiene las pruebas de regresión visual para la aplicación GHOST en ambas versiones previamente seleccionadas(4.38.0 y 4.48.9) de Kraken y Playwright. Se utilizan las siguientes herramientas:

- [BackstopJS]()
- [ResembleJS](https://github.com/rsmbl/Resemble.js)

## Estructura del Proyecto

```
vrt-tools
|_resemblejs.js
```

## Requisitos del Sistema

Para ejecutar este proyecto, necesitarás las siguientes versiones de software:

- Node.js LTS
- npm LTS

**Nota**: Sugerimos usar [nvm](https://github.com/nvm-sh/nvm) para instalar y administrar las versiones de Node.js y npm.

## Instalación

Para instalar las dependencias del proyecto, ejecute el siguiente comando:

```bash
npm install
```

## Ejecución de las Pruebas

### ResembleJs

#### Kraken & Playwright
Es importante que primero debe ejecutar las pruebas de kraken y playwright en ambas versiones para que se generen las imagenes de referencia, luego de esto puede ejecutar las pruebas de regresión visual.

Documentación de las pruebas de kraken y playwright:

- [Kraken Ghost 4.38.0](../kraken-ghost-4-38.0/README.md)
- [Kraken Ghost 4.48.9](../kraken-ghost-4-48.9/README.md)
- [Playwright Ghost 4.38.0](../playwright-ghost-4-38.0/readme-ejecucion-local.md)
- [Playwright Ghost 4.48.9](../playwright-ghost-4-48.9/readme-ejecucion-local.md)

Una vez se hayan ejecutado las pruebas de kraken y playwright, solo deben ejecutar el siguiente comando:

```bash
npm run resemble
```

Este comando se encargará de seleccionar las imagenes de referencia y compararlas, ademas de actualizar el proyecto de NextJS(resemble-report) con las imagenes de referencia y las imagenes de comparación. Para posteriormente generar el reporte de las pruebas de regresión visual.

Por favor, leer la documentacion de [resemble-report](../resemble-report/README.md) para mas información sobre como visualizar el reporte.


