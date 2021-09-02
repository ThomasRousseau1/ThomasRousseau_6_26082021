![PIIQUANTE](https://user.oc-static.com/upload/2021/07/29/16275605596354_PiiquanteLogo.png)

## Le Projet : 
Sixième projet à réaliser dans le cadre de la formation Développeur Web d'Openclassrooms. L'objectif est d'implémenter la partie backend d'une application web de critique de sauces piquantes. 

## Repo du projet d'origine : 
Voici le repo contenant le frontend du projet et les informations pour initialiser le projet : https://github.com/OpenClassrooms-Student-Center/Web-Developer-P6

## Dépendances : 
Vous aurez besoin d'installer les dépendances suivantes : 
- Express 
- Mongoose(pour MongoDB)
- Mongoose unique validator 
- Bcrypt 
- Multer 
- Jsonwebtoken
- Nodemon
   
### Pour lancer le backend : 
Allez dans le terminal de commandes et tapez cd backend puis nodemon server. 

### Pour lancer le frontend : 
Allez dans le terminal et tapez cd frontend puis npm start.

## Sécurité pour mongoDB
Dans app.js, dans la fonction mongoose.connect, le login et password ne sont pas directement affichés. Je les ai préalablement mis dans des variables d'environnement pour une question de sécurité. 