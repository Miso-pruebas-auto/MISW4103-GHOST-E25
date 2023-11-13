# Entorno de Pruebas de Kraken

## Introducción

Este proyecto usa [Kraken](https://github.com/TheSoftwareDesignLab/Kraken) para ejecutar pruebas E2E en la aplicación
GHOST.

## Estructura del Proyecto
```
features
|_web
| |_step_definitions
| | |_step.js
| | |_tags.js
| | |_pages.js
| | |_posts.js
| | |_settings.js
| | |_common.js
| |_support
| | |_hooks.js
| | |_config.js
| | |_support.js
|_posts.feature
|_settings.feature
|_tags.feature
|_members.feature
|_pages.feature
properties.json
mobile.json
```

Como se puede observar cada `.feature` tiene su respectivo archivo `.js` en la carpeta `step_definitions`. Esto con la finalidad de tener un orden en el código y que sea más fácil de mantener.

El archivo `properties.json` contiene las propiedades de la aplicación web, como el URL base, el usuario y la contraseña. Estas propiedades ya poseen un valor por defecto, pero pueden ser modificadas según sea necesario. Debe seguir el siguiente formato:

```json
{
    "GHOST_URL": "",
    "USERNAME": "",
    "PASSWORD": ""
}
```

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

### Docker
Configuración del Entorno Docker Asegúrese de tener Docker instalado y, ejecute los siguientes comandos en la carpeta raiz del proyecto para levantar los contenedores de la base de datos y Ghost:

```bash
$ docker-compose up -d db
$ docker-compose up -d ghost
```

Espere a que Ghost esté disponible. Puede verificar su estado accediendo a http://localhost:2368/ghost/#/signin. Esto puede tardar aproximadamente 20 segundos.

#### Re-Ejecución del Proyecto
Si desea volver a ejecutar el proyecto desde cero, siga estos pasos para limpiar y reconstruir los contenedores y las imágenes:

1. Limpieza de Contenedores, Volúmenes e Imágenes
   Para eliminar los contenedores, volúmenes e imágenes existentes, puede utilizar los siguientes comandos:

```bash
$ docker-compose down -v    # Detiene y elimina contenedores y volúmenes
$ docker rmi $(docker images -a -q) -f    # Elimina todas las imágenes de Docker
```
Asegúrese de revisar y confirmar que desea eliminar estos recursos antes de proceder.

2. Reconstrucción y Ejecución de Contenedores
   Después de limpiar el entorno, puede reconstruir y volver a ejecutar los contenedores utilizando los siguientes comandos:

```bash
$ docker-compose up -d db --build    # Reconstruye e inicia el contenedor de la base de datos
$ docker-compose up -d ghost --build    # Reconstruye e inicia el contenedor de Ghost
```
Estos comandos aseguran que los contenedores se construyan con las últimas configuraciones y luego se ejecuten en segundo plano.

### Nota Importante
Asegúrese de ejecutar estos pasos con precaución, ya que eliminará todos los datos existentes y empezará desde cero. Este enfoque es útil cuando se realizan cambios significativos en la configuración o en el código del proyecto.

## Instalación

### Clonar el repositorio

Para clonar el repositorio, sigue estos pasos:

```bash
$ git clone https://github.com/nipoanz/MISW4103-GHOST-E25.git
```

Luego accede a la carpeta de Kraken:

```bash
$ cd MISW4103-GHOST-E25/kraken
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

- `npm run doctor` para validar la configuración de Kraken.
- `npm run kraken` para ejecutar las pruebas de Kraken.

Usa `npm run doctor` para validar la configuración de Kraken. Si todo está bien, deberías ver un mensaje como este:

```bash
$ npm run doctor
```

Es posible que veas algunos warnings, dado que Kraken tambien puede ser utilizado para mobile testing. Puedes ignorarlos.

Una vez que la configuración esté validada, puedes ejecutar las pruebas de Kraken con el siguiente comando:

```bash
$ npm run kraken
```

### Visualización del Reporte
Una vez que las pruebas se hayan ejecutado, puedes visualizar el reporte en el navegador. Primero debes dirigirte a la carpeta `reports` y acceder a la ultima carpeta creada. Luego, debes abrir el archivo `index.html` en el navegador.

```bash
    $ cd reports
    $ cd <carpeta>
    $ open index.html
```

Recuerda reemplazar `<carpeta>` por el nombre de la carpeta que se haya creado al ejecutar las pruebas.
