const express = require('express');
const mongoose = require('mongoose');
const path = require('path');//Pour accéder au chemin de système de fichiers, les images

const sauceRoutes = require('./routes/sauces');
const userRoutes = require('./routes/user');

const login = process.env.MONGO_USER;
const password = process.env.MONGO_PASSWORD;
mongoose.connect(`mongodb+srv://${login}:${password}@cluster0.ocd2m.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`,
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

app.use(express.urlencoded({extended: true})); 
app.use(express.json());

app.use('/images', express.static(path.join(__dirname, 'images')));

app.use('/api/sauces', sauceRoutes);
app.use('/api/auth', userRoutes);//Import du router auth.js


//Exporter cette const pour y accéder depuis les autres fichiers dont le serveur node
module.exports = app;