# MISW4103 - Pruebas Grupo 25

## Integrantes

| Nombre             | email                           |
|--------------------|---------------------------------|
| Anderson Rodriguez | ja.rodriguezc12@uniandes.edu.co |
| Nicolás Potier     | n.potier@uniandes.edu.co        |
| Felipe Valencia    | jf.valencia23@uniandes.edu.co   |
| Camilo Lesmes      | c.lesmesl@uniandes.edu.co       |

## Funcionalidades

1. Post
2. Members
3. General settings
4. Tag
5. Pages

# Escenarios

1. [Post](#1-post)
3. [Members](#3-members)
4. [General settings](#4-general-settings)
5. [Tags](#5-tags)
5. [Pages](#5-pages)

# Ejecutar Tests
Debido a que este repositorio se ha usado para las pruebas de las semanas anteriores, tener en cuenta que todos los test se encuentran en la carpeta playwright-ghost-t-48.9
``` shell
cd playwright-ghost-4-48.9
npm install
```

Se Requiere ejecutar los tests en dos tandas debido a una validación que tiene Ghost 4.48.9 que bloquea la ejecución del loging mas de 100 veces cada 3600 segundos

``` shell
docker compose up -d

# Creamos el usuario, tener en cuenta que el servicio de ghost debe estar levantado para iniciar los test.
npx playwright test -g 'user'

npx playwright test post.spec.ts --workers=1 --headed
npx playwirght test pages.spec.ts --workers=1 --headed
npx playwright test members.spec.ts --workers=1 --headed
npx playwright test members.spec.ts --workers=1 --headed
npx playwright test pages.spec.ts --workers=1 --headed
```

``` shell
docker compose down --rmi all
docker compose up -d

# Creamos el usuario, tener en cuenta que el servicio de ghost debe estar levantado para iniciar los test.
npx playwright test -g 'user'

npx playwright test settings.spec.ts --workers=1 --headed
npx playwright test tags.spec.ts --workers=1 --headed
```

# Estrategias

## 1. Post

### A-priori implementados por json

- Title & description: No se puede modificar el site title con valores máximos (151)
- Title & description: Modificar el site title con emojis
- Title & description: Modificar el site title con caracteres especiales
- Title & description: Modificar el site title con texto de inyección sql
- Title & description: Modificar el site description de la pagina con emojis
- Title & description: Modificar el site description con texto de inyección sql
- Title & description: No se puede modificar el site description de la pagina con valores máximos (207)
- Site timezone: No puede cambiar la zona horaria sin guardarla
- Publication Language: No debería permitir guardar un emojis como idioma
- Publication Language: No debería permitir guardar caracteres extraños como idioma
- Publication Language: No deberia permitir guardar más de 4 letras como idioma
- Publication Language: protección contra inyección sql en campo idioma
- Meta title: crear el title con superando los valores recomendados (71 caracteres)
- Meta title: crear el title con valores de inyección sql
- Meta title: crear el title con emojis
- Meta title: crear el title con caracteres especiales
- Meta description: crear el description con caracteres especiales
- Meta description: crear el description con valores de inyección sql
- Meta description: crear el description con emojis

## 2. Members
- Posts - A priori data › Crear un nuevo post con solo título y descripción
- Posts - A priori data › Crear un nuevo post con solo título
- Posts - A priori data › Crear un nuevo post con título y descripción y tag
- Posts - A priori data › Crear un post con título con caracteres especialess
- Posts - A priori data › Crear un post con contenido con caracteres especiales
- Posts - A priori data › Crear un post con excerpt
- Posts - A priori data › Crear un post con excerpt con caracteres especiales
- Posts - A priori data › Crear un post con hora de publicación
- Posts - A priori data › Botón borrar post aparece antes de crearlo

### Dinámicos implementados con Faker

- Posts - Dynamic data › Crear un post con caracteres random en la hora de publicación, dejando la hora default
- Posts - Dynamic data › Crear un post post sin título
- Posts - Dynamic data › Falla la creación de un post sin Autor

### Aleatorios implementados con Faker

- Posts - Random data › Crear un nuevo post con contenido de 1 sola palabra con 5000 caracteres random
- Posts - Random data › Crear un post con excerpt de 1 sola palabra con 50.000 caracteres random
- Posts - Random data › Crear un post con excerpt de 5000 palabras random


## 3. Members

### Datos a-priori implementados por json

- No se puede crear miembro si el campo note excede 500 caracteres
- Se puede utilizar el mismo nombre para dos miembros diferentes
- No se puede crear miembro si el campo email excede 191 caracteres
- No se puede crear miembro si el campo name excede 191 caracteres
- No se puede crear el miembro si el campo label excede 500 caracteres

### Dinámicos implementados con Faker

- creación de miembro
- creación de miembro sin correo
- cancelar creación de miembro
- Creacion de usuario si se presiona control + s
- No se puede crear miembro si existe un miembro con el mismo email
- creación de miembro con correo inválido
- Creacion de usuario si desactiva subscripcion a newlestter
- No se puede crear miembro si existe un miembro con el mismo email

### Aleatorios implementados con Faker & generados por una función propia

- No se puede crear miembro si campos en blanco
- No se puede crear miembro si llena el campo labels con multiples valores
- Al buscar miembro por nombre usando mas de 4000 parrafos hace que la pagina no responda
- Al filtrar por email usando mas de 4000 parrafos hace que la pagina no responda
- Se puede adicionar un label al primer miembro de la lista
- No se puede modificar el primer miembro si en el campo note se usan mas de 500 caracteres
- No se puede modificar el primer miembro si en el campo name se usan mas de 191 caracteres
- No se puede modificar el primer miembro si en el campo email se usan mas de 191 caracteres
- No se puede modificar el primer miembro si en el se asigna un label con mas de 191 caracteres
- No se puede crear miembro si se usan caracteres aleatorios en todos los campos
- No se puede crear miembro si se usan caracteres aleatorios en el campo email
- No se encuentra miembro al buscar por nombre usando caracteres aleatorios
- No se puede editar el primer miembro si se usan caracteres aleatorios en todos los campos
- No se puede editar el primer miembro si se usan caracteres aleatorios en el campo email
- No se puede filtrar por last seen si se usan caracteres aleatorios
- No se puede filtrar por fecha si se usan caracteres aleatorios
- No se puede crear miembro si solo se llena el campo labels
- Se puede cambiar el email del primer miembro de la lista


## 4. General settings

### Aleatorios implementados con Faker

- Title & description: Modificar el site title con solo números aleatorios de (12 cifras)
- Title & description: Modificar el site title con nombre aleatorio
- Title & description: Modificar el site title con URL
- Title & description: Modificar el site description de la pagina con nombre aleatorio
- Title & description: Modificar el site description de la pagina con URL
- Publication Language: No debería permitir guardar una URL como idioma
- Publication Language: No debería permitir guardar un numero como idioma
- Publication Language: No permite guardar con en el campo idioma con valores máximos (4800)
- Meta title: crear el title con solo números aleatorios de 50 caracteres
- Meta title: no se puede crear el title con más de 301 caracteres
- Meta description: No permite guardar con en el campo descripción con valores máximos (501)

### A-priori implementados por json

- Title & description: No se puede modificar el site title con valores máximos (151)
- Title & description: Modificar el site title con emojis
- Title & description: Modificar el site title con caracteres especiales
- Title & description: Modificar el site title con texto de inyección sql
- Title & description: Modificar el site description de la pagina con emojis
- Title & description: Modificar el site description con texto de inyección sql
- Title & description: No se puede modificar el site description de la pagina con valores máximos (207)
- Site timezone: No puede cambiar la zona horaria sin guardarla
- Publication Language: No debería permitir guardar un emojis como idioma
- Publication Language: No debería permitir guardar caracteres extraños como idioma
- Publication Language: No deberia permitir guardar más de 4 letras como idioma
- Publication Language: protección contra inyección sql en campo idioma
- Meta title: crear el title con superando los valores recomendados (71 caracteres)
- Meta title: crear el title con valores de inyección sql
- Meta title: crear el title con emojis
- Meta title: crear el title con caracteres especiales
- Meta description: crear el description con caracteres especiales
- Meta description: crear el description con emojis
- Meta description: crear el description con valores de inyección sql


## 5. Tags

### A-priori implementados por json

- Tags - A priori data › Creación de tag con título y color sin descripción
- Tags - A priori data › Creación de tag con título, sin color y sin descripción
- Tags - A priori data › Creación de tag con título vacío sin color y sin descripción
- Tags - A priori data › Creación de tag con título y color forzando dos veces el botón crear
- Tags - A priori data › Creación de tag con título, color y descripción

### Dinámicos implementados con Faker

- Tags - Dynamic data › Falla creación de tag con título con más de 50 palabras, color y descripción
- Tags - Dynamic data › Falla creación de tag con título, color y descripción con más de 500 caracteres
- Tags - Dynamic data › Falla creación de tag con color no hexadecimals
- Tags - Dynamic data › Falla creación de tag con slug con mas de 191 caracteres
- Tags - Dynamic data › Falla creación de tag con Meta data con más de 70 caracteres en el meta title

### Aleatorios implementados con Faker

- Tags - Random data › Falla creación de tag llenando color con valores aleatorios
- Tags - Random data › Falla creación de tag con Meta data con más de 156 caracteres aleatorios en el meta description
- Tags - Random data › Fall creación de tag con título usando 1 palabra de mas de 191 caracteres random
- Tags - Random data › Falla creación de tag con twitter title con más de 70 caracteres aleatorios
- Tags - Random data › Falla creación de tag con twitter description con más de 200 caracteres aleatorios

## 6. Pages

### A-priori implementados por json - Mockaro


### Dinámicos implementados con Api Mockaro


### Aleatorios implementados con Faker


# Issues

Las siguientes urls contienen los issues que se encontraron durante la ejecución de los tests, y se reportaron de acuerdo al registro de incidencias

| Id         | Titulo            |   Url                                                             |      
|------------| ------------------|-------------------------------------------------------------------|
| Issue-01  | Bug en Publication Language por permitir guardar numeros | https://github.com/Miso-pruebas-auto/MISW4103-GHOST-E25/issues/11 |
| Issue-02  | Al cambiar el nombre de la url de página por primera vez y luego cambiar nombre la url cambi | https://github.com/Miso-pruebas-auto/MISW4103-GHOST-E25/issues/12 |
| Issue-03  | Al cambiar el tema del sitio, las otras pestañas con el estado previo, no actualizan por el nuevo tema del sitio | https://github.com/Miso-pruebas-auto/MISW4103-GHOST-E25/issues/13 |
| Issue-04  | Multiples vertical scrolls en la selección de datos al crear/actualizar una página | https://github.com/Miso-pruebas-auto/MISW4103-GHOST-E25/issues/14 |
| Issue-05  | Al actualizar la url del sitio por una demasiado grande, no es claro el error generado para el usuario final  | https://github.com/Miso-pruebas-auto/MISW4103-GHOST-E25/issues/15 |
| Issue-06  | No aparece el botón de Preview al actualizar una página | https://github.com/Miso-pruebas-auto/MISW4103-GHOST-E25/issues/16 |
| Issue-07  | No aparece el botón de Preview Page de la URL, cuando se actualiza un página con contenido para miembros y publico | https://github.com/Miso-pruebas-auto/MISW4103-GHOST-E25/issues/17 |
| Issue-08  | No valida el protocolo de una URL canonica al agregar la información de la Meta Card para el seo | https://github.com/Miso-pruebas-auto/MISW4103-GHOST-E25/issues/18 |
| Issue-09  | No muestra mensaje de error (retroalimentación) el campo del titulo de la Meta Data Card de una pagina | https://github.com/Miso-pruebas-auto/MISW4103-GHOST-E25/issues/19 |
| Issue-10  | La URL de una pagina se actualiza sin confirmar cambios o volviendo a publicar | https://github.com/Miso-pruebas-auto/MISW4103-GHOST-E25/issues/20 |
| Issue-11  | No deja dar enter en el body de una pagina cuando esta inicia con / | https://github.com/Miso-pruebas-auto/MISW4103-GHOST-E25/issues/21 |
| Issue-12  | No muestra mensaje de error (retroalimentación) el campo del titulo de Facebook Card de una pagina | https://github.com/Miso-pruebas-auto/MISW4103-GHOST-E25/issues/22 |
| Issue-13  |No permite editar contenido sugerido de los campos de la Facebook card y lo elimina al escribir | https://github.com/Miso-pruebas-auto/MISW4103-GHOST-E25/issues/23 |
| Issue-14  | Bug en Publication Language por permitir guardar caracteres extraños como idioma | https://github.com/Miso-pruebas-auto/MISW4103-GHOST-E25/issues/24 |
| Issue-15  | No aparece el botón de publicar una página cuando el titulo es demaciado largo | https://github.com/Miso-pruebas-auto/MISW4103-GHOST-E25/issues/26 |

