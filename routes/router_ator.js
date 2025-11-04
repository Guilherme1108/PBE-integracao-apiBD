/****************************************************************************************
 * Objetivo: Arquivo responsavel pelo gerenciamento das rotas da API referente ao ator
 * Data: 03/11/2025
 * Autor: Guilherme Moreira
 * Versão: 1.0
*****************************************************************************************/

const express = require('express')
const router = express.Router()
const cors = require('cors')
const bodyParser    = require('body-parser')
const bodyParserJSON = bodyParser.json()
const controllerAtor = require('../controller/ator/controller_ator.js')

router.get('/v1/locadora/atores', cors(), async function(request, response){
    //Chama a função para listar os filmes do BD
    let ator = await controllerAtor.listarAtores()
    response.status(ator.status_code)
    response.json(ator)
})

//Busca ator pelo ID
router.get('/v1/locadora/ator/:id', cors(), async function(request, response){

    let idAtor = request.params.id

    let ator = await controllerAtor.buscarAtorId(idAtor)
    response.status(ator.status_code)
    response.json(ator)
})

//Insere um novo ator
router.post('/v1/locadora/ator', cors(), bodyParserJSON, async function(request, response){
    let dadosBody = request.body

    let contentType = request.headers['content-type']

    let ator = await controllerAtor.inserirAtor(dadosBody, contentType)

    response.status(ator.status_code)
    response.json(ator)
})

//Atualiza um ator existente
router.put('/v1/locadora/ator/:id', cors(), bodyParserJSON, async function(request, response){
    //recebe o id do ator
    let idAtor = request.params.id

    //Recebe os dados a serem atualizados
    let dadosBody = request.body

    //Recebe o content-type da requisição
    let contentType = request.headers['content-type']

    //Chama a função para atualziar o ator e encaminha os dados, o id e o content-type
    let ator = await controllerAtor.atualizarAtor(dadosBody, idAtor, contentType)

    response.status(ator.status_code)
    response.json(ator)
})

//Deleta um ator existente
router.delete('/v1/locadora/ator/:id', cors(), bodyParserJSON, async function(request, response){
    let idAtor = request.params.id

    let ator = await controllerAtor.excluirAtor(idAtor)

    response.status(ator.status_code)
    response.json(ator)
})

module.exports = router