'use strict'

var validator = require('validator');
var bcrypt = require('bcrypt');
var User = require('../models/user');
var jwt = require('../services/jwt');

var controller =  {
    save: function(req,res){
        //get the params of petition
        var params = req.body
        //valid the data this is going to return true or false
        try{
            var validate_name = !validator.isEmpty(params.name);
            var validate_surname = !validator.isEmpty(params.surname);
            var validate_email = !validator.isEmpty(params.email) && validator.isEmail(params.email);
            var validate_password = !validator.isEmpty(params.password);
        }catch(err){
            return res.status(200).send({
                message: "Faltan datos por enviar"
            });
        }
        
        if(validate_name && validate_surname && validate_email && validate_password){
             //create object user
            var user = new User();
            //assign values to user
            user.name = params.name;
            user.surname = params.surname;
            user.email = params.email.toLowerCase();
            user.role = 'ROLE_USER';

            //proove if user already exist
            //seacrh the email to look if the user already exist
            User.findOne({email: user.email}, function (err, issetUser){
                if(err){
                    return res.status(500).send({
                        message: "Error al comprobar duplicidad de usuario",
                    });
                }
                //en el caso de que no exista el usuario
                if(!issetUser){
                    //if dont exist 
                    //encrypt password
                    bcrypt.hash(params.password,  10,(err, hash) => {
                        user.password = hash;
                        //save user
                        user.save((err, userStored) => {
                            if(err){
                                return res.status(500).send({
                                    message: "Error al guardar el usuario",
                                }); 
                            }
                            if(!userStored){
                                return res.status(400).send({
                                   message:"El usuario no se ha guardado", 
                                });
                            }
                            //return ans
                            return res.status(200).send({user: userStored});
                        }); //close save
                    }); //close bcrypt
                //en el caso de que si exista el usuario
                }else{
                    return res.status(500).send({
                        message: "El usuario ya esta registrado",
                    }); 
                }
            });
          
        }else{
            return res.status(200).send({
                message: "Validacion de los datos incorrecta",
            });
        }  
    },
    
    login: function(req, res){
         //get the params of the petition
        var params = req.body;
         //validate the data
        var validate_email =  !validator.isEmpty(params.email) && validator.isEmail(params.email);
        var validate_password =  !validator.isEmpty(params.password);
        if(!validate_email || !validate_password){
            return res.status(200).send({
                message:"Los datos son incorrectos"
            });
        }
         //search user that match with the email
        User.findOne({email: params.email.toLowerCase()}, (err,user) => {
            if(err){
                return res.status(500).send({
                    message:"Error al identificarse",
                });
            }
            if(!user){
                return res.status(404).send({
                    message:"El usuario no existe",
                });
            }
            //if it is found,
            //proove the password ( match with email and password / bcrypt)
            bcrypt.compare(params.password, user.password, function(err,check){
                //if it is right,
                if(check){
                    //generate token jwt and return it
                    if(params.gettoken){
                        //return the data
                        return res.status(200).send({
                            token: jwt.createToken(user)
                        });
                    }else{
                        //clean objt
                        user.password = undefined;
                        //return the data
                        return res.status(200).send({
                            message:"success",
                            user
                        });
                    }
                }else{
                    return res.status(200).send({
                        message:"Las credenciales no son correctas",
                    });

                }
               
            });
          
        });
    },

    update: function(req, res){
        //create middleware to prove the jwt token, and put it to the router
        var params = req.body;
        //validate data
        try{
            var validate_name = !validator.isEmpty(params.name);
            var validate_surname = !validator.isEmpty(params.surname);
            var validate_email = !validator.isEmpty(params.email) && validator.isEmail(params.email);
        }catch(err){
            return res.status(200).send({
                message:"Faltan datos por enviar",
            });
        }
        //delete innecesary properties
        delete params.password;
        
        var userId = req.user.sub;

        //prove if the email is unique
        if(req.user.email != params.email){
            User.findOne({email: params.email.toLowerCase()}, (err,user) => {
                if(err){
                    return res.status(500).send({
                        message:"Error al intentar identificarse",
                    });
                }
                if(user && user.email == params.email ){
                    return res.status(404).send({
                        message:"El email no puede ser modificado",
                });
                }
            });
        }else{
             //search and updta doc
            User.findOneAndUpdate({_id: userId}, params, {new:true}, (err, userUpdate) => {
                if(err ){
                    return res.status(200).send({
                        status: 'error',
                        message: 'Error al actualizar usuario'
                    });
                }
                if(!userUpdate){
                    return res.status(200).send({
                        status: 'error',
                        message: 'No se a actualizado el usuario'
                    });
                }
                return res.status(200).send({
                    status: 'success',
                    user: userUpdate
                });
            });
        }
       
     
    }
};


module.exports = controller;