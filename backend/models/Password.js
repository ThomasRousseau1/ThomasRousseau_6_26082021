const passwordValidator = require('password-validator');

const passwordSchema = new passwordValidator();

passwordSchema 
.is().min(8)//Minimum 8 caractères 
.has().uppercase()//Au moins une majuscule 
.has().lowercase()//Au moins une minuscule
.has().digits()//Au moins un chiffre
.has().not().spaces()//Pas d'espaces 
.is().not().oneOf(['Password123', 'Mypassword1234', 'Monmotdepasse123'])//Valeurs non acceptées

module.exports = passwordSchema; 