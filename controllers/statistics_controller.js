var models = require('../models/models.js');

// GET /quizes/statistics
exports.show = function (req, res,next) {
	var statistics = {};

	// Número de preguntas
	models.Quiz.count().then(function (count) {
		statistics.quizzes = count;

		// Número de comentarios
		models.Comment.count().then(function(count) {
			statistics.comments = count;

			// Número medio de comentarios por pregunta
			statistics.comments_avg = statistics.comments / statistics.quizzes;


			// Número de preguntas con comentarios
			models.Quiz.count({
				include: [
					{
                		model: models.Comment,
                		required: true,				// con required: true se fuerza inner join para contar
                									// solo las preguntas que tienen comentarios.
                		where: {
                			publicado: true			// Con el where forzamos a contar solo las preguntas que
                									// tengan comentarios publicados.
                		}

            		}
        		]
			}).then(function(count) {
				statistics.quizzes_comments = count;	

				// Número de preguntas sin comentarios (Total de preguntas - preguntas con comentarios)
				statistics.quizzes_no_comments = statistics.quizzes - count;

				// Con las estadísticas obtenidas, renderizar la vista
				res.render('statistics/show.ejs', {
					statistics: statistics,
					errors: []
				});
			}).catch(function(error) {next(error);});
		}).catch(function(error) {next(error);});
	}).catch(function(error) {next(error);});
};