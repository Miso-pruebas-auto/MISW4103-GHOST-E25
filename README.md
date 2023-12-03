# MISW4103 - Pruebas Grupo 25

## Integrantes

| Nombre             | email                           |
|--------------------|---------------------------------|
| Anderson Rodriguez | ja.rodriguezc12@uniandes.edu.co |
| Nicolás Potier     | n.potier@uniandes.edu.co        |
| Felipe Valencia    | jf.valencia23@uniandes.edu.co   |
| Camilo Lesmes      | c.lesmesl@uniandes.edu.co       |


# Semana 1

## Pruebas Manuales de Ghost V5.74.5
se adjunta el Excel trabajado

[inventario-pruebas-e25.xlsx](https://github.com/Miso-pruebas-auto/MISW4103-GHOST-E25/files/13537897/inventario-pruebas-e25.xlsx)


## Test e2e
Debido a que este repositorio se ha usado para las pruebas de las semanas anteriores, tener en cuenta que todos los test se encuentran en la carpeta playwright-ghost-5.74.5
``` shell
cd playwright-ghost-5.74.5
npm install

docker compose up -d

# Creamos el usuario, tener en cuenta que el servicio de ghost debe estar levantado para iniciar los test.
npx playwright test -g 'user'

npx playwright test post.spec.ts --workers=1 --headed
```

En caso de que se requiera volver a ejecutar los posts se debe reiniciar la instancia de docker.
``` shell
docker compose down --rmi all
docker compose up -d
```

## Test VRT Reportes

En esta entrega el equipo quiso realizar la creación de dos reportes para poder implementar de una manera mas amplia las herramientas propuestas en la semana, las cuales son  `Resemble` & `Backstop`, en el que cada una tiene su propia carpeta para la realización y/o ejecución de pruebas de VRT y reportes, los cuales son analizados en la wiki de este proyecto.

### Resemble Report

Proyecto de NextJS para visualizar el reporte de las pruebas de regresión visual de la herramienta usando ResembleJS para la aplicación GHOST en ambas versiones previamente seleccionadas(4.48.9 y 5.74.5) de Playwright.

* Leer la respectiva documentación: [README.md](resemble-report/README.md)
* El reporte generado de **Resemble** se encuentra en la carpeta **`resemble-report`**  en la raiz de este proyecto
* Puede ver el reporte generado en el siguiente link: [REPORTE - RESEMBLE](https://misw-4103-ghost-e25.vercel.app/)

### Bakstop Report

Proyecto de Html que visualiza el reporte de pruebas de regresión visual (VRT) implementando la herramienta BackStop para la aplicación GHOST en ambas versiones previamente seleccionadas(4.48.9 y 5.74.5) de Playwright.

* Leer la respectiva documentación: [README.md](backstop-report/README.md)
* El reporte generado de **BackStop** se encuentra en la carpeta **`backstop-report`**  en la raiz de este proyecto
* Puede verel reporte generado en el siguiente [REPORTE - BACKSTOP](https://misw-4103-ghost-e25-delta.vercel.app/)
