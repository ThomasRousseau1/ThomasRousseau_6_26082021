const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

//hash du mot de passe, puis avec le hash créé par bcrypt, enregistrement du user dans la base de données
exports.signup = (req, res, next) => {
    bcrypt.hash(req.body.password, 10)//ajout du mdp du corps de la requête venant du frontend
        .then(hash => {
            const user = new User ({ 
                email: req.body.email, //passe l'adresse fournie dans le corps de la requête
                password: hash
            });
            user.save()//pour enregistrer l'User dans la base de données
                .then(() => res.status(201).json({ message: 'Utilisateur créé '}))
                .catch( error => res.status(400).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));
};
//Fonction signup pour crypter le mdp, le prendre et créer un new User avec l'email et le password puis va enregistrer l'user dans la base de données



exports.login = (req, res, next) => {
    User.findOne({ email: req.body.email })
        .then(user => {
            if (!user) {//Si l'email n'est pas bon, renvoie l'erreur suivante 
                return res.status(401).json({ error: 'Utilisateur non trouvé !' });
            }
            bcrypt.compare(req.body.password, user.password)//Comparaison du mot de passe envoyé par la requête avec le hash de la base de données
                .then(valid => {//Si l'email rentré n'est pas bon, renvoie l'erreur suivante
                    if (!valid) {
                        return res.status(401).json({ error: 'Mot de passe incorrect !' });                 
                    }
                    res.status(200).json({//Si la comparaison est valable, renvoi d'un userid et d'un token à l'utilisateur
                        userId: user._id,
                        token: jwt.sign(                    
                               { userId: user._id },//Données qu'on veut encoder dans le token(payload)   
                               'RANDOM_TOKEN_SECRET',//Clef secrète pour l'encodage
                               { expiresIn: '24h'}//Date d'expiration du token                   
                        )
                    });
                })
                .catch(error => res.status(500).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));
};



