var models = require('../models/models.js');

// Autoload - factoriza el código si ruta incluye :quizId
exports.load = function(req, res, next, quizId) {
    models.Quiz.findById(quizId, {
        include: [
            {
                model: models.Tema,
                model: models.Comment
            }
        ]
    }).then( function(quiz) {
        if (quiz) {
            req.quiz = quiz;
            next();
        }
        else next(new Error('No existe quizId=' + quizId));
    } ).catch(function(error) {next(error);});
};

// GET /quizes
exports.index = function(req, res, next) {
    console.log('***** GET /quizes');
    var options = {
        include: [
            {
                model: models.Tema
            }
        ]
    };
    if (req.query.search) {
        options.where = {
                pregunta: {
                    like: '%' + req.query.search.replace(/\s+/g, '%') + '%'
                }
            };
        options.order = [['pregunta', 'ASC']];
    }
    models.Quiz.findAll(options).then( function(quizes) {
        res.render('quizes/index', {
            quizes: quizes,
            errors: []
        });
    }).catch(function(error) {next(error);});
};

// GET /quizes/:id
exports.show = function(req, res) {
    res.render('quizes/show', {
        quiz: req.quiz,
        errors: []
    });
};

// GET /quizes/:id/answer
exports.answer = function (req, res) {
    var resultado = 'Incorrecto';
    if (req.query.respuesta === req.quiz.respuesta)
        resultado = 'Correcto';
    res.render('quizes/answer', {
        quiz: req.quiz,
        respuesta: resultado,
        errors: []
    });
};

// GET /qiuzes/new
exports.new = function (req, res, next) {
    var quiz = models.Quiz.build({
        pregunta: 'Pregunta',
        respuesta: 'Respuesta'
    });
    models.Tema.findAll().then(function(temas) {
            res.render('quizes/new', {
            quiz: quiz,
            temas: temas,
            errors: []
        });
    }).catch(function(error) {next(error);});
};

// POST /quizes/create
exports.create = function (req, res, next) {
    var quiz = models.Quiz.build( req.body.quiz );

    quiz.validate().then(function(err) {
        if (err)
            res.render('quizes/new', {
                quiz: quiz,
                errors: err.errors
            });
        else
            // Guarda en DB los campos pregunta y respuesta de quiz
            quiz.save({fileds: ["pregunta", "respuesta", "TemaId"]}).then( function() {
                res.redirect('/quizes');  // Redirección HTTP (URL relativo) lista de preguntas
            }).catch(function(error) {next(error);});
    });
};

// GET /quizes/:quizId/edit
exports.edit = function (req, res, next) {
    var quiz = req.quiz;

    models.Tema.findAll().then(function(temas) {
        res.render('quizes/edit', {
            quiz: quiz,
            temas: temas,
            errors: []
        });
    }).catch(function(error) {next(error);});
};

// PUT /quizes/:quizId
exports.update = function(req, res, next) {
    req.quiz.pregunta = req.body.quiz.pregunta;
    req.quiz.respuesta = req.body.quiz.respuesta;
    req.quiz.TemaId = req.body.quiz.TemaId;

    req.quiz.validate().then(function(err) {
        if (err)
            res.render('quizes/edit', {
                quiz: req.quiz,
                errors: err.errors
            });
        else
            req.quiz.save({ // save: guarda campos pregunta y respuesta en DB
                fields: ['pregunta', 'respuesta', 'TemaId']
            }).then(function() {
                res.redirect('/quizes');    // Redirección HTTP a lista de preguntas (url relativo)
            }).catch(function(error) {next(error);});
    });
}

// DELETE /quizes/:quizId
exports.delete = function(req, res, next) {
    req.quiz.destroy().then(function() {
        res.redirect('/quizes');
    }).catch(function (error){
        next(error);
    });
};
