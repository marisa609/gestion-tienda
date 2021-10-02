const express = require('express');
const { nextTick } = require('process');
const app = express();
const pedidosRoute = express.Router();

let Pedido = require('../models/Pedido');
let Usuario = require('../models/Usuario');

//Validaciones
const { checkSchema, validationResult } = require('express-validator');
const validarPedido = require('../validations/Pedido');

//añadimos las rutas
pedidosRoute.route('/').get((req, res) => {
    console.log("Listado de pedidos");

    Pedido.find().exec((err, data) => {
        if(err) {
            return next(err);
        } else {
            res.json(data);
        }
    })
});

pedidosRoute.route('/:id').get((req, res, next) => {
    console.log("Listado de pedidos");
    Pedido.findById(req.params.id, (err, data) => {
        if(err) {
            return next(err);
        } else {
            res.json(data);
        }
    })
});

pedidosRoute.route("/").post(checkSchema(validarPedido), async(req, res, next) => {
    console.log("Entra en insertar pedido");
    //Gestión de errores
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    Pedido.create(req.body, (err, data) => {
        if(err) {
            return next(err);
        } else {
            res.json(data);
        }
    })
});

pedidosRoute.route("/:id").put(checkSchema(validarPedido),async(req, res) => {
    //Gestión de errores
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    Pedido.findByIdAndUpdate(req.params.id, { $set: req.body }, {new: true}, (err, data) => {
        if(err) {
            return next(err);
        } else {
            res.json(data);
        }
    })
});

pedidosRoute.route("/:id").delete((req, res) => {
    console.log("Delete "+ req.params.id);
    Pedido.findByIdAndDelete(req.params.id, (err, data) => {
        if(err) {
            return next(err);
        } else {
            res.json(data);
        }
    })
});


module.exports = pedidosRoute;