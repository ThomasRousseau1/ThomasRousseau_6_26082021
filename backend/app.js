const bodyParser = require('body-parser');
const express = require('express');
const mongoose = require('mongoose');

// const sauceRoutes = require('./routes/sauce');
const userRoutes = require('./routes/user');


mongoose.connect('mongodb+srv://TotoP6:Javascriptitnotthateasy500@cluster0.ocd2m.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

const app = express();

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

// app.use('/api/sauce', sauceRoutes);
app.use(bodyParser.json());
app.use('/api/auth', userRoutes);//Import du router auth.js


//Exporter cette const pour y accéder depuis les autres fichiers dont le serveur node
module.exports = app;