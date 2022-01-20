// Chargement d'express et déclaration de notre app
var express = require("express");
var app = express();

// On définit un dossier pour les fichiers statiques
app.use("/", express.static(__dirname + "/public"));


app.listen(6767, console.log("Le sereur écoute sur le port 6767"));
