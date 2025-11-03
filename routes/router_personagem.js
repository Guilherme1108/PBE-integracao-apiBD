const express = require('express')
const router = express.Router()
const cors = require('cors')
const bodyParser    = require('body-parser')
const bodyParserJSON = bodyParser.json()
const controllerPersonagem = require('../controller/personagem/controller_personagem.js')

router.get('/v1/locadora/personagens', cors(), async function(request, response){
    //Chama a função para listar os filmes do BD
    let personagem = await controllerPersonagem.listarPersonagens()
    response.status(personagem.status_code)
    response.json(personagem)
})

router.get('/v1/locadora/personagem/:id', cors(), async function(request, response){

    let idPersonagem = request.params.id

    let personagem = await controllerPersonagem.buscarPersonagemId(idPersonagem)
    response.status(personagem.status_code)
    response.json(personagem)
})

router.post('/v1/locadora/personagem', cors(), bodyParserJSON, async function(request, response){
    let dadosBody = request.body

    let contentType = request.headers['content-type']

    let personagem = await controllerPersonagem.inserirPersonagem(dadosBody, contentType)

    response.status(personagem.status_code)
    response.json(personagem)
})

//Atualiza um ator existente
router.put('/v1/locadora/personagem/:id', cors(), bodyParserJSON, async function(request, response){
    //recebe o id do personagem
    let idPersonagem = request.params.id

    //Recebe os dados a serem atualizados
    let dadosBody = request.body

    //Recebe o content-type da requisição
    let contentType = request.headers['content-type']

    //Chama a função para atualziar o personagem e encaminha os dados, o id e o content-type
    let personagem = await controllerPersonagem.atualizarPersonagem(dadosBody, idPersonagem, contentType)

    response.status(personagem.status_code)
    response.json(personagem)
})

router.delete('/v1/locadora/personagem/:id', cors(), bodyParserJSON, async function(request, response){
    let idPersonagem = request.params.id

    let personagem = await controllerPersonagem.excluirPersonagem(idPersonagem)

    response.status(personagem.status_code)
    response.json(personagem)
})

module.exports = router