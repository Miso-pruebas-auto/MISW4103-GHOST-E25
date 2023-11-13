# Entorno de Pruebas de Kraken

## Introducción

Este proyecto usa [Kraken](https://github.com/TheSoftwareDesignLab/Kraken) para ejecutar pruebas E2E en la aplicación
GHOST.

## Requisitos del Sistema

Para ejecutar este proyecto, necesitarás las siguientes versiones de software:

- Node.js v16.20.2
- npm v8.19.4
- Appium v2.2.1
- Java versión "20.0.2" 2023-07-18
- Android Studio 2023.1 Patch 3

**Nota**: Sugerimos usar [nvm](https://github.com/nvm-sh/nvm) para instalar y administrar las versiones de Node.js y
npm.

## Pre-requisitos

Asegúrate de tener una versión estable de Node.js y el manejador de paquetes npm actualizado de acuerdo con la versión
de Node.js.

Para la ejecución de los scripts manejados en `package.json`, se hace uso de `npx`.

Además, es importante tener instalado y configurado el SDK de
Android: [Como configurar el SDK de Android 14](https://developer.android.com/about/versions/14/setup-sdk?hl=es-419).

## Configuración de Entorno

### Windows

Es necesario tener la variable de entorno `ANDROID_HOME` apuntando a tu instalación del SDK de Android y agregar la ruta
de las herramientas de plataforma a tu variable de entorno `PATH`. Por ejemplo:

```
ANDROID_HOME=C:\Users\<TuUsuario>\AppData\Local\Android\Sdk
PATH=%PATH%;%ANDROID_HOME%\platform-tools
```

Reemplaza `<TuUsuario>` con tu nombre de usuario actual donde instalaste Android Studio.

### Mac

Para configurar el entorno de pruebas, se debe tener instalado y configurado el SDK de Android.

Luego, debes modificar el archivo `~/.zshrc` o `~/.bashrc` y agregar las siguientes líneas:

```
export ANDROID_HOME=/Users/$USER/Library/Android/sdk
export ANDROID_SDK_ROOT=$ANDROID_HOME
PATH="$PATH:$ANDROID_HOME/emulator:$ANDROID_HOME/tools:$ANDROID_HOME/platform-tools"
```

Recuerda reiniciar la terminal para que los cambios surtan efecto.

## Instalación

### Clonar el repositorio

Para clonar el repositorio, sigue estos pasos:

```bash
git clone https://github.com/nipoanz/MISW4103-GHOST-E25.git
```

### Instalar dependencias

Para configurar el entorno de pruebas, sigue estos pasos:

1. Instalar Appium de manera global
    - `npm install -g appium`
2. Instalar Kraken de manera global
    - `npm install -g kraken`
3. Navega a la carpeta de Kraken.
    - `cd kraken`
4. Ejecuta `npm install` para instalar las dependencias del proyecto.

## Ejecución de Pruebas
Para validar la configuración de Kraken, asegúrate de que los prerequisitos estén instalados y configurados
correctamente y luego procede a ejecutar los scripts definidos en el archivo `package.json`.

Puedes usar los siguientes comandos para ejecutar las pruebas:

- `npm run doctor` para validar la configuración de Kraken.
- `npm run kraken` para ejecutar las pruebas de Kraken.
