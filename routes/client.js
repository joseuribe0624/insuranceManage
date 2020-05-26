'use strict'

var express = require('express');
var ClientController= require('../controllers/client');
var md_auth = require('../middlewares/authenticated');

var router = express.Router();

router.post('/create_client/:id', md_auth.authenticated, ClientController.saveClient);
router.put('/update_client/:id/:idClient', md_auth.authenticated, ClientController.updateClient);
router.put('/delete_client/:id', md_auth.authenticated, ClientController.deleteClient);

module.exports = router;