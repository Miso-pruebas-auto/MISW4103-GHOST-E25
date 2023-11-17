# MISW4103 - Pruebas Grupo 25

## Integrantes

| Nombre             | email                           |
|--------------------|---------------------------------|
| Anderson Rodriguez | ja.rodriguezc12@uniandes.edu.co |
| Nicolás Potier     | n.potier@uniandes.edu.co        |
| Felipe Valencia    | jf.valencia23@uniandes.edu.co   |
| Camilo Lesmes      | c.lesmesl@uniandes.edu.co       |

## Funcionalidades

1. Post creación
2. Pagina creación
3. Members creación
4. General settings editar
5. Tag Creación

## Escenarios

| ID | Descripción                                                          | Funcionalidad           |
|----|----------------------------------------------------------------------|-------------------------|
| 01 | Crear un nuevo post con solo titulo y descripción                    | Posts creación          |
| 02 | Crear un nuevo post con solo titulo                                  | Posts creación          |
| 03 | Crear un nuevo post con titulo y descripción y tag                   | Posts creación          |
| 04 | Validar si deja crear un post sin Autor                              | Posts creación          |
| 05 | Creación página pero sin publicarla                                  | Pagina creación         |
| 06 | Creación página y publicarla                                         | Pagina creación         |
| 07 | Borrado de página recién creada                                      | Pagina creación         |
| 08 | Creación página y cancelar su creación                               | Pagina creación         |
| 09 | Creación de Usuario con solo correo y nombre                         | Members creación        |
| 10 | Creación de usuario sin correo y nombre                              | Members creación        |
| 11 | Creación de usuario con  correo Invalido  y nombre                   | Members creación        |
| 12 | Creación de usuario con correo y nombre y cancelar su creación       | Members creación        | 
| 13 | Cambiar el site title con otro nombre                                | General settings editar |
| 14 | Validar edición de title vació                                       | General settings editar |
| 15 | Cambiar la descripción con otra                                      | General settings editar |
| 16 | Dejar la descripción vacía                                           | General settings editar |
| 17 | Creación de tag con titulo y color                                   | Tag Creación            |
| 18 | Creación de tag sin color                                            | Tag Creación            |
| 19 | Creación de tag sin titulo                                           | Tag Creación            |
| 20 | Creación de tag con título y color forzando dos veces el botón crear | Tag Creación            |

## Kraken
Archivo README.md de Kraken: [README.md](./kraken/readme.md)

### Estructura
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

### Requisitos del sistema

Para ejecutar este proyecto, necesitarás las siguientes versiones de software:

- Node.js v16.20.2
- npm v8.19.4
- Appium v2.2.1
- Java versión "20.0.2" 2023-07-18
- Android Studio 2023.1 Patch 3

**Nota**: Sugerimos usar [nvm](https://github.com/nvm-sh/nvm) para instalar y administrar las versiones de Node.js y
npm.

### Pre-requisitos

Asegúrate de tener una versión estable de Node.js y el manejador de paquetes npm actualizado de acuerdo con la versión
de Node.js.

Para la ejecución de los scripts manejados en `package.json`, se hace uso de `npx`.

Además, es importante tener instalado y configurado el SDK de
Android: [Como configurar el SDK de Android 14](https://developer.android.com/about/versions/14/setup-sdk?hl=es-419).

### Configuración de Entorno

#### Windows

Es necesario tener la variable de entorno `ANDROID_HOME` apuntando a tu instalación del SDK de Android y agregar la ruta
de las herramientas de plataforma a tu variable de entorno `PATH`. Por ejemplo:

```
ANDROID_HOME=C:\Users\<TuUsuario>\AppData\Local\Android\Sdk
PATH=%PATH%;%ANDROID_HOME%\platform-tools
```

Reemplaza `<TuUsuario>` con tu nombre de usuario actual donde instalaste Android Studio.

#### Mac

Para configurar el entorno de pruebas, se debe tener instalado y configurado el SDK de Android.

Luego, debes modificar el archivo `~/.zshrc` o `~/.bashrc` y agregar las siguientes líneas:

```
export ANDROID_HOME=/Users/$USER/Library/Android/sdk
export ANDROID_SDK_ROOT=$ANDROID_HOME
PATH="$PATH:$ANDROID_HOME/emulator:$ANDROID_HOME/tools:$ANDROID_HOME/platform-tools"
```

Recuerda reiniciar la terminal para que los cambios surtan efecto.

### Instalación

#### Clonar el repositorio

Para clonar el repositorio, sigue estos pasos:

```bash
$ git clone https://github.com/nipoanz/MISW4103-GHOST-E25.git
```

Luego accede a la carpeta de Kraken:

```bash
$ cd MISW4103-GHOST-E25/kraken
```

#### Instalar dependencias

Para configurar el entorno de pruebas, sigue estos pasos:

1. Instalar Appium de manera global
    - `npm install -g appium`
2. Instalar Kraken de manera global
    - `npm install -g kraken`
3. Navega a la carpeta de Kraken.
    - `cd kraken`
4. Ejecuta `npm install` para instalar las dependencias del proyecto.

#### Inicializar instancia de docker
Configuración del Entorno Docker Asegúrese de tener Docker instalado y, ejecute los siguientes comandos en la carpeta raiz del proyecto para levantar los contenedores de la base de datos y Ghost:

```bash
$ docker compose up -d db-kraken
$ docker compose up -d ghost-kraken
```

Espere a que Ghost esté disponible. Puede verificar su estado accediendo a http://localhost:2368/ghost/#/signin. Esto puede tardar aproximadamente 20 segundos.

### Re-Ejecución del Proyecto
Si desea volver a ejecutar el proyecto desde cero, siga estos pasos para limpiar y reconstruir los contenedores y las imágenes:

1. Limpieza de Contenedores, Volúmenes e Imágenes
   Para eliminar los contenedores, volúmenes e imágenes existentes, puede utilizar los siguientes comandos:

```bash
$ docker-compose down --rmi all  # Detendrá e eliminará los servicios definidos en el archivo docker-compose.yml además eliminará todas las imágenes utilizadas por los servicios.
$ docker volume rm $(docker volume ls -q)  # Eliminará todos los volúmenes creados por los servicios.
```
Asegúrese de revisar y confirmar que desea eliminar estos recursos antes de proceder.

2. Reconstrucción y Ejecución de Contenedores
   Después de limpiar el entorno, puede reconstruir y volver a ejecutar los contenedores utilizando los siguientes comandos:

```bash
$ docker compose up -d db-kraken --build    # Reconstruye e inicia el contenedor de la base de datos
$ docker compose up -d ghost-kraken --build    # Reconstruye e inicia el contenedor de Ghost
```
Estos comandos aseguran que los contenedores se construyan con las últimas configuraciones y luego se ejecuten en segundo plano.

#### Nota Importante
Asegúrese de ejecutar estos pasos con precaución, ya que eliminará todos los datos existentes y empezará desde cero. Este enfoque es útil cuando se realizan cambios significativos en la configuración o en el código del proyecto.


### Ejecución de Pruebas
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


## Playwright

Archivo README.md de Playwright: [README.md](./playwright/readme.md)


## Antes de Empezar con Playwright
Antes de comenzar con las pruebas automatizadas utilizando Playwright, siga estos pasos para configurar el entorno y ejecutar las pruebas de extremo a extremo.
1. Requisitos Previos: 
Asegúrese de tener Docker instalado en su sistema. Si está utilizando Windows, se recomienda Docker Desktop.

2. Clonar el Repositorio: 
Clone el repositorio en su máquina local y navegue a la carpeta de Playwright utilizando los siguientes comandos: 
```bash
$ git clone https://github.com/nipoanz/MISW4103-GHOST-E25
$ cd MISW4103-GHOST-E25/playwright
```

3. Configuración de Node.js con NVM: 
Se recomienda utilizar Node Version Manager (NVM) para administrar las versiones de Node.js. Asegúrese de tener NVM instalado y, si no tiene la versión 16.14.2 de Node.js, puede instalarla y activarla con los siguientes comandos:
```bash
$ nvm ls
$ nvm install 16.14.2
$ nvm use 16.14.2
```
4. Configuración del Entorno Docker: 
Asegúrese de tener Docker instalado y, dentro de la carpeta de Playwright, ejecute los siguientes comandos en la terminal para levantar los contenedores de la base de datos y Ghost:

```bash
$ docker compose up -d db-playwright
$ docker compose up -d ghost-playwright
```
Espere a que Ghost esté disponible. Puede verificar su estado accediendo a http://localhost:2368/ghost/#/signin. Esto puede tardar aproximadamente 20 segundos.

5. Ejecución de las Pruebas: 
Ejecute las pruebas automatizadas con el siguiente comando:

```bash
$ npm install
$ npx playwright install firefox
$ npx playwright install-deps firefox
$ npx playwright test --workers=1
```

6. Visualización del Reporte: 
Para visualizar el informe y revisar los pasos con el patrón Given-When-Then, ejecute:

```bash
$ npx playwright show-report
```

Siga estos pasos para asegurarse de que su entorno esté configurado correctamente y para ejecutar las pruebas de Playwright de manera eficiente.

## Re-Ejecución del Proyecto
Si desea volver a ejecutar el proyecto desde cero, siga estos pasos para limpiar y reconstruir los contenedores y las imágenes:

1. Limpieza de Contenedores, Volúmenes e Imágenes: 
Para eliminar los contenedores, volúmenes e imágenes existentes, puede utilizar los siguientes comandos:

```bash
$ docker compose down -v # Detiene y elimina contenedores y volúmenes
$ docker rmi $(docker images -a -q) -f    # Elimina todas las imágenes de Docker
```
Asegúrese de revisar y confirmar que desea eliminar estos recursos antes de proceder.

2. Reconstrucción y Ejecución de Contenedores: 
Después de limpiar el entorno, puede reconstruir y volver a ejecutar los contenedores utilizando los siguientes comandos:

```bash
$ docker compose up -d db-playwright --build    # Reconstruye e inicia el contenedor de la base de datos
$ docker compose up -d ghost-playwright --build    # Reconstruye e inicia el contenedor de Ghost
```
Estos comandos aseguran que los contenedores se construyan con las últimas configuraciones y luego se ejecuten en segundo plano.

### Nota Importante
Asegúrese de ejecutar estos pasos con precaución, ya que eliminará todos los datos existentes y empezará desde cero. Este enfoque es útil cuando se realizan cambios significativos en la configuración o en el código del proyecto.
