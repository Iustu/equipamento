let bicicletas = [];

function retornaBicicletas(){
    return bicicletas;
}

function retornaBicicletaIndice(indice){
    return bicicletas[indice];
}

function colocaBicicleta(marca, modelo, ano, numero){
    const newId = bicicletas.length+1;
    const bike = {
            id: newId,
            marca: marca,
            modelo: modelo,
            numero: numero,
            ano: ano,
            status: "nova",
        };
    bicicletas.push(bike);
    return bike;
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

let trancas = [];

function retornaTrancas(){
    return trancas;
}

function retornaTrancaIndice(indice){
    return trancas[indice];
}

function colocaTranca(localizacao, modelo, anoFabricacao, numero){
    const newId = trancas.length+1;
    const tranca = {
        id: newId,
        localizacao: localizacao,
        modelo: modelo,
        numero: numero,
        anoFabricacao: anoFabricacao,
        status: "nova",
    };
    trancas.push(tranca);
    return tranca;
}

function atualizaTranca(indice,localizacao,modelo,anoFabricacao,numero,status){
    const trancaSelecionada = trancas[indice];

    trancaSelecionada.localizacao = localizacao;
    trancaSelecionada.modelo = modelo;
    trancaSelecionada.anoFabricacao = anoFabricacao;
    trancaSelecionada.numero = numero;
    trancaSelecionada.status = status;

    return trancaSelecionada;
}

function deletaTranca(indice){
    trancas.splice(indice,1);
}

function pegaIndiceTrancaId(id) {
    const len = trancas.length;

    for (let i = 0; i < len; i++) {
        if (trancas[i].id == id) {
            return i;
        }
    }
    return -1;
}
function pegaIndiceTrancaNumero(numero) {
    const len = trancas.length;

    for (let i = 0; i < len; i++) {
        if (trancas[i].numero == numero) {
            return i;
        }
    }
    return -1;
}

let totens = [];

function retornaTotens(){
    return totens;
}

function retornaTotemIndice(indice){
    return totens[indice];
}

function colocaTotem(localizacao, descricao){
    const newId = totens.length+1;
    const totem = {
        id: newId,
        localizacao: localizacao,
        descricao: descricao
    };
    totens.push(totem);
    return totem;
}

function atualizaTotem(indice,localizacao,descricao){
    const totemSelecionado = totens[indice];

    totemSelecionado.localizacao = localizacao;
    totemSelecionado.descricao = descricao;

    return totemSelecionado;
}

function deletaTotem(indice){
    totens.splice(indice,1);
}

function pegaIndiceTotemId(id) {
    const len = totens.length;

    for (let i = 0; i < len; i++) {
        if (totens[i].id == id) {
            return i;
        }
    }
    return -1;
}
function pegaIndiceTotemNumero(numero) {
    const len = totens.length;

    for (let i = 0; i < len; i++) {
        if (totens[i].numero == numero) {
            return i;
        }
    }
    return -1;
}

let inclusaoBicicletaTranca = [];
function registraInclusao(numeroTranca, numeroBicicleta){
    const newId = inclusaoBicicletaTranca.length+1;
    const inclusao = {
        id: newId,
        dataHora: Date(),
        numeroBicicleta: numeroBicicleta,
        numeroTranca: numeroTranca,
    };
    inclusaoBicicletaTranca.push(inclusao);
    return inclusao;
}

module.exports = {
    retornaBicicletas,
    retornaBicicletaIndice,
    colocaBicicleta,
    atualizaBicicleta,
    deletaBicicleta,
    pegaIndiceBicicletaId,
    pegaIndiceBicicletaNumero,
    retornaTrancas,
    retornaTrancaIndice,
    colocaTranca,
    atualizaTranca,
    deletaTranca,
    pegaIndiceTrancaId,
    pegaIndiceTrancaNumero,
    retornaTotens,
    retornaTotemIndice,
    colocaTotem,
    atualizaTotem,
    deletaTotem,
    pegaIndiceTotemId,
    pegaIndiceTotemNumero,
    registraInclusao,
}

