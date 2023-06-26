let bicicletas = [

];

function retornaBicicletas(){
    return bicicletas;
}

function retornaBicicletaId(indice){
    return bicicletas[indice];
}

function colocaBicicleta(marca, modelo, ano, numero){
    const newId = bicicletas.length+1;
    bicicletas.push(
        {
            id: newId,
            marca: marca,
            modelo: modelo,
            numero: numero,
            ano: ano,
            status: "nova",
        });
}
function atualizaBicicleta(indice,marca,modelo,numero,ano,status){
    const bicicletaSelecionada = bicicletas[indice];

    bicicletaSelecionada.marca = marca;
    bicicletaSelecionada.modelo = modelo;
    bicicletaSelecionada.ano = ano;
    bicicletaSelecionada.numero = numero;
    bicicletaSelecionada.status = status;

    return bicicletaSelecionada;
}

function deletaBicicleta(indice){
    bicicletas.splice(indice,1);
}

function pegaIndiceBicicletaId(id) {
    const len = bicicletas.length;

    for (let i = 0; i < len; i++) {
        if (bicicletas[i].id == id) {
            return i;
        }
    }
    return -1;
}
function pegaIndiceBicicletaNumero(numero) {
    const len = bicicletas.length;

    for (let i = 0; i < len; i++) {
        if (bicicletas[i].numero == numero) {
            return i;
        }
    }
    return -1;
}

module.exports = {
    retornaBicicletas,
    retornaBicicletaId,
    colocaBicicleta,
    atualizaBicicleta,
    deletaBicicleta,
    pegaIndiceBicicletaId,
    pegaIndiceBicicletaNumero,
}

