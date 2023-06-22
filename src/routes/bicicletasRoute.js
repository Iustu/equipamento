'use strict'

const bicicletaController = require('../controller/bicicletasController');

const routesBicicleta = async (fastify) => {

    fastify.get('/bicicleta', bicicletaController.getBicicletas);
    fastify.get('/bicicleta/:id', bicicletaController.getBicicletaById);
    fastify.post('/bicicleta', bicicletaController.criarBicicleta);
    fastify.delete('/bicicleta/:id', bicicletaController.removerBicicletaById);
    fastify.put('/bicicleta/:id', bicicletaController.atualizarBicicleta);

}

module.exports = routesBicicleta;