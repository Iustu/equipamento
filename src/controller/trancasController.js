const {passaNullTranca, passaEmptyTranca} = require("../utils/validacoes");
const{pegaIndiceTrancaId, pegaIndiceTrancaNumero, retornaTrancas, retornaTrancaIndice, colocaTranca, atualizaTranca, deletaTranca,
    trancar,
    destrancar,
    registraInclusaoTT,
    trancaStatus,
    registraExclusaoTT,
    pegaIndiceTotemId,
    retornaTotemIndice,
    colocaTrancaTotem,
    removeTrancaTotem,
    comparaExclusaoTT,
    pegaIndiceBicicletaId,
    bicicletaStatus
} = require("../data/bdd");

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

        const trancaSelecionada = atualizaTranca(indice,request.body.localizacao,request.body.modelo,request.body.anoFabricacao,request.body.numero,request.body.status,request.body.bicicleta);

        reply.status(200);
        reply.send({message:"Dados atualizados",tranca:trancaSelecionada});
    }
    catch (error) {
        console.error(error);
        reply.status(422).send('Dados inválidos');
    }
};

const atualizarTrancaStatus = async(request, reply) => {
    try {
        const indice = pegaIndiceTrancaId(request.params.id);

        if(indice === -1) {
            reply.status(404);
            reply.send({message: "Não encontrado"});
            return;
        }

        const trancaSelecionada = trancaStatus(indice, request.params.acao);

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

        const tranca = retornaTrancaIndice(indice);
        if (tranca.status!="APOSENTADA"){
            reply.status(422);
            reply.status({message: "SO DELETA APOSENTADA"});
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

const trancarEndpoint = async(request, reply) => {
    try {
        let indice = pegaIndiceTrancaId(request.params.id);
        if (indice == -1){
            reply.status(404);
            reply.send({message:"Não encontrado"});
        }
        const indiceBicicleta = pegaIndiceBicicletaId(request.body.idBicicleta)
        if (indiceBicicleta == -1){
            reply.status(404);
            reply.send({message:"Bicicleta não encontrado"});
        }

        trancar(indice,request.body.idBicicleta);
    }
    catch (error){
        console.error(error);
        reply.status(422).send('inválido');
    }
};
const destrancarEndpoint = async(request, reply) => {
    try {
        let indice = pegaIndiceTrancaId(request.params.id);
        if (indice == -1){
            reply.status(404);
            reply.send({message:"Não encontrado"});
        }
        destrancar(indice);
    }
    catch (error){
        console.error(error);
        reply.status(422).send('inválido');
    }
};

const integrarNaRede = async (request,reply) => {
    try {
        let indiceTotem = pegaIndiceTotemId(request.body.idTotem);
        if (indiceTotem == -1){
            reply.status(404);
            reply.send({message:"Não encontrado"});
            return;
        }

        let indice = pegaIndiceTrancaNumero(request.body.numeroTranca);
        if (indice == -1){
            reply.status(404);
            reply.send({message:"Não encontrado"});
            return;
        }
        let tranca = retornaTrancaIndice(indice);
        let teste = tranca.status;
        //REPARO
        if (teste=="EM_REPARO"){
            if (!comparaExclusaoTT(request.body.idFuncionario,request.body.numeroTranca)){
                reply.status(422);
                reply.send({message:"QUEM TIRA BOTA"});
                return;
            }
        }


        //atrelar tranca no totem;
        colocaTrancaTotem(indiceTotem,request.body.numeroTranca);

        //registrar dados inclusao
        registraInclusaoTT(request.body.numeroTranca,request.body.idFuncionario);

        //alterar tranca
        trancaStatus(indice,"LIVRE");

        //mensagem

        reply.status(200);
        reply.send({message: "TRANCA INCLUIDA"});
    }
    catch (error){
        console.error(error);
        reply.status(422).send('inválido');
    }
};
const removerDaRede = async (request,reply) => {
    try {
        let indiceTotem = pegaIndiceTotemId(request.body.idTotem);
        if (indiceTotem == -1){
            reply.status(404);
            reply.send({message:"Não encontrado"});
            return;
        }

        let indice = pegaIndiceTrancaNumero(request.body.numeroTranca);
        if (indice == -1){
            reply.status(404);
            reply.send({message:"Não encontrado"});
            return;
        }
        //REPARO

        removeTrancaTotem(indiceTotem,request.body.numeroTranca);

        //registrar dados exclusão
        registraExclusaoTT(request.body.numeroTranca,request.body.idFuncionario,request.body.status);

        //alterar tranca
        trancaStatus(indice,request.body.status);

        //mensagem

        reply.status(200);
        reply.send({message: "TRANCA REMOVIDA"});

    }catch (error){
        console.error(error);
        reply.status(422).send('inválido');
    }
};

module.exports = {
    getTrancas,
    getTrancaById,
    criarTranca,
    atualizarTranca,
    atualizarTrancaStatus,
    removerTrancaById,
    trancarEndpoint,
    destrancarEndpoint,
    integrarNaRede,
    removerDaRede,
}