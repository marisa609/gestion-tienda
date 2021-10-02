const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/**
 * Número pedido no vacío, único y siguiendo el formato POXXXX donde XXXX es un numero
secuencial (se debe generar en node cuando se inserta y no se puede editar)
u Fecha obligatoria y ****no puede ser futura****
u Precio total tiene que ser número, no vacío y mayor o igual que 0. ****El valor lo tiene que
calcular node*****
u Cliente tiene que ser obligatorio, y todos los datos internos de cliente (nombre, apellido,
etc) también obligatorios no vacios
u Dirección de entrega tiene que ser obligatoria, con valores no vacíos en sus campos
internos
u Pedidos detalle es obligatorio y como mínimo tiene que tener 1 elemento el array
 */


/**
 * Cantidad tiene que ser un número y mayor a 0
u Descuento tiene que ser un número entre 0 y 100, no obligatorio y por defecto valor 0
u refProducto tiene que ser un valor no vacío y en **el momento de la creación tiene que
asegurarse que existe un producto con esa referencia**
u tiutloProducto tiene que ser un valor no vació
u precioUnitario tiene que ser un valor numérico mayor o igual a 0
u precioTotal **tiene que corresponderse con la multiplicación de precioUnitario * cantidad.
Lo tiene que calcular node**
 */

let Pedido = new Schema({
    numeroPedido: {type: String, required: true, unique: true, match: /^[A-Z]{2}[0-9]{4}$/ },
    fecha: {type: Date, required: true, default: Date.now },
    pecioTotal: {type: Number, required: true, match: /^([0-9]*[1-9][0-9]*(\.[0-9]+)?|[0]+\.[0-9]*[1-9][0-9]*)$/ },
    cliente: {
        required: true,
        type: new Schema({
            nombre: { type: String, required: true },
            apellido: { type: String, required: true },
            dni: { type: String, required: true },
            email: { type: String, required: true },
        /* idUsuario: {type: Schema.Types.ObjectId, ref: "Usuario" } */
    })},
    direccionEntrega: {
        required: true,
        type: new Schema({
            calle: { type: String, required: true },
            localidad: { type: String, required: true },
            provincia: { type: String, required: true },
            cp: { type: Number, required: true },
    })},

    pedidoDetalle: [{
        required: true,
        type: new Schema({
            cantidad: {type: Number, match: /^[1-9][0-9]*$/ },
            descuento: {type: Number, default: 0, match: /^0*(?:[0-9][0-9]?|100)$/ },
            refProducto: {type: String, required: true },
            tituloProducto: {type: String, required: true },
            precioUnitario: {type: Number, match: /^([0-9]*[1-9][0-9]*(\.[0-9]+)?|[0]+\.[0-9]*[1-9][0-9]*)$/ },
            precioTotal: {type: Number },
         
    })}]
}, { collection: "pedidos" });

module.exports = mongoose.model("Pedido", Pedido);