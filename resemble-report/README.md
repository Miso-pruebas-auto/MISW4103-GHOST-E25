# Resemble Report

Proyecto de NextJS para visualizar el reporte de las pruebas de regresión visual de la herramienta usando ResembleJS para la aplicación GHOST en ambas versiones previamente seleccionadas(4.38.0 y 4.48.9). 

Provee visualización de las imagenes de referencia y las imagenes de comparación generadas para Kraken y Playwright.

## Prerequisitos

Para ejecutar este proyecto, necesitarás las siguientes versiones de software:

- Node.js LTS
- npm LTS

Es importante que primero debe ejecutar las pruebas de kraken y playwright en ambas versiones para que se generen las imagenes de referencia, luego de esto puede ejecutar las pruebas de regresión visual.

Documentación de las pruebas de kraken y playwright:

- [Kraken Ghost 4.38.0](../kraken-ghost-4-38.0/README.md)
- [Kraken Ghost 4.48.9](../kraken-ghost-4-48.9/README.md)
- [Playwright Ghost 4.38.0](../playwright-ghost-4-38.0/readme-ejecucion-local.md)
- [Playwright Ghost 4.48.9](../playwright-ghost-4-48.9/readme-ejecucion-local.md)


Posteriormente, se debe ejecutar las pruebas de regresión visual con ResembleJS previamente, para esto puede seguir los pasos de la documentación de [vrt-tools](../vrt-tools/README.md).

## Instalación

Para instalar las dependencias del proyecto, ejecute el siguiente comando:

```bash
npm install
```

## Ejecución
Una vez haya ejecutado tanto las pruebas de kraken y playwright, como las pruebas de regresión visual con ResembleJS, puede ejecutar el proyecto de NextJS para visualizar el reporte de las pruebas de regresión visual.

Para ejecutar el proyecto, tiene dos opciones:

### Development server
Esta opción le permite ejecutar el proyecto en modo desarrollo, para esto debe ejecutar el siguiente comando:

```bash
npm run dev
```

### Production server
Esta opción le permite ejecutar el proyecto en modo producción, para esto debe ejecutar el siguiente comando:

```bash
npm run build
npm run start
```

Una vez haya ejecutado cualquiera de las dos opciones, puede acceder al proyecto en el siguiente enlace: [http://localhost:3000](http://localhost:3000)

### Visualización del Reporte en Vercel
Para facilitar la visualización del reporte de ResembleJs, se ha creado un sitio web en Vercel, con el fin de que pueda visualizar el reporte de manera más sencilla. Para acceder a él, puede hacerlo a través del siguiente enlace: [https://misw-4103-ghost-e25.vercel.app/](https://misw-4103-ghost-e25.vercel.app/)

Este proyecto ya contiene un previo reporte de ResembleJs ejecutado por nosotros, por lo que puede visualizarlo sin necesidad de ejecutar el proyecto localmente.
