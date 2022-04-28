let mongoose = require('mongoose');
let Schema = mongoose.Schema;
const aggregatePaginate = require("mongoose-aggregate-paginate-v2");

let UserSchema = Schema({
    id: Number,
    username: String,
    password: String,
    name: String,
    profile: String
});

// Pour ajouter la pagination
UserSchema.plugin(aggregatePaginate);

// C'est à travers ce modèle Mongoose qu'on pourra faire le CRUD
module.exports = mongoose.model('users', UserSchema);
