#Módulo 7
##Ejercicio P2P Obligatorio
###Explicación de la tarea

**Añadir a cada pregunta un índice temático**

Se pide añadir un índice temático a cada pregunta introducida que diga si es una pregunta relativa a Humanidades, Ocio, Ciencia o Tecnología.

Para implementar esta funcionalidad habrá que  actualizar el modelo, introduciendo este nuevo campo en la tabla "Quiz" de preguntas. Además habra que que actualizar los controladores y las vistas afectados por este cambio.

Se recomienda utilizar el elemento `<select>` de HTML en los formularios de creación y ediciónpara enviar parámetros de una lista preseleccionada:
```html
<select name="tema">
  <option value="otro" selected>Otro</option>
  <option value="humanidades">Humanidades</option>
  <option value="ocio">Ocio</option>
  <option value="ciencia">Ciencia</option>
  <option value="tecnologia">Tecnología</option>
</select>
```

Una vez realizada, se deberá guardar una nueva versión (commit) con esta funcionalidad, la cual se desplegará en heroku y se subirá a GitHub.

**Entrega en MiriadaX**

Subir un fichero de texto que contenga el URL donde ha desplegado su práctica en Heroku, y el URL a la página de GitHub que aloja este desarrollo.
