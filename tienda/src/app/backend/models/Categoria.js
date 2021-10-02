const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Categoria = new Schema({
    // Las categorías tengan un nombre no vacío
    nombre : { type: String, required: true },
}, { collection: "categorias" })

module.exports = mongoose.model("Categoria", Categoria);