// Chargement d'express et déclaration de notre app
var express = require("express");
var app = express();

// On définit notre moteur de templates
app.set("view engine", "pug");

// Le dossier des vues de pug est views par défaut, on a donc jsute crée un dossier views
// Si on veut le personnaliser, il faudrait faire un app.set('views', './views')

// On définit un dossier pour les fichiers statiques
app.use("/", express.static(__dirname + "/public"));

// Connexion à Mongo
var mongoClient = require("mongodb").MongoClient;
const dbName = "paris";
const dbCollection = "arbres";
const dbUrl = "mongodb+srv://Benjamin:fpQH9Skw4tRlYoyB@cluster0.aykvr.mongodb.net/test?authSource=admin&replicaSet=atlas-baj87g-shard-0&readPreference=primary&appname=MongoDB%20Compass&ssl=true";

// Gestion des routes
// Page accueil
app.get("/", (req, res) => {
  console.log("Page index");
  res.render("index");
});

// Page liste
app.get("/liste", (req, res) => {
  console.log("Page liste");
  // Connexion mongo
  mongoClient.connect(dbUrl, function (err, client) {
    if (err) {
      throw err;
    }
    console.log("Connected successfully to MongoDb server");

    const db = client.db(dbName);
    const collection = db.collection(dbCollection);
    collection.find().toArray((err, data) => {
      if (err) {
        throw err;
      }
      // Si pas d'erreur de requête, je rends mon template liste en lui passant mes data dans un objet trees
      res.render("liste", { trees: data });
    });
  });
});

// Page carte
app.get("/carte", (req, res) => {
  console.log("Page carte");
  // Connexion mongo
  mongoClient.connect(dbUrl, function (err, client) {
    if (err) {
      throw err;
    }
    console.log("Connected successfully to MongoDb server");

    const db = client.db(dbName);
    const collection = db.collection(dbCollection);
    collection.find().toArray((err, data) => {
      if (err) {
        throw err;
      }
      // Si pas d'erreur de requête, je rends mon template liste en lui passant mes data dans un objet trees
      res.render("carte", { trees: data });
    });
  });
});

app.listen(8000, console.log("Le sereur écoute sur le port 8000"));
