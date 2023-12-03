# Ejecución local (no usar si esta en ec2)

## Antes de Empezar con Playwright 4-48.9
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
Asegúrese de tener Docker instalado y, dentro de la carpeta de Playwright de la versión 4-48.9, ejecute los siguientes comandos en la terminal para levantar los contenedores de la base de datos y Ghost:

```bash
$ docker compose up -d
```
Espere a que Ghost esté disponible. Puede verificar su estado accediendo a http://localhost:8080/ghost/#/signin. Esto puede tardar aproximadamente 20 segundos.

Ahora deberá ubicar el archivo de playwright.config.ts y modificar la ruta del archivo de


``` js
  use: {
    /* Base URL to use in actions like `await page.goto('/')`. */
    baseURL: 'http://localhost:8080/',
```

5. Ejecución de las Pruebas: 
Ejecute las pruebas automatizadas con el siguiente comando:

```bash
$ cd playwright-ghost-5-74.5
$ npm install
$ npx playwright install chrome
# $ npx playwright install-deps firefox
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
Para eliminar los contenedores, volúmenes e imágenes existentes, puede utilizar los siguientes comandos (siempre asegúrese de ubicar en la versión de playwright correcta):

```bash
$ docker compose down --rmi all  # Detendrá e eliminará los servicios definidos en el archivo docker-compose.yml además eliminará todas las imágenes utilizadas por los servicios.
$ docker volume rm $(docker volume ls -q)  # Eliminará todos los volúmenes creados por los servicios.
```

2. Siga nuevamente los pasos de ejecución iniciales

### Nota Importante
Asegúrese de ejecutar estos pasos con precaución, ya que eliminará todos los datos existentes y empezará desde cero. Este enfoque es útil cuando se realizan cambios significativos en la configuración o en el código del proyecto.