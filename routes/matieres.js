let Matiere = require('../model/matiere.js');

function getMatieres(req, res) {
    Matiere.find({}, function (error, matieres) {
        if (error) return res.status(500).send({message: 'Erreur sur le serveur.'});
        res.status(200).send(matieres);
    }).sort({nomMatiere: 1});
}

async function addMatiere(req, res) {
    try {
        let matiere = new Matiere();
        matiere.id = req.body.id;
        matiere.image = req.body.image;
        matiere.nomMatiere = req.body.nomMatiere;
        matiere.professeur = req.body.professeur;
        await matiere.save();
        res.status(201).send({message: 'Matiere créer'});
    } catch (e) {
        res.status(500);
        res.send({message: "Une erreur s'est produite lors de l'ajout"}, e);
    }
}

module.exports = {getMatieres, addMatiere};
