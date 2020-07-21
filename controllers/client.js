'use strict'

var Client = require('../models/client');
var validator = require('validator');
/*saveClient : this function store a client, this take the id of the user by url param, and
checks if the client is not already create, this is made with a query with user id and client_doc*/


var controller = {
    saveClient: function(req, res){
        var params = req.body;
         //valid the data this is going to return true or false
        try{
            var validate_belong_to_user = !validator.isEmpty(params.belong_to_user);
            var validate_referred_from = !validator.isEmpty(params.referred_from);
            var validate_client_name = !validator.isEmpty(params.client_name);
            var validate_email_client = !validator.isEmpty(params.email_client) && validator.isEmail(params.email_client);
            var validate_birth_client = !validator.isEmpty(params.birth_client);
            var validate_client_doc = !validator.isEmpty(params.client_doc);
            var validate_address = !validator.isEmpty(params.address);
            var validate_city = !validator.isEmpty(params.city);
            var validate_phone = !validator.isEmpty(params.phone);
            var validate_cell_phone = !validator.isEmpty(params.cell_phone);
        }catch(err){
           return res.status(200).send({
                message: "Faltan datos por enviar"
            });
        }

        if(validate_belong_to_user && validate_referred_from && validate_client_name && validate_email_client && validate_birth_client &&
            validate_client_doc && validate_address && validate_city && validate_phone && validate_cell_phone ){
            var client = new Client();
            client.referred_from = params.referred_from;
            client.client_name = params.client_name;
            client.email_client = params.email_client;
            client.birth_client = params.birth_client;
            client.client_doc = params.client_doc;
            client.address = params.address;
            client.city = params.city;
            client.phone = params.phone;
            client.cell_phone = params.cell_phone;
            client.belong_to_user = params.belong_to_user;
            Client.findOne({belong_to_user: client.belong_to_user, client_doc: client.client_doc}, 
                function (err, issetClient){
                if(err){
                    return res.status(500).send({
                        message: "Error, al comprobar si ya existe el client",
                    });
                }
                //en el caso de que no exista
                if(!issetClient){
                    client.save((err, clientStored) => {
                        if(err){
                            return res.status(500).send({
                                message: "Error al guardar el cliente",
                                
                            }); 
                        }
                        if(!clientStored){
                            return res.status(400).send({
                                message:"El cliente no se ha guardado", 
                            });
                        }
                        //return ans
                        return res.status(200).send({client: clientStored});
                    }); //close save
                //en el caso de que si exista 
                }else{
                    return res.status(500).send({
                        message: "El cliente ya esta registrado",
                    }); 
                }
            });
        }else{
            return res.status(200).send({
               message: "Validacion de los datos incorrecta",
            });
        }  
    },

    updateClient: function(req, res){
        var clientId = req.params.idClient;
        var params = req.body;
        //search and updta doc
        Client.findByIdAndUpdate(clientId, params, {new:true}, (err, clientUpdate) => {
            if(err){
                return res.status(200).send({
                    status: 'error',
                    message: 'Error al actualizar cliente'
                });
            }
            if(!clientUpdate){
                return res.status(200).send({
                    status: 'error',
                    message: 'No se ha actualizado el cliente'
                });
            }
            return res.status(200).send({
                status: 'success',
                client: clientUpdate
            });
        });
    },
    deleteClient: function(req,res){
        var clientId = req.params.id;
        Client.findByIdAndRemove(clientId, (err, clientRemoved) =>{
            if(err) return res.status(500).send({message:'Error al guardar el doc'});
            if(!clientRemoved) return res.satus(404).send({message:'no se ha podido guardar'});
   
            return res.status(200).send({client:clientRemoved})
        });
    },

    getClient: function(req,res){
        var clientId= req.params.id;
        if(clientId==null){
            return res.status(404).send({message: 'El documento no existe.'});
        }
        Client.findById(clientId,(err,client) => {
            if(err) return res.status(500).send({message: 'Error al devolder los datos.'});

            if(!client) return res.status(404).send({message: 'El documento no existe.'});

            return res.status(200).send({
                client
            });
        });
    },

    getClients: function(req,res){
        //find take all the clients in this case
        var userId= req.params.id;
        // find({year:2019})
        Client.find({belong_to_user: userId}).exec((err,clients) => {
            if(err) return res.status(500).send({message: 'Error al devolder los datos.'});
            if(!clients) return res.status(404).send({message: 'El documento no existe.'});
            return res.status(200).send({clients});
        });
    },

    getClientsBirthday: function(req,res){
        var birthday = req.query.date;
        Policy.find({birth_client:birthday}).exec((err,policies) => {
            if(err) return res.status(500).send({message: 'Error al devolder los datos.'});
            if(!policies) return res.status(404).send({message: 'El documento no existe.'});
            return res.status(200).send({policies});
        });
    },

}

module.exports = controller;