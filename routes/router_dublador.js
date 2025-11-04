/****************************************************************************************
 * Objetivo: Arquivo responsavel pelo gerenciamento das rotas da API referente aos dubladores
 * Data: 04/11/2025
 * Autor: Guilherme Moreira
 * Versão: 1.0
*****************************************************************************************/

const express = require('express')
const router = express.Router()
const cors = require('cors')
const bodyParser    = require('body-parser')
const bodyParserJSON = bodyParser.json()
const controllerDublador = require('../controller/dublador/controller_dublador.js')

router.get('/v1/locadora/dubladores', cors(), async function(request, response){
    let dublador = await controllerDublador.listarDubladores()
    response.status(dublador.status_code)
    response.json(dublador)
})

router.get('/v1/locadora/dublador/:id', cors(), async function(request, response){
    let idDublador = request.params.id

    let dublador = await controllerDublador.buscarDubladorId(idDublador)
    response.status(dublador.status_code)
    response.json(dublador)
})

router.post('/v1/locadora/dublador', cors(), bodyParserJSON, async function(request, response){
    let dadosBody = request.body
    let contentType = request.headers['content-type']

    let dublador = await controllerDublador.inserirDublador(dadosBody, contentType)
    response.status(dublador.status_code)
    response.json(dublador)
})

router.put('/v1/locadora/dublador/:id', cors(), bodyParserJSON, async function(request, response){
    let idDublador = request.params.id
    let dadosBody = request.body
    let contentType = request.headers['content-type']

    let dublador = await controllerDublador.atualizarDublador(dadosBody, idDublador, contentType)
    response.status(dublador.status_code)
    response.json(dublador)
})

router.delete('/v1/locadora/dublador/:id', cors(), bodyParserJSON, async function(request, response){
    let idDublador = request.params.id

    //Chama a função para excluir um filme
    let dublador = await controllerDublador.excluirDublador(idDublador)

    response.status(dublador.status_code)
    response.json(dublador)
})

module.exports = router