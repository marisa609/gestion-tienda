const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Direccion = new Schema({
    calle: { type: String },
    localidad: { type: String },
    provincia: { type: String },
    cp: { type: Number },
});

/**
 * VALIDACIONES
 * Nombre no vacío
u DNI no vacío y formato válido (8 dígitos y 1 letra, no hace falta verificar la letra)
u Email no vacío y formato válido
u Username no vacío y único
u Clave no vacía, mínimo 8 caracteres alfanuméricos con al menos 1 mayus, 1 minus, 1 num
u Tipo no vacío y opciones válidas “Administrador” o “Cliente”
 */

let Usuario = new Schema({
    nombre : { type: String, required: true },
    apellido: { type: String },
    dni: { type: String, required: true, unique: true, match: /^[0-9]{8}[a-z]$/i },
    email: { type: String, required: true, match: /^[^@]+@[^@]+\.[a-zA-Z]{2,}$/ },
    username: { type: String, required: true, unique: true },
    clave: { type: String, required: true }, //match: /^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{8}/
    tipoUsuario: { type: String, required: true, enum: ["Administrador", "Cliente"], default: "Cliente" },
    direcciones: [Direccion]
}, { collection: "usuarios" })

module.exports = mongoose.model("Usuario", Usuario);