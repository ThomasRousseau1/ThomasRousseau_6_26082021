const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const userSchema = mongoose.Schema({
    email: { type: String, required: true, unique: true},//unique: true pour que ce soit impossible de s'inscrire plusieurs fois avec le même mail
    password: { type: String, required: true},
});

userSchema.plugin(uniqueValidator);//Pour empêcher l'utilisateur de créer plusieurs fois le même mail

module.exports = mongoose.model('User', userSchema);