'use strict'

var express = require('express');
var UserController= require('../controllers/user');

var router = express.Router();
var md_auth = require('../middlewares/authenticated');

router.post('/register', UserController.save);
router.post('/login', UserController.login);
router.post('/login2', UserController.login2);
//with this
router.put('/user_update', md_auth.authenticated, UserController.update);
module.exports = router;