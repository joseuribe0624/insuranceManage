'use strict'

var Policy = require('../models/policy')
var validator = require('validator');

var controller = {
    savePolicy: function(req, res){
        var clientId = req.params.id;
        var params = req.body;
         //valid the data this is going to return true or false
        try{
            var validate_name_insured = !validator.isEmpty(params.name_insured);
            var validate_insured_doc = !validator.isEmpty(params.insured_doc);
            var validate_policy_renovation_month = !validator.isEmpty(params.policy_renovation_month);
        }catch(err){
           return res.status(200).send({
                message: "No se completo los datos requeridos"
            });
        }
        if(validate_name_insured && validate_insured_doc && validate_policy_renovation_month){
            var policy = new Policy();
            policy.name_insured = params.name_insured;
            policy.insured_doc = params.insured_doc;
            policy.birth_insured = params.birth_insured;
            policy.update_date = params.update_date;
            policy.plate  = params.plate;
            policy.model  = params.model;
            policy.brand = params.brand;
            policy.line = params.line;
            policy.engine_cylinder = params.engine_cylinder;
            policy.type_vehicle = params.type_vehicle;
            policy.fasecolda = params.fasecolda;
            policy.endorsement = params.endorsement;
            policy.nit_bank = params.nit_bank;
            policy.hunter = params.hunter;
            policy.serie = params.serie;
            policy.motor = params.motor;
            policy.address_property = params.address_property;
            policy.state = params.state;
            policy.number_policy = params.number_policy;
            policy.issued  = params.issued;
            policy.policy_start = params.policy_star; 
            policy.policy_end = params.policy_en;
            policy.value_prima  = params.value_prima;
            policy.payment_type = params.payment_type;
            policy.policy_renovation_month  = params.policy_renovation_month;
            policy.soat_expiration = params.soat_expiration;
            policy.rtm_expiration  = params.rtm_expiration;
            policy.observation = params.observation;
            policy.belongToClient = clientId;

            policy.save((err, policyStored) => {
                if(err){
                    return res.status(500).send({
                        message: "Error al guardar el poliza",
                        
                    }); 
                }
                if(!policyStored){
                    return res.status(400).send({
                        message:"El poliza no se ha guardado", 
                    });
                }
                //return ans
                return res.status(200).send({policy: policyStored});
                 }); //close save
       
        }else{
            return res.status(200).send({
               message: "Validacion de los datos incorrecta",
            });
        }  
    },

    updatePolicy: function(req, res){
        //var clientId = req.params.id;
        var policyId = req.params.id;
        var params = req.body;
        //search and updta doc
        Policy.findByIdAndUpdate(policyId, params, {new:true}, (err, policyUpdate) => {
            if(err){
                return res.status(200).send({
                    status: 'error',
                    message: 'Error al actualizar poliza'
                });
            }
            if(!policyUpdate){
                return res.status(200).send({
                    status: 'error',
                    message: 'No se ha actualizado la poliza'
                });
            }
            return res.status(200).send({
                status: 'success',
                client: policyUpdate
            });
        });
    },

    getPolicy: function(req,res){
        var policyId= req.params.id;
        if(policyId==null){
            return res.status(404).send({message: 'El documento no existe.'});
        }
        //esto es un metodo de moongose buscar en la documentacion
        Policy.findById(policyId,(err,policy) => {
            if(err) return res.status(500).send({message: 'Error al devolder los datos.'});

            if(!policy) return res.status(404).send({message: 'El documento no existe.'});

            return res.status(200).send({
                policy
            });
        });
    },

    getPolicies: function(req,res){
        //find take all the clients in this case
        var clientId= req.params.id;
        // find({year:2019})
        Policy.find({belongToClient: clientId}).exec((err,policies) => {
            if(err) return res.status(500).send({message: 'Error al devolder los datos.'});
            if(!policies) return res.status(404).send({message: 'El documento no existe.'});
            return res.status(200).send({policies});
        });
    },
    deletePolicy: function(req,res){
        var policyId = req.params.id; 
        Policy.findByIdAndRemove(policyId, (err, policyRemoved) =>{
            if(err) return res.status(500).send({message:'Error al guardar el doc'});
            if(!policyRemoved) return res.satus(404).send({message:'no se ha podido guardar'});
            return res.status(200).send({policy:policyRemoved})
        });
    },
 
}

module.exports = controller;