let mongoose = require('mongoose');
let Schema = mongoose.Schema;
const aggregatePaginate = require("mongoose-aggregate-paginate-v2");

let MatiereSchema = Schema({
    id: Number,
    image: String,
    nomMatiere: String,
    professeur: Object
});

MatiereSchema.plugin(aggregatePaginate);

module.exports = mongoose.model('matieres', MatiereSchema);
