'use strict'

var cron = require('node-cron');
var nodemailer = require('nodemailer');
var nodemailMailgun = require('nodemailer-mailgun-transport');

const auth = {
    auth: {
        api_key: '9b1cd01fc04bd66bad4b14264b52a105-7fba8a4e-91ac05f3',
        domain: 'sandboxe3149b9e89554dd7845d0b2e3c73045b.mailgun.org'
    }
};

//where i want to connect
let transporter = nodemailer.createTransport(nodemailMailgun(auth));

cron.schedule('* * * * *', () => {
    var emailReceiver = 'joseuribe0624@gmail.com';
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
    });
    console.log('running a task every minute');
});