const express = require('express');
const { nextTick } = require('process');
const app = express();
const categoriaRoute = express.Router();

//load del modelo de mongoose
let Categoria = require('../models/Categoria');

//añadimos las rutas
categoriaRoute.route('/').get((req, res) => {
    console.log("traemos el listado de categorias");

    Categoria.find((err, data) => {
        if(err) {
            return next(err);
        } else {
            res.json(data);
        }
    });
    //res.send("Ok. Listamos pelis");
});

categoriaRoute.route("/").post((req, res) => {
    Categoria.create(req.body, (err, data) => {
        if(err) {
            return next(err);
        } else {
            res.json(data);
        }
    })
});

categoriaRoute.route("/:id").delete((req, res) => {
    console.log("Delete "+ req.params.id);
    Categoria.findByIdAndDelete(req.params.id, (err, data) => {
        if(err) {
            return next(err);
        } else {
            res.json(data);
        }
    });
});

categoriaRoute.route('/:id').get((req, res) => {
    console.log("traemos el listado de peliculas id");

    Categoria.findById(req.params.id, (err, data) => {
        if(err) {
            return next(err);
        } else {
            res.json(data);
        }
    })
    //res.send("Ok. Buscamos por id "+req.params.id);
});

categoriaRoute.route("/").post((req, res) => {
    Categoria.create(req.body, (err, data) => {
        if(err) {
            return next(err);
        } else {
            res.json(data);
        }
    })
});

categoriaRoute.route("/:id").put((req, res) => {
    Categoria.findByIdAndUpdate(req.params.id, { $set: req.body }, {new: true}, (err, data) => {
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

module.exports = categoriaRoute;