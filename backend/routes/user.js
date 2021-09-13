const express = require('express');
const router = express.Router();//Importation du module Router
const userCtrl = require('../controllers/user');//Création chemin user venant des controllers
const verifyPassword = require('../middleware/verifyPassword');

router.post('/signup', verifyPassword, userCtrl.signup);
router.post('/login', userCtrl.login);

module.exports = router; 