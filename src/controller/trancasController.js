const {passaNullTranca, passaEmptyTranca} = require("../utils/validacoes");
const{pegaIndiceTrancaId, pegaIndiceTrancaNumero, retornaTrancas, retornaTrancaIndice, colocaTranca, atualizaTranca, deletaTranca} = require("../data/bdd");

const getTrancas = async (request, reply) => {
    return reply.status(200).send(retornaTrancas());
};

const getTrancaById = async(request, reply) => {
    try {
        const indice = pegaIndiceTrancaId(request.params.id);

        if (indice == -1) {
            reply.status(404);
            reply.send({codigo:404,message: "Não encontrado"});
            return;
        }

        reply.status(200);
        reply.send({message: "Tranca encontrada",tranca:retornaTrancaIndice(indice)});


    } catch (error) {
        console.error(error);
        reply.status(404).send({
            codigo: "404",
            mensagem: "Requisição não encontrada."
        });
    }
};

const criarTranca = async (request, reply) => {
    try {
        const passaN = passaNullTranca(request.body.localizacao, request.body.modelo, request.body.anoFabricacao,request.body.numero);
        if (!passaN){
            reply.status(422);
            reply.send({message:"Dados inválidos (Null)"})
            return;
        }
        const passaE = passaEmptyTranca(request.body.localizacao, request.body.modelo, request.body.anoFabricacao,request.body.numero);
        if (!passaE){
            reply.status(422);
            reply.send({message:"Dados inválidos (Empty)"})
            return;
        }

        const novaTranca = colocaTranca(request.body.localizacao,request.body.modelo,request.body.anoFabricacao,request.body.numero);

        const json = {
            message:"Dados cadastrados",
            tranca: novaTranca,
        }
        reply.status(200);
        reply.send(json);
    }
    catch (error) {
        console.error(error);
    }
};

const atualizarTranca = async(request, reply) => {
    try {
        const indice = pegaIndiceTrancaId(request.params.id);

        if(indice == -1) {
            reply.status(404);
            reply.send({message: "Não encontrado"});
            return;
        }
        const passaN = passaNullTranca(request.body.localizacao, request.body.modelo, request.body.anoFabricacao,request.body.numero,request.body.status);
        if (!passaN){
            reply.status(422);
            reply.send({message:"Dados inválidos (Null)"});
            return;
        }
        const passaE = passaEmptyTranca(request.body.localizacao, request.body.modelo, request.body.anoFabricacao,request.body.numero,request.body.status);
        if (!passaE){
            reply.status(422);
            reply.send({message:"Dados inválidos (Empty)"});
            return;
        }

        const trancaSelecionada = atualizaTranca(indice,request.body.localizacao,request.body.modelo,request.body.anoFabricacao,request.body.numero,request.body.status);

        reply.status(200);
        reply.send({message:"Dados atualizados",tranca:trancaSelecionada});
    }
    catch (error) {
        console.error(error);
        reply.status(422).send('Dados inválidos');
    }
};

const removerTrancaById = async(request, reply) => {
    try {
        const indice = pegaIndiceTrancaId(request.params.id);

        if(indice == -1) {
            reply.status(404)
            reply.send({message: "Não encontrado"});
            return;
        }

        deletaTranca(indice);
        reply.status(200);
        reply.send({message: "Dados removidos"});
    }
    catch (error) {
        console.error(error);
        reply.status(422).send('Dado inválidos');
    }
};


module.exports = {
    getTrancas,
    getTrancaById,
    criarTranca,
    atualizarTranca,
    removerTrancaById,
}