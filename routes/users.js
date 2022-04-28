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
function addUser(req, res) {
    let user = new User();
    user.id = req.body.id;
    user.username = req.body.username;
    user.name = req.body.name;
    user.profile = req.body.profile;

    user.password = bcrypt.hashSync(req.body.password, 8);


    console.log("POST register reçu :");
    console.log(user)

    user.save((err) => {
        if (err) {
            res.send('cant post register ', err);
        }
        res.json({message: `${user.username} saved depuis la version HEROKU!`})
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
        const userValide = {id: user.id, username: user.username, name: user.name, profile: user.profile};
        res.status(200).send({auth: true, user: userValide, token: token});
    });
}


module.exports = {me, login, addUser};
