'use strict'

var mongoose = require('mongoose');
var app = require('./app');
var port = process.env.PORT || 3999;

mongoose.set('useFindAndModify', false);
mongoose.set('useUnifiedTopology',true);
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/api_insur', {useNewUrlParser: true})
        .then(() => {
            console.log("the conection is stablish");
            //create server
            app.listen(port, () => {
                console.log("The server http//localhost:3999 is running !!")
            });
        })
        .catch(error=>console.log(error));