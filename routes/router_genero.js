/****************************************************************************************
 * Objetivo: Arquivo responsavel pelo gerenciamento das rotas da API referente ao genero
 * Data: 03/11/2025
 * Autor: Guilherme Moreira
 * Versão: 1.0
*****************************************************************************************/

const express = require('express')
const router = express.Router()
const cors = require('cors')
const bodyParser    = require('body-parser')
const bodyParserJSON = bodyParser.json()
const controllerGenero = require('../controller/genero/controller_genero.js')

//Retorna todos os generos
router.get('/v1/locadora/generos', cors(), async function(request, response){
    //Chama a função para listar os filmes do BD
    let genero = await controllerGenero.listarGeneros()
    response.status(genero.status_code)
    response.json(genero)
})

//Busca genero pelo ID
router.get('/v1/locadora/genero/:id', cors(), async function(request, response){

    //recebe o ID encaminhado via parametro na erquisição
    let idGenero = request.params.id

    //Chama a função para listar os filmes do BD
    let genero = await controllerGenero.buscarGeneroId(idGenero)
    response.status(genero.status_code)
    response.json(genero)
})

//Insere um novo gênero
router.post('/v1/locadora/genero', cors(), bodyParserJSON, async function(request, response){
    let dadosBody = request.body

    let contentType = request.headers['content-type']

    let genero = await controllerGenero.inserirGenero(dadosBody, contentType)

    response.status(genero.status_code)
    response.json(genero)
})

//Atualiza um gênero existente
router.put('/v1/locadora/genero/:id', cors(), bodyParserJSON, async function(request, response){
    //recebe o id do genero
    let idGenero = request.params.id

    //Recebe os dados a serem atualizados
    let dadosBody = request.body

    //Recebe o content-type da requisição
    let contentType = request.headers['content-type']

    //Chama a função para atualziar o genero e encaminha os dados, o id e o content-type
    let genero = await controllerGenero.atualizarGenero(dadosBody, idGenero, contentType)

    response.status(genero.status_code)
    response.json(genero)
})

//Deleta um gênero existente
router.delete('/v1/locadora/genero/:id', cors(), bodyParserJSON, async function(request, response){
    let idGenero = request.params.id

    //Chama a função para atualziar o filme e encaminha os dados, o id e o content-type
    let genero = await controllerGenero.excluirGenero(idGenero)

    response.status(genero.status_code)
    response.json(genero)
})

module.exports = router