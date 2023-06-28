const {passaNullBicicleta, passaEmptyBicicleta} = require("../utils/validacoes");
const{pegaIndiceBicicletaId, retornaBicicletas, retornaBicicletaId, colocaBicicleta, atualizaBicicleta, deletaBicicleta } = require("../data/bdd");

const getBicicletas = async (request, reply) => {
    return reply.status(200).send(retornaBicicletas());
};

const getBicicletaById = async(request, reply) => {
    try {
        const indice = pegaIndiceBicicletaId(request.params.id);

        if (indice == -1) {
            reply.status(404);
            reply.send({codigo:404,message: "Não encontrado"});
            return;
        }

        reply.status(200);
        reply.send({message: "Bicicleta encontrada",bicicleta:retornaBicicletaId(indice)});

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

        if(indice == -1) {
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

module.exports = {
    getBicicletas,
    getBicicletaById,
    criarBicicleta,
    atualizarBicicleta,
    removerBicicletaById,
}