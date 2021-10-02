const express = require('express');
const { nextTick } = require('process');
const loginRoute = express.Router();
let Usuario = require('../models/Usuario');
const bcrypt = require('bcrypt');

const jwt = require('jsonwebtoken');
const configs = require('../config/config');


loginRoute.route("/").post((req, res) => {
    var user = req.body; //{username: "admin", pass: "admin"}
    //verificar la identidad. findOne en mongoose
    Usuario.findOne({username: user.username}, async (err, resp) => {

        if (resp != null){
            //bcrypt.compare(req.body.clave, resp.clave, (errr, clave) => {
                if(req.body.clave == resp.clave) {
                    let payload = { username: user.username, tipoUsuario: resp.tipoUsuario };
                    let token = jwt.sign(payload, configs.claveSecreta, {expiresIn: 1440});
                    res.json({msg: "Autenticación correcta", token: token, payload: payload});
                }else {
                    res.json({msg: "Ha ocurrido un problema con la autenticación", error: errr});
                }
            //});
            
        }else {
            res.json({msg: "Usario no encontrado.", error: err});
        }

    })
})


module.exports = loginRoute;