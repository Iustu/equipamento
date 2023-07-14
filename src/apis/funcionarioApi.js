'use strict';

const axios = require('axios');
const log = require('../utils/logUtils');

const getFuncionario = async (idFuncionario) => {
    console.log("Chamando função getEmail");
    return axios.get(`https://sore-jade-clownfish-veil.cyclic.app/funcionarios/${idFuncionario}`).then(response  => {
        log.info('Requisição de emails retornada com sucesso');
        console.log("@@@@@#@@ response ", response.data);
        return response.data;
    }).catch(err => {
        log.error('Falha no requisição lista de emails');
        console.log("@@@@@@@@ error", err.response.data);
        return err.response.data;
    })
}

module.exports = {
    getFuncionario,
}