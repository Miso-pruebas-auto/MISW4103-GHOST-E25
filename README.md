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
2. Pagina
3. Members
4. General settings
5. Tag

# Escenarios

## 1. General settings

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

## Members

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
