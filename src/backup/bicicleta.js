const express = require('express');
const router = express.Router();


let bicicletas = [

];

/*
 * Retorna a lista de bicicletas
 */
router.get('/', function(req, res){
    res.status(200);
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
        res.json({message:"Dados inválidos (Null)"})
        return;
    }
    if (req.body.marca=="" || req.body.modelo=="" || req.body.ano==""){
        res.status(422);
        res.json({message:"Dados inválidos (Empty)"})
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

    res.status(200);
    res.json({message:"Dados cadastrados",
                bicicleta:{
                    id: newId,
                    marca: req.body.marca,
                    modelo: req.body.modelo,
                    ano: req.body.ano,
                    status: "nova"}});
});

/*
 * Atualiza os dados de um bicicleta
 */
router.put('/:id', function(req, res){
    const indice = pegaIndiceBicicleta(req.params.id);

    if(indice == -1) {
        res.status(404);
        res.json({message: "Não encontrado"});
        return;
    }
    if (req.body.marca==null || req.body.modelo==null || req.body.ano==null){
        res.status(422);
        res.json({message:"Dados inválidos (Null)"})
        return;
    }
    if (req.body.marca=="" || req.body.modelo=="" || req.body.ano==""){
        res.status(422);
        res.json({message:"Dados inválidos (Empty)"})
        return;
    }

    const bicicletaSelecionada = bicicletas[indice];
    bicicletaSelecionada.marca = req.body.marca;
    bicicletaSelecionada.modelo = req.body.modelo;
    bicicletaSelecionada.ano = req.body.ano;
    bicicletaSelecionada.status = req.body.status;

    res.status(200);
    res.json({message:"Dados atualizados",bicicleta:bicicletaSelecionada});
});


/*
 * Remove uma bicicleta
 */
router.delete('/:id', function(req, res) {
    const indice = pegaIndiceBicicleta(req.params.id);

    if(indice == -1) {
        res.status(404)
        res.json({message: "Não encontrado"});
        return;
    }

    bicicletas.splice(indice, 1);
    res.status(200);
    res.send({message: "Dados removidos"});
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