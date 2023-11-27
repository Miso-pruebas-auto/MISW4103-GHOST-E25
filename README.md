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