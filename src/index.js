const express = require('express');
const app = express();

const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//router
const bicicletas = require('./classes/bicicleta.js');
app.use('/bicicleta', bicicletas);
const trancas = require('./classes/tranca.js');
app.use('/tranca', trancas);
const totens = require('./classes/totem.js');
app.use('/totem', totens);
const todos = require('./classes/totem.js');
app.use('/todos', todos);

app.listen(3000);