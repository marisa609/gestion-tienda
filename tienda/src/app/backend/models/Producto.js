const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/**
 * Referencia no vacía, única y siguiendo el formato PXXXX donde XXXX es un número
u Título no vacío
u Precio tiene que ser numero, no vacío y mayor o igual a 0
u Categoría obligatoria
 */

let Producto = new Schema({
    referencia: { type: String, required: true, unique: true, match: /^[A-Z][0-9]{4}$/ },
    titulo: { type: String, required: true },
    descripcion: { type: String },
    precio: { type: Number, match: /^([0-9]*[1-9][0-9]*(\.[0-9]+)?|[0]+\.[0-9]*[1-9][0-9]*)$/ }, //Acepta decimales
    categoriaId: {type: Schema.Types.ObjectId, ref: "Categoria", required: true},
}, { collection: "productos" });

module.exports = mongoose.model("Producto", Producto);