const express = require('express');
const { nextTick } = require('process');
const app = express();
const productoRoute = express.Router();

//load del modelo de mongoose
let Categoria = require('../models/Categoria');
let Producto = require('../models/Producto');

productoRoute.route('/').get((req, res) => {
    console.log("traemos el listado de productos");

    Producto.find().populate("categoriaId").exec((err, data) => {
        if(err) {
            return next(err);
        } else {
            res.json(data);
        }
    });
    //res.send("Ok. Listamos pelis");
});

productoRoute.route("/").post((req, res) => {
    Producto.create(req.body, (err, data) => {
        if(err) {
            return next(err);
        } else {
            res.json(data);
        }
    })
});

productoRoute.route("/:id").delete((req, res) => {
    console.log("Delete "+ req.params.id);
    Producto.findByIdAndDelete(req.params.id, (err, data) => {
        if(err) {
            return next(err);
        } else {
            res.json(data);
        }
    });
});

productoRoute.route('/:id').get((req, res) => {
    console.log("traemos el listado de peliculas id");

    Producto.findById(req.params.id, (err, data) => {
        if(err) {
            return next(err);
        } else {
            res.json(data);
        }
    })
    //res.send("Ok. Buscamos por id "+req.params.id);
});

productoRoute.route("/:id").put((req, res) => {
    Producto.findByIdAndUpdate(req.params.id, { $set: req.body }, {new: true}, (err, data) => {
        if(err) {
            return next(err);
        } else {
            res.json(data);
            // Pelicula.findById(data._id, (err, data) => {
            //     if(err) {
            //         return next(err);
            //     } else {
            //         res.json(data);
            //     }
            // })
        }
    });
});

module.exports = productoRoute;