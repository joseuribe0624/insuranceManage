'use strict'

var express = require('express');
var PolicyController= require('../controllers/policy');
var md_auth = require('../middlewares/authenticated');

var router = express.Router();

router.post('/create_policy/:id', md_auth.authenticated, PolicyController.savePolicy);
router.post('/update_policy/:id', md_auth.authenticated, PolicyController.updatePolicy);
router.get('/get_policy/:id', md_auth.authenticated, PolicyController.getPolicy);
//the id for get policies is the id belong_to_client
router.get('/get_policies/:id', md_auth.authenticated, PolicyController.getPolicies);
router.delete('/delete_policy/:id', md_auth.authenticated, PolicyController.deletePolicy);
module.exports = router;