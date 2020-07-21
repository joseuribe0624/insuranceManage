'use strict'

var express = require('express');
var ClientController= require('../controllers/client');
var md_auth = require('../middlewares/authenticated');

var router = express.Router();

router.post('/create_client', md_auth.authenticated, ClientController.saveClient);
router.put('/update_client/:idClient', md_auth.authenticated, ClientController.updateClient);
router.delete('/delete_client/:id', md_auth.authenticated, ClientController.deleteClient);
//parametro obligatorio es sin el ?
router.get('/get_client/:id', md_auth.authenticated, ClientController.getClient);
//the id for get clients is the id belong_to_user
router.get('/get_clients/:id', md_auth.authenticated, ClientController.getClients);
router.get('/get_clients_birthday', ClientController.getClientsBirthday);
module.exports = router;