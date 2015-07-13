// Definición del modelo de Tema

module.exports = function(sequelize, DataTypes) {
    var Tema;
    Tema = sequelize.define('Tema', {
        nombre: {
        	type: DataTypes.STRING,
        	validate: {notEmpty: {msg: "-> Falta Nombre"}}
        }
    });
    return Tema;
}