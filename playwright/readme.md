
## Antes de Empezar con Playwright
Antes de comenzar con las pruebas automatizadas utilizando Playwright, siga estos pasos para configurar el entorno y ejecutar las pruebas de extremo a extremo.
1. Requisitos Previos
Asegúrese de tener Docker instalado en su sistema. Si está utilizando Windows, se recomienda Docker Desktop.

2. Clonar el Repositorio
Clone el repositorio en su máquina local y navegue a la carpeta de Playwright utilizando los siguientes comandos: 
```bash
$ git clone https://github.com/nipoanz/MISW4103-GHOST-E25
$ cd MISW4103-GHOST-E25/playwright
```

3. Configuración de Node.js con NVM
Se recomienda utilizar Node Version Manager (NVM) para administrar las versiones de Node.js. Asegúrese de tener NVM instalado y, si no tiene la versión 16.14.2 de Node.js, puede instalarla y activarla con los siguientes comandos:
```bash
$ nvm ls
$ nvm install 16.14.2
$ nvm use 16.14.2
```
4. Configuración del Entorno Docker
Asegúrese de tener Docker instalado y, dentro de la carpeta de Playwright, ejecute los siguientes comandos en la terminal para levantar los contenedores de la base de datos y Ghost:

```bash
$ docker compose up -d db-playwright
$ docker compose up -d ghost-playwright
```
Espere a que Ghost esté disponible. Puede verificar su estado accediendo a http://localhost:2368/ghost/#/signin. Esto puede tardar aproximadamente 20 segundos.

5. Ejecución de las Pruebas
Ejecute las pruebas automatizadas con el siguiente comando:

```bash
$ npx playwright test --workers=1
```

6. Visualización del Reporte
Para visualizar el informe y revisar los pasos con el patrón Given-When-Then, ejecute:

```bash
$ npx playwright show-report
```

Siga estos pasos para asegurarse de que su entorno esté configurado correctamente y para ejecutar las pruebas de Playwright de manera eficiente.

## Re-Ejecución del Proyecto
Si desea volver a ejecutar el proyecto desde cero, siga estos pasos para limpiar y reconstruir los contenedores y las imágenes:

1. Limpieza de Contenedores, Volúmenes e Imágenes
Para eliminar los contenedores, volúmenes e imágenes existentes, puede utilizar los siguientes comandos:

```bash
$ docker compose down -v # Detiene y elimina contenedores y volúmenes
$ docker rmi $(docker images -a -q) -f    # Elimina todas las imágenes de Docker
```
Asegúrese de revisar y confirmar que desea eliminar estos recursos antes de proceder.

2. Reconstrucción y Ejecución de Contenedores
Después de limpiar el entorno, puede reconstruir y volver a ejecutar los contenedores utilizando los siguientes comandos:

```bash
$ docker compose up -d db-playwright --build    # Reconstruye e inicia el contenedor de la base de datos
$ docker compose up -d ghost-playwright --build    # Reconstruye e inicia el contenedor de Ghost
```
Estos comandos aseguran que los contenedores se construyan con las últimas configuraciones y luego se ejecuten en segundo plano.

### Nota Importante
Asegúrese de ejecutar estos pasos con precaución, ya que eliminará todos los datos existentes y empezará desde cero. Este enfoque es útil cuando se realizan cambios significativos en la configuración o en el código del proyecto.