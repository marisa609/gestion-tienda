const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Pelicula = new Schema({
    titulo : { type: String },
    productora: { type: String },
    generos: { type: Array }
}, { collection: "peliculas" })

module.exports = mongoose.model("Pelicula", Pelicula);