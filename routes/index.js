var express = require('express');
var router = express.Router();

// importar quiz_controller
var quizController = require('../controllers/quiz_controller');

// importar tema_controller
var temaController = require('../controllers/tema_controller');

// importar comment_controller
var commentController = require('../controllers/comment_controller');

// importar session_controller
var sessionController = require('../controllers/session_controller');


/* GET home page. */
router.get('/', function(req, res) {
    res.render('index', {
        title: 'Quiz',
        errors: []
    });
});


// **************************************************************************
// SESSION
// **************************************************************************

// GET /login
router.get('/login', sessionController.new);		// formulario login

// GET /login
router.post('/login', sessionController.create);	// crear sesión

// GET /logout
router.get('/logout', sessionController.destroy);	// destruir sesión

// **************************************************************************
// TEMAS
// **************************************************************************

// Autoload de comandos con :temaId
router.param('temaId', temaController.load);

// GET /temas
router.get('/temas', temaController.index);

// GET /temas/:temaId/quizes
router.get('/temas/:temaId(\\d+)/quizes', temaController.quizes);

// GET /temas/new
router.get('/temas/new', temaController.new);

// PUT /temas/create
router.post('/temas/create', temaController.create);

// DELETE /temas/:temaId
router.delete('/temas/:temaId(\\d+)', temaController.delete);

// GET /temas/edit
router.get('/temas/:temaId(\\d+)/edit', temaController.edit);

// PUT /temas/:temaId
router.put('/temas/:temaId(\\d+)', temaController.update);

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
router.get('/quizes/:quizId(\\d+)/edit', session_controller.loginRequired, quizController.edit);

// PUT /quizes/:id
router.put('/quizes/:quizId(\\d+)', session_controller.loginRequired, quizController.update);

// DELETE /quizes:id
router.delete('/quizes/:quizId(\\d+)', session_controller.loginRequired, quizController.delete);

// GET /quizes/new
router.get('/quizes/new', session_controller.loginRequired, quizController.new);

// POST /quizes/create
router.post('/quizes/create', session_controller.loginRequired, quizController.create);



// **************************************************************************
// COMMNETS
// **************************************************************************

// GET /quizes/:quizId/comments/new
router.get('/quizes/:quizId(\\d+)/comments/new', commentController.new);

// POST /quizes/:quizId/comments
router.post('/quizes/:quizId(\\d+)/comments', commentController.create);



// **************************************************************************
// AUTHOR
// **************************************************************************

// GET /author
router.get('/author', function(req, res) {
    res.render('author', {
        errors: []
    });
});

module.exports = router;
