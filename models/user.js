'use strict'
//orm mapeo relacional de objetos

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//modelo d eusuario
var UserSchema = Schema({
    name: String,
    surname: String,
    email: String,
    password: String,
    role:String
});

module.exports = mongoose.model('User',UserSchema);
                                //lowercase y pluralizar el nombre
                                //users -> documentos con el esquema definido
