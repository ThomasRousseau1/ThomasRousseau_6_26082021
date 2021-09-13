![PIIQUANTE](https://user.oc-static.com/upload/2021/07/29/16275605596354_PiiquanteLogo.png)

# Le Projet : 
Sixième projet à réaliser dans le cadre de la formation Développeur Web d'Openclassrooms. L'objectif est d'implémenter la partie backend d'une application web de critique de sauces piquantes. 

# Installation : 

## Repo du projet d'origine : 
Voici le repo contenant le frontend du projet et les informations pour initialiser le projet : https://github.com/OpenClassrooms-Student-Center/Web-Developer-P6
Il vous suffit de le cloner dans VS Code.

## Pour lancer le backend : 
Allez dans le terminal de commandes, faites npm install et tapez cd backend puis nodemon server. 

Il vous faudra rajouter un dossier 'images' dans le backend qui permettra au moment de la création d'une sauce, d'ajouter l'image dans ce dossier.

## Pour lancer le frontend : 
Allez dans le terminal, faites npm install et tapez cd frontend puis npm start.

## Test
Dans app.js, dans la fonction mongoose.connect, l'url de connexion à mongoDB n'est pas directement affiché. Je l'ai préalablement mis dans une variable d'environnement pour une question de sécurité. C'est également le cas pour le token. L'url et le token doivent être créés dans un fichier .env comme ci-desssous : 

MONGO_URL = mongodb+srv://TotoP6:Javascriptitnotthateasy500@cluster0.ocd2m.mongodb.net/myFirstDatabase?retryWrites=true&w=majority 

TOKEN = RANDOM_TOKEN_SECRET
