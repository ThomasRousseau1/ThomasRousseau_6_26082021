const express = require('express');
const mongoose = require('mongoose');


mongoose.connect('mongodb+srv://TotoP6:Javascriptitnotthateasy500@cluster0.ocd2m.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

const app = express();


//Exporter cette const pour y accéder depuis les autres fichiers dont le serveur node
module.exports = app;