'use strict'
//orm mapeo relacional de objetos

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//modelo de cliente
var ClientSchema = Schema({
    referred_from: String,
    client_name : String,
    email_client: String,
    birth_client: String,
    client_doc: String,
    address : String,
    city: String,
    phone: String,
    cell_phone: String,
    belong_to_user: Schema.Types.ObjectId,


});

module.exports = mongoose.model('Client',ClientSchema);
