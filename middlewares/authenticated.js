'use strict'

var jwt = require('jwt-simple');
var moment = require('moment');
var secret = "secret-password-UNJX4vua";

exports.authenticated = function(req,res,next){
    //prove if was send the authorization
    if(!req.headers.authorization){
        return res.status(403).send({
        message : 'La peticion no tiene la cabecera de authorization' 
        });
    }
    //clean the token get off ""
    var token = req.headers.authorization.replace(/['"]+/g, '');
    //decode token
    try{
        //decode token
        var payload = jwt.decode(token, secret);
        //prove if the token has expired
        if(payload.exp <= moment().unix()){
            return res.status(404).send({
                message: 'El token ha expirado'
            });
        }
    }catch(ex){
        return res.status(404).send({
            message: 'El token no es valido'
        });
    }
    //add the user identified to a request
    req.user = payload;

    next();
}