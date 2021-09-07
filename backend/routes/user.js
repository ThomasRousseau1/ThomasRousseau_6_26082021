const express = require('express');
const router = express.Router();//Importation du module Router
const userCtrl = require('../controllers/user');//Création chemin user venant des controllers

router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);

module.exports = router; 