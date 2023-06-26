function passaNullBicicleta(marca,modelo,ano){
    return !(marca == null || modelo == null || ano == null);
}
function passaEmptyBicicleta(marca,modelo,ano){
    return !(marca == "" || modelo == "" || ano == "");
}

function passaNullTotem(localizacao,descricao){
    return !(localizacao == null || descricao == null);
}
function passaEmptyTotem(localizacao,descricao){
    return !(localizacao == "" || descricao == "");
}
function passaNullTranca(localizacao,modelo,anoFabricacao){
    return !(localizacao == null || modelo == null || anoFabricacao == null);
}
function passaEmptyTranca(localizacao,modelo,anoFabricacao){
    return !(localizacao == "" || modelo == "" || anoFabricacao == "");

}

module.exports = {
    passaNullBicicleta,
    passaEmptyBicicleta,
    passaNullTotem,
    passaEmptyTotem,
    passaNullTranca,
    passaEmptyTranca,
}