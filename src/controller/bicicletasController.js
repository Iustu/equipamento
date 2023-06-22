let bicicletas = [

];

const getBicicletas = async (request, reply) => {
    return reply.status(200).send(bicicletas);
};

const getBicicletaById = async(request, reply) => {
    try {
        const indice = pegaIndiceBicicleta(request.params.id);

        if (indice == -1) {
            reply.status(404);
            reply.send({codigo:404,message: "Não encontrado"});
            return;
        }

        reply.status(200);
        reply.send({message: "Bicicleta encontrada",bicicleta:bicicletas[indice]});


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
        const passaN = passaNull(request.body.marca, request.body.modelo, request.body.ano);
        if (!passaN){
            reply.status(422);
            reply.send({message:"Dados inválidos (Null)"})
            return;
        }
        const passaE = passaEmpty(request.body.marca, request.body.modelo, request.body.ano);
        if (!passaE){
            reply.status(422);
            reply.send({message:"Dados inválidos (Empty)"})
            return;
        }

        const newId = bicicletas.length+1;

        bicicletas.push(
            {
                id: newId,
                marca: request.body.marca,
                modelo: request.body.modelo,
                ano: request.body.ano,
                status: "nova",
            });

        const json = {
            message:"Dados cadastrados",
            bicicleta:{
                id: newId,
                marca: request.body.marca,
                modelo: request.body.modelo,
                ano: request.body.ano,
                status: "nova"}
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
        const indice = pegaIndiceBicicleta(request.params.id);

        if(indice == -1) {
            reply.status(404);
            reply.send({message: "Não encontrado"});
            return;
        }
        const passaN = passaNull(request.body.marca, request.body.modelo, request.body.ano);
        if (!passaN){
            reply.status(422);
            reply.send({message:"Dados inválidos (Null)"});
            return;
        }
        const passaE = passaEmpty(request.body.marca, request.body.modelo, request.body.ano);
        if (!passaE){
            reply.status(422);
            reply.send({message:"Dados inválidos (Empty)"});
            return;
        }

        const bicicletaSelecionada = bicicletas[indice];
        bicicletaSelecionada.marca = request.body.marca;
        bicicletaSelecionada.modelo = request.body.modelo;
        bicicletaSelecionada.ano = request.body.ano;
        bicicletaSelecionada.status = request.body.status;

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
        const indice = pegaIndiceBicicleta(request.params.id);

        if(indice == -1) {
            reply.status(404)
            reply.send({message: "Não encontrado"});
            return;
        }

        bicicletas.splice(indice, 1);
        reply.status(200);
        reply.send({message: "Dados removidos"});
    }
    catch (error) {
        console.error(error);
        reply.status(422).send('Dado inválidos');
    }
};

function pegaIndiceBicicleta(id) {

    const len = bicicletas.length;

    for (let i = 0; i < len; i++) {
        if (bicicletas[i].id == id) {
            return i;
        }
    }
    return -1;
}

function passaNull(marca,modelo,ano){
    return !(marca == null || modelo == null || ano == null);

}
function passaEmpty(marca,modelo,ano){
    return !(marca == "" || modelo == "" || ano == "");

}

module.exports = {
    getBicicletas,
    getBicicletaById,
    criarBicicleta,
    atualizarBicicleta,
    removerBicicletaById,
}