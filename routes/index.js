var express = require('express');
var router = express.Router();

// importar quiz_controller
var quizController = require('../controllers/quiz_controller');

// importar tema_controller
var temaController = require('../controllers/tema_controller');

/* GET home page. */
router.get('/', function(req, res) {
    res.render('index', {
        title: 'Quiz',
        errors: []
    });
});


// **************************************************************************
// TEMAS
// **************************************************************************

// GET /temas
router.get('/temas', temaController.index);

// GET /temas/:temaId/quizes
router.get('/temas/:temaId(\\d+)/quizes', temaController.quizes);


// **************************************************************************
// QUIZ
// **************************************************************************

// Autoload de comandos con :quizId
router.param('quizId', quizController.load);

// GET /quizes
router.get('/quizes', quizController.index);

// GET /quizes/:id
router.get('/quizes/:quizId(\\d+)', quizController.show);

// GET /quizes/:id/answer
router.get('/quizes/:quizId(\\d+)/answer', quizController.answer);

// GET /quizes/:id/edit
router.get('/quizes/:quizId(\\d+)/edit', quizController.edit);

// PUT /quizes/:id
router.put('/quizes/:quizId(\\d+)', quizController.update);

// DELETE /quizes:id
router.delete('/quizes/:quizId(\\d+)', quizController.delete);

// GET /quizes/new
router.get('/quizes/new', quizController.new);

// POST /quizes/create
router.post('/quizes/create', quizController.create);



/*
// GET pregunta
router.get('/quizes/question', quizController.question);

// GET respuestas
router.get('/quizes/answer', quizController.answer);
*/

// GET /author
router.get('/author', function(req, res) {
    res.render('author', {
        errors: []
    });
});

module.exports = router;
