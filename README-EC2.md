# PRUEBAS EC2 Windows

# Antes de ejecutar las pruebas:
1. Ingrese a la maquina EC2 de Windows con las credenciales enviadas en la Entrega semana 6
2. Asegúrese de tener abierto en la máquina virtual VsCode, donde ya tendrá el readme, terminales y repositorio abierto (MISW4103-GHOST-E25).
3. Cada herramienta se ejecuta en su correspondiente carpeta, así que es importante seguir los pasos mencionados para cada una. Además, que en cada herramienta siempre se parte de la creación de un usuario administrador y si por alguna razón lo detiene debe reestablecer la base datos siguiendo el paso del readme llamado: **"Para eliminar registro de la base de datos ejecutar"**

## Para eliminar registro de la base de datos ejecutar:
1. Ubicarse en la terminal de vscode ya abierta llamada ROOT de color rojo
2. Asegúrese de está en la carpeta raíz (/Desktop/MISW4103-GHOST-E25)
3. Ejecute el siguiente comando que Elimina las bases de datos de los ghosts y lo levanta de nuevo con sus respectivas versiones
``` bash
# Puede tardar dos minutos
sh restart-db-ghost.sh
```
## Para ejecutar las pruebas de Ghost con PlayWright de cualquier versión realizar:
1. Ubicarse en la terminal de vscode ya abierta y seleccionar la versión del ghost a probar con playwright que se distinguen por el color verde (playwright-ghost-4-48.9 / playwright-ghost-4-38.0)
2. Ejecutar el comando: 
``` bash
npx playwright test --workers=1
```
3. Una vez finalice para ver el informe (que contiene sus steps aplicando el patron given-when-then)
``` bash
npx playwright show-report
```
- *Nota:* Las imágenes de los pasos se ubican en la carpeta **screenshots** de cada herramienta, donde hay subcarpetas con el nombre de la funcionalidad y escenarios.


