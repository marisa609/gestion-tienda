//https://asfo.medium.com/autenticando-un-api-rest-con-nodejs-y-jwt-json-web-tokens-5f3674aba50e

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const bcrypt = require('bcrypt');

const dbconfig = require('./database/db');

const jwt = require('jsonwebtoken');
const configs = require('./config/config');
const autorizacion = require('./routes/autorizacion');

//conexión a la BBDD
mongoose.Promise = global.Promise;
mongoose.connect(dbconfig.db, { useNewUrlParser: true }).then(() => {
    console.log("BBDD conexión correcta!!!");
}, error => {
    console.log(error);
});

const loginRoute = require('./routes/login.route');
const peliculasRoute = require('./routes/peliculas.route');
const categoriasRoute = require('./routes/categorias.route');
const usuariosRoute = require('./routes/usuarios.route');
const productosRoute = require('./routes/productos.route'); 
const pedidosRoute = require('./routes/pedidos.route');

const app = express();
app.use(cors());
app.use(express.json());


app.use("/login", loginRoute);
app.use(autorizacion());
app.use("/peliculas", peliculasRoute);
app.use("/categorias", categoriasRoute);
app.use("/usuarios", usuariosRoute);
app.use("/productos", productosRoute);
app.use("/pedidos", pedidosRoute);

app.get('/', (req, res) => {
    console.log("Holaaa estamos en /");
    res.send("Hello world!!!!!!!!!!!");
});

const port = 4000;
const server = app.listen(port, () => {
    console.log('Servidor escuchando en el puerto --> '+ port);
})