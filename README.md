# MISW4103 - Pruebas Grupo 25

## Integrantes

| Nombre             | email                           |
|--------------------|---------------------------------|
| Anderson Rodriguez | ja.rodriguezc12@uniandes.edu.co |
| Nicolás Potier     | n.potier@uniandes.edu.co        |
| Felipe Valencia    | jf.valencia23@uniandes.edu.co   |
| Camilo Lesmes      | c.lesmesl@uniandes.edu.co       |


# Semana 1

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


