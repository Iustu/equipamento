let tracas = [

];

const getTrancas = async (request, reply) => {
    return reply.status(200).send(tracas);
};

const getTrancaById = async(request, reply) => {
    try {
        const indice = pegaIndiceTranca(request.params.id);

        if (indice == -1) {
            reply.status(404);
            reply.send({codigo:404,message: "Não encontrado"});
            return;
        }

        reply.status(200);
        reply.send({message: "Tranca encontrada",tranca:tracas[indice]});


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
        const passaN = passaNull(request.body.localizacao, request.body.modelo, request.body.anoFabricacao);
        if (!passaN){
            reply.status(422);
            reply.send({message:"Dados inválidos (Null)"})
            return;
        }
        const passaE = passaEmpty(request.body.localizacao, request.body.modelo, request.body.anoFabricacao);
        if (!passaE){
            reply.status(422);
            reply.send({message:"Dados inválidos (Empty)"})
            return;
        }

        const newId = tracas.length+1;

        tracas.push(
            {
                id: newId,
                localizacao: request.body.localizacao,
                modelo: request.body.modelo,
                anoFabricacao: request.body.anoFabricacao,
                status: "nova",
            });

        const json = {
            message:"Dados cadastrados",
            tranca:{
                id: newId,
                localizacao: request.body.localizacao,
                modelo: request.body.modelo,
                anoFabricacao: request.body.anoFabricacao,
                status: "nova",
            }
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
        const indice = pegaIndiceTranca(request.params.id);

        if(indice == -1) {
            reply.status(404);
            reply.send({message: "Não encontrado"});
            return;
        }
        const passaN = passaNull(request.body.localizacao, request.body.modelo, request.body.anoFabricacao);
        if (!passaN){
            reply.status(422);
            reply.send({message:"Dados inválidos (Null)"});
            return;
        }
        const passaE = passaEmpty(request.body.localizacao, request.body.modelo, request.body.anoFabricacao);
        if (!passaE){
            reply.status(422);
            reply.send({message:"Dados inválidos (Empty)"});
            return;
        }

        const trancaSelecionada = tracas[indice];
        trancaSelecionada.localizacao = request.body.localizacao;
        trancaSelecionada.modelo = request.body.modelo;
        trancaSelecionada.anoFabricacao = request.body.Fabricacao;
        trancaSelecionada.status = request.body.status;

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
        const indice = pegaIndiceTranca(request.params.id);

        if(indice == -1) {
            reply.status(404)
            reply.send({message: "Não encontrado"});
            return;
        }

        tracas.splice(indice, 1);
        reply.status(200);
        reply.send({message: "Dados removidos"});
    }
    catch (error) {
        console.error(error);
        reply.status(422).send('Dado inválidos');
    }
};

function pegaIndiceTranca(id) {

    const len = tracas.length;

    for (let i = 0; i < len; i++) {
        if (tracas[i].id == id) {
            return i;
        }
    }
    return -1;
}

function passaNull(localizacao,modelo,anoFabricacao){
    return !(localizacao == null || modelo == null || anoFabricacao == null);

}
function passaEmpty(localizacao,modelo,anoFabricacao){
    return !(localizacao == "" || modelo == "" || anoFabricacao == "");

}

module.exports = {
    getTrancas,
    getTrancaById,
    criarTranca,
    atualizarTranca,
    removerTrancaById,
}