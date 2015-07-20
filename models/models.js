var path = require('path');

// Postgres DATABASE_URL = postgres://user:password@host:port/database
// SQLite   DATABASE_URL = sqlite://:@:/
var url = process.env.DATABASE_URL.match(/(.*)\:\/\/(.*?)\:(.*)@(.*)\:(.*)\/(.*)/),
    DB_name  = (url[6]||null),
    user     = (url[2]||null),
    pwd      = (url[3]||null),
    protocol = (url[1]||null),
    dialect  = (url[1]||null),
    port     = (url[5]||null),
    host     = (url[4]||null),
    storage  =  process.env.DATABASE_STORAGE;

// Cargar Modelo ORM
var Sequelize = require('sequelize');

// Usar BBDD SQLite o Postgres:
var sequelize = new Sequelize(DB_name, user, pwd, {
    dialect:  dialect,
    protocol: protocol,
    port:     port,
    host:     host,
    storage:  storage,  // solo SQLite (.env)
    omitNull: true      // solo Postgres
});

// Importar la definición de la tabla Quiz en quiz.js
var Quiz = sequelize.import(path.join(__dirname, 'quiz'));

// Importar la definición de la tabla Tema en tema.js
var Tema = sequelize.import(path.join(__dirname, 'tema'));

// Establecer la relación entre los modelos Tema y Quiz
Quiz.belongsTo(Tema);
Tema.hasMany(Quiz);

exports.Quiz = Quiz;
exports.Tema = Tema;

// sequelize.sync() crea e inicializa tabla de preguntas en DB
sequelize.sync().then(function() {
    // Si no hay contenidos en la tabla temas se cargan los valores iniciales
    Tema.count().then(function(count) {
        if (count === 0) {
            console.log('\n\n\n************************\nSi no hay contenidos en la tabla temas se cargan los valores iniciales\n************************\n\n\n');
            Tema.create({
                nombre: 'Otro',
            });
            Tema.create({
                nombre: 'Humanidades',
            });
            Tema.create({
                nombre: 'Ocio',
            });
            Tema.create({
                nombre: 'Ciencia',
            });
            Tema.create({
                nombre: 'Tecnologia',
            }).then(function() {
                console.log('\n\n\n************************\nUna vez cargados todos los temas ya se puede buscar el tema\nhumanidades, para disponer del id que se le ha asignado.\n************************\n\n\n');
                // Una vez cargados todos los temas ya se puede buscar el tema
                // humanidades, para disponer del id que se le ha asignado.
                Tema.findOne({
                    where: {
                        nombre: 'Humanidades'
                    }
                }).then(function (humanidades) {
                    console.log('\n\n\n************************\nUna vez obtenido el tema se puden añadir las preguntas\nPero antes hay que comprobar si la tabla Quiz ya tiene el nuevo campo TemaId\n************************\n\n\n');
                    // Una vez obtenido el tema se puden añadir las preguntas
                    // Pero antes hay que comprobar si la tabla Quiz ya tiene el nuevo campo TemaId
                    Quiz.describe().then(function (table) {
                        if (table.TemaId) {
                            console.log('\n\n\n************************\nLa tabla ya tiene el campo\n************************\n\n\n');
                            // La tabla ya tiene el campo
                            Quiz.count().then(function() {
                                if (count === 0) {
                                    console.log('\n\n\n************************\nNo hay registros en la tabla, se pueden cargar directamente los nuevos\n************************\n\n\n');
                                    // No hay registros en la tabla, se pueden cargar directamente los nuevos
                                    loadQuizzes(humanidades.id).then(function() {
                                        console.log('\n\n\n************************\nBase de datos inicializada\n************************\n\n\n');
                                    });
                                }
                                else {
                                    console.log('\n\n\n************************\nBase de datos inicializada\n************************\n\n\n');
                                }
                            });
                        }
                        else {
                            console.log('\n\n\n************************\nLa tabla no tiene el campo\nHay que sincronizar el modelo\n************************\n\n\n');
                            // La tabla no tiene el campo
                            // Mirar si hay registros en la tabla
                            Quiz.count().then(function() {
                                if (count === 0) {
                                    console.log('\n\n\n************************\nNo hay registros en la tabla, se pueden crear de nuevo la tabla\n************************\n\n\n');
                                    // No hay registros en la tabla, se pueden crear de nuevo la tabla
                                    Quiz.drop().then(function() {
                                        console.log('\n\n\n************************\nTabla eliminada, crearla de nuevo\n************************\n\n\n');
                                        // Tabla eliminada, crearla de nuevo
                                        Quiz.sync().then(function() {
                                            console.log('\n\n\n************************\nTabla creada\n************************\n\n\n');
                                            // Tabla creada
                                            loadQuizzes(humanidades.id).then(function() {
                                                console.log('\n\n\n************************\nBase de datos inicializada\n************************\n\n\n');
                                            });
                                        });
                                    });
                                }
                                else {
                                    console.log('\n\n\n************************\nHay que obtener todos los registros de la tabla.\n************************\n\n\n');
                                    // Hay que obtener todos los registros de la tabla.
                                    Quiz.findAll().then(function (data) {
                                        console.log('\n\n\n************************\nAhora hay que eliminar la tabla\n************************\n\n\n');
                                        // Ahora hay que eliminar la tabla
                                        Quiz.drop().then(function() {
                                            console.log('\n\n\n************************\nTabla eliminada, ahora hay que crearla de nuevo\n************************\n\n\n');
                                            // Tabla eliminada, ahora hay que crearla de nuevo
                                            Quiz.sync().then( function() {
                                                console.log('\n\n\n************************\nTabla creada, finalmente rellenamos la tabla con los datos que contenía añadiendo valor en el nuevo campo.\n************************\n\n\n');
                                                //  Tabla creada, finalmente rellenamos la tabla con los datos que contenía añadiendo valor en el nuevo campo.
                                                for(i in data) {
                                                    var promise = Quiz.create({
                                                        pregunta: data[i].pregunta,
                                                        respuesta: data[i].respuesta,
                                                        TemaId: humanidades.id
                                                    });
                                                    if (i == data.length - 1) promise.then(function () {
                                                        console.log('\n\n\n************************\nBase de datos inicializada\n************************\n\n\n');
                                                    });
                                                }
                                            });
                                        });
                                    });
                                }
                            });
                        }
                    });
                });
            });
        }
    });
});


function loadQuizzes(temaId) {
    Quiz.create({
        pregunta: 'Capital de Italia',
        respuesta: 'Roma',
        TemaId: temaId  // se indica el tema al que pertenece la pregunta
    });
    return Quiz.create({
        pregunta: 'Capital de Portugal',
        respuesta: 'Lisboa',
        TemaId: temaId  // se indica el tema al que pertenece la pregunta
    });
}
