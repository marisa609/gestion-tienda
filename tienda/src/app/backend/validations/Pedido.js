let Pedido = require('../models/Pedido');

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


https://www.tabnine.com/code/javascript/functions/express-validator/checkSchema
 */

var validacion = {
    fecha: {
        custom: {
            options: (value) => {
                //Guardamos la fecha que nos llega
                fecha = new Date(value);
                //Obtenemos la fecha actual
                fechaActual = Date.now();
                
                if(fecha > +fechaActual) {
                    return Promise.reject("La fecha no es actual");
                    //withMessage("La fecha no es actual");
                }
                return Promise.resolve();
               
            }
        }
    },
    pedidoDetalle: {
        custom: {
            options: (value, { req }) => {
                myArray = req.body.pedidoDetalle;

                for (i = 0; i < myArray.length; i++) { 
                    console.log('Entra en el for');
                    precioUnitario = myArray[i].precioUnitario; 
                    cantidad = parseInt(myArray[i].cantidad);
                    totalCalculado = parseInt(precioUnitario * cantidad);
                    precioTotal = parseInt(myArray[i].precioTotal);
                    
                   //Se que un if vacío duele a los ojos porque basta con negar la condición, pero me hacía cosas raras si lo negaba (muy raro también)
                    if(precioTotal == totalCalculado) {
                        
                    }else {
                        throw new Error("El precio total no se corresponde a la multiplicación del precio unitario por la cantidad");
                    }

                }
                return true;
            }
        }
    }
    /**
     * 
     * MISMA CONDICIÓN SIN BUBLE FOR. FUNCIONABA

     * pedidoDetalle: {
        custom: {
            options: (value, { req }) => {
                console.log(req.body.pedidoDetalle);
                precioUnitario = req.body.pedidoDetalle[0].precioUnitario;
                cantidad = req.body.pedidoDetalle[0].cantidad;
                totalCalculado = precioUnitario * cantidad;

                console.log(req.body.pedidoDetalle[0].precioTotal);
                console.log(totalCalculado);

                if(req.body.pedidoDetalle[0].precioTotal == totalCalculado) {
                }else {
                    return Promise.reject("El precio total no se corresponde a la multiplicación del precio unitario por la cantidad");
                }
                return Promise.resolve();
            }
        }
    }
     */
}

module.exports = validacion;