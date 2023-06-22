'use strict'

const trancaController = require('../controller/trancasController');

const routesTranca = async (fastify) => {

    fastify.get('/tranca', trancaController.getTrancas);
    fastify.get('/tranca/:id', trancaController.getTrancaById);
    fastify.post('/tranca', trancaController.criarTranca);
    fastify.delete('/tranca/:id', trancaController.removerTrancaById);
    fastify.put('/tranca/:id', trancaController.atualizarTranca);

}

module.exports = routesTranca;