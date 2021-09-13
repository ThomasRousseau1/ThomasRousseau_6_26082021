const express = require('express');
const mongoose = require('mongoose');

//Pour accéder au chemin de système de fichiers, les images
const path = require('path');

//Appel du module Helmet qui permet d'améliorer la sécurité de l'appli en sécurisant les requêtes http, les entêtes, empêcher le détournement de clics 
const helmet = require('helmet');
const nocache = require('nocache');

const sauceRoutes = require('./routes/sauces');
const userRoutes = require('./routes/user');
require('dotenv').config();

//Connection à la base de données mongoDB avec l'url contenant le login et le password dans une variable d'environnement 
mongoose.connect(process.env.MONGO_URL,
  { useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

//express sera appelé partout où est utilisé app 
const app = express();


//Middleware pour contrer l'erreur de CORS bloquant les appels HTTP
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');//Pour accéder à l'API depuis n'importe quelle origine
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');//Pour ajouter les headers mentionnés aux requêtes envoyées vers l'API
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');//Pour permettre d'envoyer les requêtes mentionnées
  next();
});


app.use(helmet());

//Permet de désactiver la mise en cache du navigateur
app.use(nocache());

//Middleware permettant de parser les requêtes envoyées par l'utilisateur
app.use(express.urlencoded({extended: true})); 
app.use(express.json());

app.use('/images', express.static(path.join(__dirname, 'images')));

app.use('/api/sauces', sauceRoutes);
app.use('/api/auth', userRoutes);//Import du router auth.js


//Exporter cette const pour y accéder depuis les autres fichiers dont le serveur node
module.exports = app;