var express = require('express');
var app = express();

var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

var bicicletas = require('./bicicleta.js');
app.use('/bicicleta', bicicletas);
var trancas = require('./tranca.js');
app.use('/tranca', trancas);
var totens = require('./totem.js');
app.use('/totem', totens);

app.listen(3000);