'use strict'

var jwt = require('jwt-simple');
//module for the exp time of token
var moment = require('moment');

exports.createToken = function(user){
    //all the data of the user we want to identify and generate the token
    //this is the obj we are gonna generate the token and send to the front for persist the token
    var payload = {
        //sub = id
        sub: user._id,
        name: user.name,
        surname: user.surname,
        email: user.email,
        role: user.role,
        //date of creation of this token
        iat: moment().unix(),
        //date of expiration
        exp: moment().add(30, ' days').unix
    };

    return jwt.encode(payload, 'secret-password-UNJX4vua'); 

}