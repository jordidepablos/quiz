#Módulo 9
##Ejercicio P2P Obligatorio
###Realización del Ejercicio

1. Pasos realizados en los víedeos del módulo 9

    1. Vídeo 1 - Crear comentario

        1. Añadir nueva tabla en la BD para guardar los comentarios a las preguntas.

            1. Añadir la definición de la tabla de comentarios en el archivo *models/comments.js*.
      
            2. Importar la nueva tabla en el archivo *models/model.js* y definir la relación entre las tablas quiz y comment.

        2. Añadir formulario de crear comentarios: `GET /quizes/:quizId/comments/new`.

            1. Añadir en *controllers/comment_controller.js* acción new asociada a ruta `/quizes/:quizId/comment/new`.
      
            2. Añadir en *routes/index.js* ruta `GET /quizes/:quizId/comments/new`.
        
            3. Añadir vista con formulario de crear comentario: *views/comments/new.ejs*.

        3. Añadir `POST /quizes/:quizId/comments` para introducir nuevos comentarios en DB.

            1. Añadir en *controllers/comment_controller.js* acción `create`.

            2. Añadir en *routes/index.js* ruta `POST /quizes/:quizId/comments`.

