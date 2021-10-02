const express = require("express");
const cors = require("cors");

const dbName = "tienda";
const dbConnection = "mongodb://localhost:27017/" + dbName;

const mongo = require("mongodb");
const MongoClient = mongo.MongoClient;

let db;
MongoClient.connect(dbConnection, (err, client) => {
    if(err) throw err;
    console.log("BBDD conectada correctamente");
    db = client.db(dbName);
});

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    console.log("Holaaa estamos en /");
    res.send("Hello!")
});
app.post("/", (req, res) => {
    console.log("Entra por post!!");
    console.log(req.body);

    var respuesta = {status: "ok"};
    res.json(respuesta);
});

//LISTADO PELICULAS
app.get("/listado", (req, res) => {
    db.collection("peliculas").find().toArray().then(result => {
        console.log(result);
        res.json(result);
    })
    .catch(err => console.log(err));

    //res.send("OKK");
});

app.post("/insertPeli", (req, res) => {
    var peli = req.body;
    console.log(peli);
    if(typeof peli !== "undefined"){
        db.collection("peliculas").insertOne(peli);
    }
    res.end();
});

//LISTADO CATEGORIAS
app.get("/listadoCategorias", (req, res) => {
    db.collection("categorias").find().toArray().then(result => {
        res.json(result);
    })
    .catch(err => console.log(err));

    //res.send("OKK");
});

app.post("/insertCategorias", (req, res) => {
    var categoria = req.body;
    if(typeof categoria !== "undefined"){
        db.collection("categorias").insertOne(categoria);
    }
    res.end();
});

//ELIMINAR CATEGORIAS
/**new mongo.ObjectId(id)

db.collection("peliculas").deleteOne(delParams).then(res => console.log(res));
 */

app.delete("/borrarCategorias/:id", (req, res) => {
    var id = req.params.id;
    if(typeof id !== "undefined"){
        var delParams = {_id: new mongo.ObjectId(id)};
        console.log(delParams);
        db.collection("categorias").deleteOne(delParams).then(res => console.log(res));
    }
    res.end();
});

app.put("/editarCategoria/:id", (req, res) => {
    var id = req.params.id;
    var categoria = req.body;
    console.log("llega al servidor " + id);
    console.log("llega al servidor " + categoria);
    delete categoria._id;
    var findParams = {_id: new mongo.ObjectId(id)};
    console.log("llega al servidor " + findParams);
    if(typeof id !== "undefined"){
        var delParams = {_id: new mongo.ObjectId(id)};
        console.log(delParams);
        db.collection("categorias").deleteOne(delParams).then(res => console.log(res));
    }
    res.end();
});

const port = 4000;
const server = app.listen(port, () => {
    console.log("Servidor escuchando en el puerto " + port);
});