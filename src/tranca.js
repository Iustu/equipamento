var express = require('express');
var router = express.Router();

var trancas = [

];

/*
 * Retorna a lista de trancas
 */
router.get('/', function(req, res){
    res.json(trancas);
});

/*
 * Retorna uma tranca, dada o seu ID
 */
router.get('/:id([0-9]+)', function(req, res){
    var indice = pegaIndiceTranca(req.params.id);

    if (indice == -1) {
        res.status(404);
        res.json({message: "Not Found"});
        return;
    }

    res.json(trancas[indice]);
});

/*
 * Insere uma tranca
 */
router.post('/', function(req, res){
    // if(!req.body.nome || !req.body.credito.toString().match(/^[0-9]+$/g)) {
    //     res.status(400);
    //     res.json({message: "Bad Request"});
    //     return;
    // }

    var newId = trancas.length+1;

    if (req.body.marca!=null && req.body.modelo!=null && req.body.ano!=null){
        if (req.body.marca=="" || req.body.modelo=="" || req.body.ano==""){
            res.status(400);
            res.json({message:"Algum dado vazio."})
            return;
        }else{
            trancas.push({
                id: newId,
                marca: req.body.marca,
                modelo: req.body.modelo,
                ano: req.body.ano,
                status: "nova",
            });
            res.json({message: "A nova tranca foi criada.", location: "/tranca/" + newId});
        }
    } else {
        res.status(400);
        res.json({message:"Requisição mal formatada."})
    }
});

/*
 * Atualiza os dados de uma tranca
 */
router.put('/:id', function(req, res){
    // if(!req.body.nome || !req.body.credito.toString().match(/^[0-9]+$/g)){
    //     res.status(400);
    //     res.json({message: "Bad Request"});
    //     return;
    // }

    var indice = pegaIndiceTranca(req.params.id);

    if(indice == -1) {
        res.json({message: "Not found"});
        return;
    }

    var trancaSelecionada = trancas[indice];
    trancaSelecionada.marca = req.body.marca;
    trancaSelecionada.modelo = req.body.modelo;
    trancaSelecionada.ano = req.body.ano;
    trancaSelecionada.status = req.body.status;

    res.json({message: "Tranca ID " + req.params.id + " atualizada.",
        location: "/bicicleta/" + req.params.id});
});


/*
 * Remove uma tranca
 */
router.delete('/:id', function(req, res) {
    var indice = pegaIndiceTranca(req.params.id);

    if(indice == -1) {
        res.json({message: "Not found"});
        return;
    }

    trancas.splice(indice, 1);
    res.send({message: "Tranca ID " + req.params.id + " removido."});
});


/*
 * Retorna uma tranca, dado o seu ID
 */
function pegaIndiceTranca(id) {
    var len = tranca.length;

    for (var i = 0; i < len; i++) {
        if (trancas[i].id == id) {
            return i;
        }
    }

    return -1;
}

module.exports = router;