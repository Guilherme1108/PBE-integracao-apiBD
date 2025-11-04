/****************************************************************************************
 * Objetivo: Arquivo responsavel pelo gerenciamento das rotas da API referente ao filme
 * Data: 03/11/2025
 * Autor: Guilherme Moreira
 * Versão: 1.0
*****************************************************************************************/

const express = require('express')
const router = express.Router()
const cors = require('cors')
const bodyParser    = require('body-parser')
const bodyParserJSON = bodyParser.json()
const controllerFilme = require('../controller/filme/controller_filme.js')

//Retorna a lista de todos os filmes
router.get('/v1/locadora/filmes', cors(), async function(request, response){
    //Chama a função para listar os filmes do BD
    let filme = await controllerFilme.listarFilmes()
    response.status(filme.status_code)
    response.json(filme)
})

//Retorna o filme filtrando pelo ID
router.get('/v1/locadora/filme/:id', cors(), async function(request, response){

    //recebe o ID encaminhado via parametro na erquisição
    let idFilme = request.params.id

    //Chama a função para listar os filmes do BD
    let filme = await controllerFilme.BuscarFilmeId(idFilme)
    response.status(filme.status_code)
    response.json(filme)
})

//Insere um novo filme
router.post('/v1/locadora/filme', cors(), bodyParserJSON, async function(request, response){
    //Recebe os dados do body da requisição (Se você utilziar o bodyParser, é obrigatório ter no endPoint)
    let dadosBody = request.body

    //Recebe o tipo de dados da requisição (JSON ou XML ou outros formatos...)
    let contentType = request.headers['content-type']

    //Chama a função da controller para inserir um novo filme, encaminha os dados e o content-type
    let filme = await controllerFilme.inserirFilme(dadosBody, contentType)

    response.status(filme.status_code)
    response.json(filme)
})

//Atualiza um filme existente
router.put('/v1/locadora/filme/:id', cors(), bodyParserJSON, async function(request, response){
    //recebe o id do filme
    let idFilme = request.params.id

    //Recebe os dados a serem atualizados
    let dadosBody = request.body

    //Recebe o content-type da requisição
    let contentType = request.headers['content-type']

    //Chama a função para atualziar o filme e encaminha os dados, o id e o content-type
    let filme = await controllerFilme.atualizarFilme(dadosBody, idFilme, contentType)

    response.status(filme.status_code)
    response.json(filme)
})

//Deleta um filme existente
router.delete('/v1/locadora/filme/:id', cors(), bodyParserJSON, async function(request, response){
    //recebe o id do filme
    let idFilme = request.params.id

    //Chama a função para excluir um filme
    let filme = await controllerFilme.excluirFilme(idFilme)

    response.status(filme.status_code)
    response.json(filme)
})

module.exports = router