
/*
Pedido detalle es un array del pedido.
Cliente es un objeto, podríamos llamar a usuario. Pero por simplificar el entendimiento me baso en el del profesor.
Dirección también es un objeto.

*/

import { Direccion } from "./Usuario";

export interface PedidoDetalle {
    cantidad: number,
    descuento: number,
    refProducto: string,
    tituloProducto: string,
    precioUnitario: number,
    precioTotal: number,
}

export interface Pedido {
    _id?: string,
    numeroPedido: string,
    fecha?: Date,
    pecioTotal: number,
    cliente: {
        nombre: string,
        apellido: string,
        dni: string,
        email: string,
        idUsuario: string
    },
    direccionEntrega: Direccion,
    pedidoDetalle: PedidoDetalle[]
}