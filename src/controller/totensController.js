let totens = [

];

const getTotens = async (request, reply) => {
    return reply.status(200).send(totens);
};

const getTotemById = async(request, reply) => {
    try {
        const indice = pegaIndiceTotem(request.params.id);

        if (indice == -1) {
            reply.status(404);
            reply.send({codigo:404,message: "Não encontrado"});
            return;
        }

        reply.status(200);
        reply.send({message: "Totem encontrada",totem:totens[indice]});


    } catch (error) {
        console.error(error);
        reply.status(404).send({
            codigo: "404",
            mensagem: "Requisição não encontrada."
        });
    }
};

const criarTotem = async (request, reply) => {
    try {
        const passaN = passaNull(request.body.localizacao, request.body.descricao);
        if (!passaN){
            reply.status(422);
            reply.send({message:"Dados inválidos (Null)"})
            return;
        }
        const passaE = passaEmpty(request.body.localizacao,request.body.descricao);
        if (!passaE){
            reply.status(422);
            reply.send({message:"Dados inválidos (Empty)"})
            return;
        }

        const newId = totens.length+1;

        totens.push(
            {
                id: newId,
                localizacao: request.body.localizacao,
                descricao: request.body.descricao,
            });

        const json = {
            message:"Dados cadastrados",
            totem:{
                id: newId,
                localizacao: request.body.localizacao,
                descricao: request.body.descricao,
            }
        }
        reply.status(200);
        reply.send(json);
    }
    catch (error) {
        console.error(error);
    }
};

const atualizarTotem = async(request, reply) => {
    try {
        const indice = pegaIndiceTotem(request.params.id);

        if(indice == -1) {
            reply.status(404);
            reply.send({message: "Não encontrado"});
            return;
        }
        const passaN = passaNull(request.body.localizacao, request.body.descricao);
        if (!passaN){
            reply.status(422);
            reply.send({message:"Dados inválidos (Null)"});
            return;
        }
        const passaE = passaEmpty(request.body.localizacao, request.body.descricao);
        if (!passaE){
            reply.status(422);
            reply.send({message:"Dados inválidos (Empty)"});
            return;
        }

        const totemSelecionado = totens[indice];
        totemSelecionado.localizacao = request.body.localizacao;
        totemSelecionado.descricao = request.body.descricao;

        reply.status(200);
        reply.send({message:"Dados atualizados",totem:totemSelecionado});
    }
    catch (error) {
        console.error(error);
        reply.status(422).send('Dados inválidos');
    }
};

const removerTotemById = async(request, reply) => {
    try {
        const indice = pegaIndiceTotem(request.params.id);

        if(indice == -1) {
            reply.status(404)
            reply.send({message: "Não encontrado"});
            return;
        }

        totens.splice(indice, 1);
        reply.status(200);
        reply.send({message: "Dados removidos"});
    }
    catch (error) {
        console.error(error);
        reply.status(422).send('Dado inválidos');
    }
};

function pegaIndiceTotem(id) {
    const len = totens.length;

    for (let i = 0; i < len; i++) {
        if (totens[i].id == id) {
            return i;
        }
    }
    return -1;
}

function passaNull(localizacao,descricao){
    return !(localizacao == null || descricao == null);
}
function passaEmpty(localizacao,descricao){
    return !(localizacao == "" || descricao == "");
}

module.exports = {
    getTotens,
    getTotemById,
    criarTotem,
    atualizarTotem,
    removerTotemById,
}