const {passaNullBicicleta, passaEmptyBicicleta} = require("../utils/validacoes");
const{pegaIndiceBicicletaId, pegaIndiceBicicletaNumero, retornaBicicletas, retornaBicicletaIndice, colocaBicicleta, atualizaBicicleta, deletaBicicleta,
    registraInclusao
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
    const indice = pegaIndiceBicicletaNumero(request.numeroBicicleta);
    if(indice == -1) {
        reply.status(202);
        reply.send({message: "Numero bicicleta inválido"});
        return;
    }
    let bicicleta = retornaBicicletaId(indice);
    //validar status bicicleta

    //validarTranca

    //registrar dados inclusao
    registraInclusao(request.body.numeroTranca, request.body.numeroBicicleta,);

    //fechar tranca


    //mudar status para disponivel

    //enviar email

    //voltar mensagem
};

const retirarDaRede = async (request, reply) => {

};

module.exports = {
    getBicicletas,
    getBicicletaById,
    criarBicicleta,
    atualizarBicicleta,
    removerBicicletaById,
    integrarNaRede,
    retirarDaRede,
}