const express = require('express');
const { nextTick } = require('process');
const app = express();
const peliculaRoute = express.Router();

//load del modelo de mongoose
let Pelicula = require('../models/Pelicula');

//añadimos las rutas
peliculaRoute.route('/').get((req, res) => {
    console.log("traemos el listado de peliculas");

    Pelicula.find((err, data) => {
        if(err) {
            return next(err);
        } else {
            res.json(data);
        }
    });
    //res.send("Ok. Listamos pelis");
})

peliculaRoute.route('/:id').get((req, res) => {
    console.log("traemos el listado de peliculas id");

    Pelicula.findById(req.params.id, (err, data) => {
        if(err) {
            return next(err);
        } else {
            res.json(data);
        }
    })
    //res.send("Ok. Buscamos por id "+req.params.id);
})

peliculaRoute.route("/").post((req, res) => {
    Pelicula.create(req.body, (err, data) => {
        if(err) {
            return next(err);
        } else {
            res.json(data);
        }
    })
});

peliculaRoute.route("/:id").put((req, res) => {
    Pelicula.findByIdAndUpdate(req.params.id, { $set: req.body }, {new: true}, (err, data) => {
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

peliculaRoute.route("/:id").delete((req, res) => {
    console.log("Delete "+ req.params.id);
    Pelicula.findByIdAndDelete(req.params.id, (err, data) => {
        if(err) {
            return next(err);
        } else {
            res.json(data);
        }
    });
});


module.exports = peliculaRoute;