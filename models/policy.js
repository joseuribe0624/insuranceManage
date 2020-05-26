'use strict'
//orm mapeo relacional de objetos

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PolicySchema = Schema({
    belongToClient: String,
    //person that has the policy
    insured: String,
    insured_doc: String,
    birth_insured: { type: Date, default: Date.now },
    update_date : { type: Date, default: Date.now },
    plate : String,
    //model=year of the car
    model : Number,
    brand: String,
    line: String,
    cc: Number,
    type_vehicle: String,
    fasecolda: String,
    endorsement: String,
    nit_bank: String,
    hunter: String,
    serie: String,
    motor: String,
    address_property: String,
    //state = concepto it goes with hand of the policy_end
    state: String,
    number_policy: String,
    //issued = company who issue the policy
    issued : String,
    policy_start : { type: Date, default: Date.now },
    policy_end : { type: Date, default: Date.now },
    value_prima : Number,
    payment_type: String,
    policy_renovation_month : String,
    //revicion tecnicomecanica rtm, año revision tecnicomecanica, vencimiento soat mes dia
    soat_expiration: { type: Date, default: Date.now },
    rtm_expiration : { type: Date, default: Date.now },
    observation: String,
});


module.exports = mongoose.model('Policy',PolicySchema);
