//Import mysql
var mysql = require("mysql");

//let UserActi = require('../models/lepanier');


var connection = mysql.createConnection({
    host : 'localhost',
    user : 'root',
    password : 'root',
    database : 'mvcdata'
});

let piece = "";
let largeur = 0;
let longueur = 0;
let surface = 0;
let listappart = [];


exports.firstpage = function(req, res) {
    res.render('page1.ejs');
};

exports.encode = function(req, res){
    piece = req.body.piece;
    largeur = req.body.largeur;
    longueur = req.body.longueur;
    if(isNaN(largeur) || isNaN(longueur)){
        console.log("it works");
        res.redirect("/firstpage");
    }
    else{
        surface = largeur*longueur;
        res.render('page2.ejs', {piece: piece, largeur: largeur, longueur: longueur, resultat: ""});
    }
};

exports.calcul = function(req, res){
    res.render('page2.ejs', {piece: piece, largeur: largeur, longueur: longueur, resultat: "Surface " + surface.toString() + " M2"});
};

exports.register = function(req, res){
    listappart.push("Pièce : " + piece + " " + surface + " m2");
    connection.query(`INSERT INTO mvcdata.rooms(name, length, width) VALUES (?,?,?)`,[piece, longueur, largeur]);
    piece = "";
    largeur = 0;
    longueur = 0;
    surface = 0;
    res.render('page3.ejs', {laliste: listappart});
};

exports.another = function(req, res){
    res.render('page1.ejs');
};