const Sauce = require('../models/Sauce');
const fs = require('fs');

//Controller création de sauce
exports.createSauce = (req, res, next) => {
    const sauceObject = JSON.parse(req.body.sauce);//extraction de l'objet JSON de sauce 
    delete sauceObject._id;
    const sauce = new Sauce ({ 
        ...sauceObject,//Opérateur spread pour copier l'instance de Sauce et l'importer ici 
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`//Générer l'url de l'image: le protocole, le nom d'hôte /image/ et le nom de fichier
    });
    sauce.save()//Pour enregistrer l'objet dans la base de données et retourner une promise
    .then(() => res.status(201).json({ message: 'Sauce enregistrée !' }))
    .catch(error => res.status(400).json({ error:error }));
};


//Controller pour modifier une sauce
exports.modifySauce = (req, res, next) => {
    let sauceObject = {};//création objet vide
    req.file ?//Si on trouve un fichier
     (
        Sauce.findOne({ _id: req.params.id })//récupération d'une seule sauce via l'id
        .then((sauce) => {
            const filename = sauce.imageUrl.split('/images/')[1]//récupération du fichier image de la sauce
            fs.unlinkSync(`images/${filename}`)//
        })
        .catch(error => res.status(400).json({ error })),
        sauceObject = {...JSON.parse(req.body.sauce),//Récupération de la chaîne de caractères parsée en objet
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,//On modifie l'imageUrl
        }) : (sauceObject = {...req.body});//Sinon : , on prend le corps de la requête
    Sauce.updateOne({ _id: req.params.id }, { ...sauceObject, _id: req.params.id })//On prend sauceObject en modifiant son identifiant pour correspondre aux paramètres de req
    .then(() => res.status(200).json({ message: 'Sauce modifiée !'}))
    .catch(error => res.status(400).json({ error }));
};

//Controller pour supprimer une sauce
exports.deleteSauce = (req, res, next) => {
    Sauce.findOne({ _id: req.params.id })//Trouver l'objet dans la base de données
    .then(sauce => {
        const filename = sauce.imageUrl.split('/images/')[1];//Pour récupérer le nom du fichier qui vient après /images/ et extraire le fichier à supprimer
        fs.unlink(`images/${filename}`, () => {//On le supprime avec fs.unlink
            Sauce.deleteOne({ _id: req.params.id })//callback de fs.unlink, on supprimer la suppression de l'objet dans la base
            .then(() => res.status(200).json({ message: 'Sauce supprimée !'}))
            .catch(error => res.status(400).json({ error }));
        });
    })
    .catch(error => res.status(500).json({ error }));
};

//Controller pour gérer les likes
exports.createLike = (req, res, next) => {
    Sauce.findOne({ 
        _id: req.params.id
    })
    .then(sauce => {
        //Dans le cas où la personne dislike la sauce
        if (req.body.like == -1) {
            sauce.dislikes++;
            sauce.usersDisliked.push(req.body.userId);
            sauce.save();
        }
        //Dans le cas où la personne like la sauce
        if (req.body.like == 1) {
            sauce.likes++; //Ajout d'un like
            sauce.usersLiked.push(req.body.userId);//Push du username et de son dislike dans le tableau 
            sauce.save();
        }    

        //
        if (req.body.like == 0) {
            if (sauce.usersLiked.indexOf(req.body.userId) != -1) {
            sauce.likes--;//Suppression du like
            sauce.usersLiked.splice(sauce.usersLiked.indexOf(req.body.userId), 1)

        } else {
            sauce.dislikes--;//Suppression du dislike 
            sauce.usersDisliked.splice(sauce.usersDisliked.indexOf(req.body.userId), 1);
        }
        sauce.save();
    }
        res.status(200).json({ message: "L'utilisateur a liké la sauce !"})
    })
    .catch(error => {
    res.status(500).json({ error })
    });
};

//Controller pour récupérer une seule sauce
exports.getOneSauce = (req, res, next) => {
    Sauce.findOne({ _id: req.params.id })
    .then(sauce => res.status(200).json(sauce))
    .catch(error => res.status(400).json({ error }));
};

exports.getAllSauces = (req, res, next) => {
    Sauce.find()
    .then(sauces => res.status(200).json(sauces))
    .catch(error => res.status(400).json({ error }));
};