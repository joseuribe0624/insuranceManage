'use strict'
//orm mapeo relacional de objetos

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PolicySchema = Schema({
    belongToClient: Schema.Types.ObjectId,
    //person that has the policy
    name_insured: String,
    insured_doc: String,
    birth_insured:String,
    update_date :String,
    plate : String,
    //model=year of the car
    model : Number,
    brand: String,
    line: String,
    engine_cylinder:String,
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
    policy_start :String,
    policy_end :String,
    value_prima : Number,
    payment_type: String,
    policy_renovation_month : Number,
    //revicion tecnicomecanica rtm, año revision tecnicomecanica, vencimiento soat mes dia
    soat_expiration: String,
    rtm_expiration : String,
    observation: String,
});


module.exports = mongoose.model('Policy',PolicySchema);
