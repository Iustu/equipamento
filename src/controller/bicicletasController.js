const {passaNullBicicleta, passaEmptyBicicleta} = require("../utils/validacoes");
const{pegaIndiceBicicletaId, pegaIndiceBicicletaNumero, retornaBicicletas, retornaBicicletaIndice, colocaBicicleta, atualizaBicicleta, deletaBicicleta, registraInclusao, pegaIndiceTrancaId,retornaTrancaIndice, pegaIndiceTrancaNumero, atualizaTranca, trancar, destrancar,
    bicicletaStatus,
    registraExclusao
} = require("../data/bdd");

const getBicicletas = async (request, reply) => {
    return reply.status(200).send(retornaBicicletas());
};

const getBicicletaById = async(request, reply) => {
    try {
        const indice = pegaIndiceBicicletaId(request.params.id);

        if (indice === -1) {
            reply.status(404);
            reply.send({codigo:404,message: "Não encontrado"});
            return;
        }

        reply.status(200);
        reply.send({message: "Bicicleta encontrada",bicicleta:retornaBicicletaIndice(indice)});

    } catch (error) {
        console.error(error);
        reply.status(404).send({
            codigo: "404",
            mensagem: "Requisição não encontrada."
        });
    }
};

const criarBicicleta = async (request, reply) => {
    try {
        const passaN = passaNullBicicleta(request.body.marca, request.body.modelo, request.body.ano,request.body.numero);
        if (!passaN){
            reply.status(422);
            reply.send({message:"Dados inválidos (Null)"})
            return;
        }
        const passaE = passaEmptyBicicleta(request.body.marca, request.body.modelo, request.body.ano,request.body.numero);
        if (!passaE){
            reply.status(422);
            reply.send({message:"Dados inválidos (Empty)"})
            return;
        }

        const novaBike = colocaBicicleta(request.body.marca, request.body.modelo, request.body.ano,request.body.numero);

        const json = {
            message:"Dados cadastrados",
            bicicleta:novaBike
        }

        reply.status(200);
        reply.send(json);
    }
    catch (error) {
        console.error(error);
    }
};

const atualizarBicicleta = async(request, reply) => {
    try {
        const indice = pegaIndiceBicicletaId(request.params.id);

        if(indice === -1) {
            reply.status(404);
            reply.send({message: "Não encontrado"});
            return;
        }
        const passaN = passaNullBicicleta(request.body.marca, request.body.modelo, request.body.ano,request.body.numero);
        if (!passaN){
            reply.status(422);
            reply.send({message:"Dados inválidos (Null)"});
            return;
        }
        const passaE = passaEmptyBicicleta(request.body.marca, request.body.modelo, request.body.ano,request.body.numero);
        if (!passaE){
            reply.status(422);
            reply.send({message:"Dados inválidos (Empty)"});
            return;
        }

        const bicicletaSelecionada = atualizaBicicleta(indice,request.body.marca, request.body.modelo, request.body.numero,request.body.ano,request.body.status);

        reply.status(200);
        reply.send({message:"Dados atualizados",bicicleta:bicicletaSelecionada});
    }
    catch (error) {
        console.error(error);
        reply.status(422).send('Dados inválidos');
    }
};

const atualizarBicicletaStatus = async(request, reply) => {
    try {
        const indice = pegaIndiceBicicletaId(request.params.id);

        if(indice === -1) {
            reply.status(404);
            reply.send({message: "Não encontrado"});
            return;
        }

        const bicicletaSelecionada = bicicletaStatus(indice, request.params.acao);

        reply.status(200);
        reply.send({message:"Dados atualizados",bicicleta:bicicletaSelecionada});
    }
    catch (error) {
        console.error(error);
        reply.status(422).send('Dados inválidos');
    }
};

const removerBicicletaById = async(request, reply) => {
    try {
        const indice = pegaIndiceBicicletaId(request.params.id);

        if(indice == -1) {
            reply.status(404)
            reply.send({message: "Não encontrado"});
            return;
        }

        deletaBicicleta(indice);

        reply.status(200);
        reply.send({message: "Dados removidos"});
    }
    catch (error) {
        console.error(error);
        reply.status(422).send('Dado inválidos');
    }
};

const integrarNaRede = async (request, reply) => {
    //validar numero bicicleta
    let indiceBicicleta = pegaIndiceBicicletaId(request.body.idBicicleta);
    if(indiceBicicleta == -1) {
        reply.status(422);
        reply.send({message: "Numero bicicleta inválido"});
        return;
    }

    //validar status bicicleta
    let bicicleta = retornaBicicletaIndice(indiceBicicleta);
    if (bicicleta.status != "NOVA" || bicicleta.status != "EM_REPARO"){
        reply.status(422);
        reply.send({message:"Estado da bicicleta noggers."});
        return;
    }
    if (bicicleta.status == "EM_REPARO"){
        // if (request.body.idFuncionario != ){
        //     reply.status(422);
        //     reply.status({message: "Quem removeu coloca"});
        //     return;
        // }
    }

    //validarTranca
    let indiceTranca= pegaIndiceTrancaId(request.body.idTranca);
    if(indiceTranca == -1) {
        reply.status(422);
        reply.send({message: "Numero tranca inválido"});
        return;
    }
    let tranca = retornaTrancaIndice(indiceTranca);
    if (tranca.status != "LIVRE"){
        reply.status(422);
        reply.status({message:"Estado da tranca noggers."});
        return;
    }

    //registrar dados inclusao
    registraInclusao(request.body.idTranca, request.body.idBicicleta,request.body.idFuncionario);

    //fechar tranca
    trancar(indiceTranca,bicicleta.numero);

    //mudar status para disponivel
    bicicletaStatus(indiceBicicleta, "DISPONÍVEL");

    //enviar email

    //voltar mensagem
    reply.status(200);
    reply.send({message: "Bicicleta inserida com sucesso"});
};

const retirarDaRede = async (request, reply) => {
    //valida número tranca
    let indiceTranca = pegaIndiceTrancaId(request.body.idTranca);
    if(indiceTranca == -1) {
        reply.status(422);
        reply.send({message: "Numero tranca inválido"});
        return;
    }
    let tranca = retornaTrancaIndice(indiceTranca);
    if (tranca.status != "LIVRE"){
        reply.status(422);
        reply.status({message:"Estado da tranca noggers."});
        return;
    }

    //abre a tranca
    destrancar(indiceTranca);

    //bicicleta
    let indiceBicicleta = pegaIndiceBicicletaId(request.body.idBicicleta);
    if(indiceBicicleta == -1) {
        reply.status(422);
        reply.send({message: "Numero tranca inválido"});
        return;
    }
    bicicletaStatus(indiceBicicleta,request.body.status);

    //retirada
    registraExclusao(request.body.idTranca,request.body.idBicicleta,request.body.idFuncionario,request.body.status);

    //enviar Mensagem

    reply.status(200);
    reply.send({messagem:"Bicicleta removida!"});
};

module.exports = {
    getBicicletas,
    getBicicletaById,
    criarBicicleta,
    atualizarBicicleta,
    atualizarBicicletaStatus,
    removerBicicletaById,
    integrarNaRede,
    retirarDaRede,
}