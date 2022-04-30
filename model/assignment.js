let mongoose = require('mongoose');
let Schema = mongoose.Schema;
const aggregatePaginate = require("mongoose-aggregate-paginate-v2");

let AssignmentSchema = Schema({
    id: Number,
    dateDeRendu: Date,
    nom: String,
    auteur: Object,
    matiere: Object,
    note: {type: Number, required: false, min: 0, max: 20},
    remarque: String,
    rendu: Boolean
});

// Pour ajouter la pagination
AssignmentSchema.plugin(aggregatePaginate);

// C'est à travers ce modèle Mongoose qu'on pourra faire le CRUD
module.exports = mongoose.model('assignments', AssignmentSchema);
