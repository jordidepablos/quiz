var models = require('../models/models.js');

// Autoload
exports.load = function (req, res, next, temaId) {
    models.Tema.findById(temaId).then( function(tema) {
        if (tema) {
            req.tema = tema;
            next();
        }
        else next(new Error('No existe tema=' + temaId));
    } ).catch(function(error) {next(error);});
};

// GET /temas
exports.index = function(req, res, next) {
    console.log('***** GET /temas');
    models.Tema.findAll().then( function(temas) {
        res.render('temas/index', {
            temas: temas,
            errors: []
        });
    }).catch(function(error) {
        //console.log(error);
        next(error);
    });
};

// GET /temas/:temaId/quizes
exports.quizes = function(req, res, next) {
    console.log('***** GET /temas/' + req.params.temaId + 'quizes');
    var options = {
        where: {
            TemaId: req.params.temaId
        },
        include: [
            {
                model: models.Tema
            }
        ]
    };
    if (req.query.search) {
        options.where.pregunta = {
            like: '%' + req.query.search.replace(/\s+/g, '%') + '%'
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

// GET /temas/new
exports.new = function (req, res) {
    var tema = models.Tema.build({
        nombre: "Nuevo tema"
    });
    res.render('temas/new', {
        tema: tema,
        errors: []
    });
};

// PUT /temas/create
exports.create = function (req, res) {
    var tema = models.Tema.build( req.body.tema );

    tema.validate().then(function(err) {
        if (err)
            res.render('temas/new', {
                tema: tema,
                errors: err.errors
            });
        else
            // Guarda en DB el campo nombre de tema
            tema.save({fileds: ["nombre"]}).then( function() {
                res.redirect('/temas');
            }); // Redirección HTTP (URL relativo) lista de temas
    });
};

// DELETE /temas/:temaId
exports.delete = function (req, res, next) {
    models.Quiz.count({
        where: {
            TemaId: req.params.temaId
        }
    }).then(function(count) {
        if (!count) {
            models.Tema.destroy({
                where: {
                    id: req.params.temaId
                }
            }).then(function() {
                res.redirect('/temas');
            }).catch(function (error){
                next(error);
            });
        }
        else {
            next(new Error('Hay preguntas del tema ' + req.tema.nombre  + ', no es posible borrarlo'));
        }
    });
};

// GET /temas/:temaId/edit
exports.edit = function (req, res) {
    res.render('temas/edit', {tema: req.tema, errors: []});
};

// PUT /temas/:temaId
exports.update = function(req, res) {
    req.tema.nombre = req.body.tema.nombre;

    req.tema.validate().then(function(err) {
        if (err)
            res.render('temas/edit', {
                tema: req.tema,
                errors: err.errors
            });
        else
            req.tema.save({ // save: guarda campos pregunta y respuesta en DB
                fields: ['nombre']
            }).then(function() {
                res.redirect('/temas');    // Redirección HTTP a lista de preguntas (url relativo)
            });
    });
}