# RIPuppet


## Instalación de RIPuppet

Implementar este riper con Node 12.22.12, utilice NVM para instalar la version de node correspondiente

```bash
nvm install 12.22.12
nvm use 12.22.12
```

Luego de eso si instale las dependencias, pero si tiene un node_modules en este directorio, por favor borrelo y ejecute el comando de instalar dependencias


```bash
npm install
```

Luego de eso, ejecute el comando para ejecutar el script

```bash
node index.js
```

Una vez que se ejecute el script, espere a que termine, esto puede tardar un poco de acuerdo a las configuraciones del archivo `config.json`, posterior a que el análisis finalice, se generaran los reportes en la carpeta results


## Ver los reportes

para poder visualizar los reportes, es encesario utilizar http-server, esta herramienta permite levantar un servidor web en el directorio que se le indique, en este caso, el directorio de los reportes, cada reporte se genera con la fecha de ejecución, por lo que deberá estar seguro de la fecha de ejecución de su reporte. en este ejemplo se utiliza el reporte de la carpeta: 2023-12-01T20.31.17.241Z para el navegador de Firefox..

Primero instale http-server globalmente con el comando

```bash
npm install -g http-server
```

y luego, ingrese al directorio del reporte que desea visualizar, en este caso, el reporte de firefox

```bash
cd results/2023-12-01T20.31.17.241Z/firefox
```

Luego de eso ya puede inicializar el servidor web con el comando

```bash
http-server
```

cuando finalice de ver el reporte, simplemente puede oprimir `Ctrl + C` para detener el servidor web


## Importante para la configuración de los dominios

 - Ghost V5.74.5
 - http://ghost5.wym.services
 - Se implementa el test sobre los navegadores Chrome, Webkit y Firefox

 - Ghost V4.94.9
 - http://ghost4.wym.services
 - Se implementa el test sobre los navegadores Chrome, Webkit y Firefox



