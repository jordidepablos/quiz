# Módulo 9

## Ejercicio P2P Obligatorio

### Realización del Ejercicio

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

        4. Modificar vista *views/quizes/show* para incluir comentarios y botón de crear comentario.

            1. Modificar `autoload` del controlador *controllers/quiz_controller.js* para que cargue también los comentarios del quiz.

            2. Modificar vista *views/quizes/show* para incluir comentarios y botón de crearlos.

        5. Guardar versión (commit) git y subir a Heroku.

	2. Video 2 - Autenticación y sesión

		1. Importar, instalar y configurar middleware de gestión de sesiones

			1. Importar e instalar middleware express-session en *app.js* y en *package.json*

			2. Hacer visible la sesión en las vistas quizes y comment

			3. Guardar path de re-dirección después de login

		2. Añadir 3 rutas de gestión de sesión en *routes/index.js*

			- Cargar formulario de login: `GET /login`
			
			- Crear sesión: `POST /login`

			- Destruir sesión: `GET /logout` (funciona, pero debería ser `DELETE`)

		3. Crear controlador de sesión *controllers/session_controller.js*

			1. Añadir acción new para la ruta `GET /login` para cargar formulario de login

			2. Añadir acción create para la ruta `POST /login` para crear la sesión de usuario

			3. Añadir acción destroy para a ruta `GET /logout` para destruir la sesión

		4. Crear controlador de usuarios: *controllers/user_controller.js*

		5. Añadir botón `login/logout` en *views/layout.ejs*

		6. Añadir vista de login *views/sessions/new.ejs*

		7. Guardar versión (commit) git y subir a Heroku

	3. Video 3 - Autorización

		1. Añadir MW de autorización en *routes/index.js* a rutas de creación, edición y borrado

