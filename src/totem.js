const express = require('express');
const router = express.Router();

let totens = [

];

/*
 * Retorna a lista de totens
 */
router.get('/', function(req, res){
    res.json(totens);
});

/*
 * Retorna uma totem, dada o seu ID
 */
router.get('/:id([0-9]+)', function(req, res){
    const indice = pegaIndiceTotem(req.params.id);

    if (indice == -1) {
        res.status(404);
        res.json({message: "Not Found"});
        return;
    }

    res.json(totens[indice]);
});

/*
 * Insere uma totem
 */
router.post('/', function(req, res){

    const newId = totens.length+1;

    if (req.body.marca!=null && req.body.modelo!=null && req.body.ano!=null){
        if (req.body.marca=="" || req.body.modelo=="" || req.body.ano==""){
            res.status(400);
            res.json({message:"Algum dado vazio."})
            return;
        }else{
            totens.push({
                id: newId,
                marca: req.body.marca,
                modelo: req.body.modelo,
                ano: req.body.ano,
                status: "nova",
            });
            res.json({message: "A nova totem foi criada.", location: "/totem/" + newId});
        }
    } else {
        res.status(400);
        res.json({message:"Requisição mal formatada."})
    }
});

/*
 * Atualiza os dados de uma totem
 */
router.put('/:id', function(req, res){

    const indice = pegaIndiceTotem(req.params.id);

    if(indice == -1) {
        res.json({message: "Not found"});
        return;
    }

    const totemSelecionada = totens[indice];
    totemSelecionada.marca = req.body.marca;
    totemSelecionada.modelo = req.body.modelo;
    totemSelecionada.ano = req.body.ano;
    totemSelecionada.status = req.body.status;

    res.json({message: "Tranca ID " + req.params.id + " atualizada.",
        location: "/bicicleta/" + req.params.id});
});


/*
 * Remove uma totem
 */
router.delete('/:id', function(req, res) {
    const indice = pegaIndiceTotem(req.params.id);

    if(indice == -1) {
        res.json({message: "Not found"});
        return;
    }

    totens.splice(indice, 1);
    res.send({message: "Tranca ID " + req.params.id + " removido."});
});


/*
 * Retorna uma totem, dado o seu ID
 */
function pegaIndiceTotem(id) {
    const len = totem.length;

    for (let i = 0; i < len; i++) {
        if (totens[i].id == id) {
            return i;
        }
    }

    return -1;
}

module.exports = router;