#Módulo 8
##Ejercicio P2P Obligatorio
###Realización del Ejercicio

1. Pasos realizados en los víedeos del módulo 8

  1. Vídeo 1 - Creación de preguntas

    1. Crear nueva ruta en el archivo *routes/index.js*

    2. Añadir al controlador *controllers/quiz_controller.js* el nuevo método new

    3. Crear la vista *views/quizes/new.ejs*

    4. Crear la vista *views/quizes/_from.ejs* para tanto la creación de preguntas como la edición de las mismas.

    5. Modificar el archivo *app.js*

    6. Modificar *views/quizes/indes.js* para añadir el botón de crear preguntas.

  2. Vídeo 2 - Validación de entradas

    1. Modificar el archivo *models/quiz.js* para añadir validación al modelo.

    2. Modificar el archivo *controllers/quiz_controller.js* para hacer uso de la validación del modelo.

    3. Modificar el archivo *views/layout.ejs* para que se muestren los errores detectados en la validación.

    4. Modificar el archivo *public/stylesheets/style.css* para que los errores se muestren en un color rojizo.

    5. Modificar todas las llamadas a render para añadir el nuevo parámetro, vacío o no.

  3. Vídeo 3 - Editar preguntas

    1. Crear las nuevas rutas `GET /quizes/:quizId/edit` y `PUT /quizes/:quizId` en el archivo *routes/index.js*.

    2. Modificar el archivo *controllers/quiz_controller.js* para añadir los métodos *edit* y *update*.

    3. Crear la nueva vista *views/quizes/edit.ejs*.

    4. Instalar el middelware *method-override* usando el comando:
      ```
      npm install --save method-override
      ```

    5. Modificar el archivo *app.js* para añadir el uso de *method-override*.

    6. Modificar el archivo *views/quizes/index.ejs* para añadir el nuevo botón a cada pregunta mostrada.

  4. Vídeo 4 - Borrar preguntas

    1. Modificar la vista *views/quizes/index.js* para añdir el bótón de eliminación para cada una de las preguntas.

    2. Modificar el archivo *routes/index.js* para añadir la nueva ruta `DELETE /quizes/:quizId`.

    3. Modificar el archivo *controllers/quiz_controller.js* para añadir el método *delete*.

  5. Ejercicio P2P

    1. Añadir el nuevo modelo *models/tema.js* para los temas.
      He pensado que los temas deberían estar guardados en base de datos y que se pudieran añadir nuevos, editar y eliminar. Para ello es necesario tener un nuevo modelo.

    2. Modificar el archivo *models/models.js*

      1. Importar la definición de la tabla *Tema*.

      2. Establecer la relación entre los modelos *tema* y *quiz* de forma que a un quiz le corresponda un único tema y que a un tema le correspondan varios quizzes.

      3. Modificar la parte en la que se crea e inicializa la base de datos. Ahora se tiene que crear e inicailizar en primer lugar los temas y después se debe crear e inicializar los quiz.
      
