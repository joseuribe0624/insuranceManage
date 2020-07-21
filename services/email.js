/*'use strict'
var express = require('express');
var cron = require('node-cron');
var nodemailer = require('nodemailer');
var nodemailMailgun = require('nodemailer-mailgun-transport');
const axios = require('axios');

var policies;
var clients;

//email
const auth = {
    auth: {
        api_key: '9b1cd01fc04bd66bad4b14264b52a105-7fba8a4e-91ac05f3',
        domain: 'sandboxe3149b9e89554dd7845d0b2e3c73045b.mailgun.org'
    }
};

//where i want to connect
let transporter = nodemailer.createTransport(nodemailMailgun(auth));

function email(receiver, messsage){
     /*var emailReceiver = 'joseuribe0624@gmail.com';
    //from: 'Excited User <me@samples.mailgun.org>',
    var mailOptions = {
        from: 'Excited User <clientsmanage@gmail.com>',
        to: emailReceiver,
        subject: 'pruebas seguros',
        text: 'it is working' 
    };
        
    transporter.sendMail(mailOptions, function(err, data){
        if(err){
            console.log('Error: ', err);
        }else{
            console.log('message sent!!!')
        }
    }); aqui iba un este de cerrar comentario
}


async function get_policies(month) {
    try {
      const response = await axios.get('http://localhost:3999/api/policies_by_renovation/',{params:{date:month}})
      return response.data.policies;
    } catch (error) {
      console.error(error);
    }
}

async function get_clients(month) {
    try {
      const response = await axios.get('http://localhost:3999/api/get_clients_birthday/',{params:{date:month}})
      return response.data.clients;
    } catch (error) {
      console.error(error);
    }
}

cron.schedule('* * * * *', () => {
    var date = new Date();
    //+1 cause getMonth() start from 0
    var month = date.getMonth()+1;
    (async () =>{
        policies = await get_policies(month);      
        var data = {};
        var belong;
        for (let i = 0; i < policies.length; i++){
            if (i == 0){
                var policy={
                    type : policies[i].policy_type,
                    expire : policies[i].polipolicy_end,
                }
                belong = policies[i].belongToClient;
                data[belong] = policy;
            }else{
                belong = policies[i].belongToClient;
                if(data[belong] == undefined){
                    var policy={
                        type : policies[i].policy_type,
                        expire : policies[i].policy_end,
                        email : policies[i].email_client,
                    }
                    data[belong] = policy;
                }
            }  
        }
    })();  
  
    //console.log('running a task every minute');
});
*/