let User = require('../model/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const config = require('../config');

function me(req, res) {
    const token = req.headers['x-access-token'];
    if (!token) return res.status(401).send({auth: false, message: 'No token provided.'});
    jwt.verify(token, config.secret, function (err, decoded) {
        if (err) return res.status(500).send({auth: false, message: 'Failed to authenticate token.'});
        res.status(200).send(decoded);
    });
}

// Ajout d'un utilisateur (POST)
async function addUser(req, res) {
    let user = new User();
    user.id = req.body.id;
    user.username = req.body.username;
    user.name = req.body.name;
    user.profile = req.body.profile;
    user.image = req.body.image;
    user.password = bcrypt.hashSync(req.body.password, 8);
    user.save((err) => {
        if (err) {
            res.send({message: "Une erreur s'est produite lors de l'ajout"}, err);
        }
        res.status(201).send({message: 'Utilisateur créer'});
    })
}

function login(req, res) {
    User.findOne({username: req.body.username}, function (err, user) {
        if (err) return res.status(500).send({message: 'Erreur sur le serveur.'});
        if (!user) return res.status(404).send({message: 'Aucun utilisateur trouvé.'});
        const passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
        if (!passwordIsValid) return res.status(401).send({message: 'Mot de passe invalide', auth: false, token: null});
        const token = jwt.sign({id: user._id}, config.secret, {
            expiresIn: 86400 // expires in 24 hours
        });
        res.status(200).send({auth: true, user: user, token: token});
    });
}

function getUsers(req, res) {
    User.find({}, function (error, users) {
        if (error) return res.status(500).send({message: 'Erreur sur le serveur.'});
        res.status(200).send({users: users});
    }).sort({name: 1});
}

function getUsersByProfile(req, res) {
    const profile = req.params.profile;
    User.find({profile: profile}, function (error, users) {
        if (error) return res.status(500).send({message: 'Erreur sur le serveur.'});
        res.status(200).send({users: users});
    });
}


module.exports = {me, login, addUser, getUsers, getUsersByProfile};
