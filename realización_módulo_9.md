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

		2. Crear un middleware de autorización en *controllers/seesion_controller.js*

		3. Modificar vista *views/quizes/index.js* para quitar botones a usuarios anónimos

		4. Añadir MW de autorización en *routes/index.js* a rutas de creación, edición y borrado de temas

		5. Modificar vista *views/temas/index.js* para quitar botones a usuarios anónimos

		6. Guardar versión (commit) git y subir a Heroku

	4. Video 4 - Moderación de Comentarios

		1. Añadir campo de publicado en tabla *models/comments.js* de la DB

		2. Instalar middleware de autoload y nueva ruta en *routes/index.js*

			1. Instalar middleware de Autoload de comentarios en *routes/index.js*

			2. Añadir en *routes/index.js* ruta `GET /quizes/:quizId/comments/:id/publish` para autorizar comentario

		3. Añadir autoload y acción publish en *controllers/comment_controller.js*

			1. Añadir método de Autoload de comentarios en controlador

			2. Añadir acción publish para publicar comentarios una vez autorizados

		4. Modificar *views/quizzes/:quizId/show* para mostrar solo comentarios autorizados

		5. Guardar versión (commit) git y subir a Heroku

	5. Video 5 - HTTPS - HTTP Seguro

		1. Crear e instalar claves y certificados digitales para acceso seguro HTTPS

			1. Crear script de creación e instalación de certificados digitales

			2. Crear e instalar certificados

		2. Añadir acceso por HTTPS al arrancar el servidor de node.js en *bin/www*

		3. Guardar versión (commit) git y subir a Heroku

2. Ejercicio P2P

	1. Auto-logout

		Editar el archivo *app.js* para añadir el middleware de autoLogout.

		En primer lugar se comprueba que el usuario esté logueado, si no lo está se seja pasar al siguiente middelware sin hacer nada más. Cuando se trata de un acceso de un usuario logueado, se obtiene de la sesion la hora del último acceso y se compara con la hora actual menos 2 minutos, si la hora de último acceso es mayor se deja continuar la ejecución de los siguientes middelwares, en caso contrario se destruye la session de usuario y la fecha del último acceso y se redirige a la pantalla de login.

	2. Añadir una página de estadisticas

		1. Añadir la ruta `GET /quizes/statistics` en el archivo *routes/index.js*. Añadir también el requerimiento del controlador statisticsController, que se ubicará en *controllers/statistics_controller.js*.

		2. Crear el controlador *controllers/statistics_controller.js* que se encargará de realizar el cálculo de las estadísticas y de renderizar la vista.

		3. Crear la vista *views/statistics/show.ejs*.

		4. Editar *views/layout.ejs* para añadir el link que nos muestre las estadísticas.