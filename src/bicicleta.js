const express = require('express');
const router = express.Router();

let bicicletas = [

];

/*
 * Retorna a lista de bicicletas
 */
router.get('/', function(req, res){
    res.json(bicicletas);
});

/*
 * Retorna uma bicicleta, dada o seu ID
 */
router.get('/:id([0-9]+)', function(req, res){
    const indice = pegaIndiceBicicleta(req.params.id);

    if (indice == -1) {
        res.status(404);
        res.json({codigo:404,message: "Não encontrado"});
        return;
    }

    res.status(200);
    res.json({message: "Bicicleta encontrada",bicicleta:bicicletas[indice]});
});

/*
 * Insere uma bicicleta
 */
router.post('/', function(req, res){

    if (req.body.marca==null || req.body.modelo==null || req.body.ano==null){
        res.status(422);
        res.json({message:"Algum campo não enviado."})
        return;
    }
    if (req.body.marca=="" || req.body.modelo=="" || req.body.ano==""){
        res.status(422);
        res.json({message:"Algum campo não preenchido."})
        return;
    }
    const newId = bicicletas.length+1;

    bicicletas.push(
        {id: newId,
                marca: req.body.marca,
                modelo: req.body.modelo,
                ano: req.body.ano,
                status: "nova",
        });
    res.json({id: newId,
                marca: req.body.marca,
                modelo: req.body.modelo,
                ano: req.body.ano,
                status: "nova"});
});

/*
 * Atualiza os dados de um bicicleta
 */
router.put('/:id', function(req, res){

    const indice = pegaIndiceBicicleta(req.params.id);

    if(indice == -1) {
        res.status(404);
        res.json({mensagem: "Not found"});
        return;
    }
    if (req.body.marca==null || req.body.modelo==null || req.body.ano==null){
        res.status(422);
        res.json({message:"Algum campo não enviado."})
        return;
    }
    if (req.body.marca=="" || req.body.modelo=="" || req.body.ano==""){
        res.status(422);
        res.json({codigo:422,mensagem:"Algum campo não preenchido."})
        return;
    }
    if (!req.body.ano.isNumber()){
        res.status(422);
        res.json({codigo:422,mensagem:"Ano não numérico."})
        return;
    }

    const bicicletaSelecionada = bicicletas[indice];
    bicicletaSelecionada.marca = req.body.marca;
    bicicletaSelecionada.modelo = req.body.modelo;
    bicicletaSelecionada.ano = req.body.ano;
    bicicletaSelecionada.status = req.body.status;

    res.json({message: "Bicicleta ID " + req.params.id + " atualizada.",
        location: "/bicicleta/" + req.params.id});
});


/*
 * Remove uma bicicleta
 */
router.delete('/:id', function(req, res) {
    const indice = pegaIndiceBicicleta(req.params.id);

    if(indice == -1) {
        res.json({message: "Not found"});
        return;
    }

    bicicletas.splice(indice, 1);
    res.send({message: "Bicicleta ID " + req.params.id + " removido."});
});


/*
 * Retorna um bicicleta, dado o seu ID
 */
function pegaIndiceBicicleta(id) {
    const len = bicicletas.length;

    for (let i = 0; i < len; i++) {
        if (bicicletas[i].id == id) {
            return i;
        }
    }

    return -1;
}

module.exports = router;