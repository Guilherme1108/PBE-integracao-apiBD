const express = require('express')
const router = express.Router()
const cors = require('cors')
const bodyParser    = require('body-parser')
const bodyParserJSON = bodyParser.json()
const controllerNacionalidade = require('../controller/nacionalidade/controller_nacionalidade.js')

router.get('/v1/locadora/nacionalidades', cors(), async function(request, response){
    let nacionalidade = await controllerNacionalidade.listarNacionalidades()
    response.status(nacionalidade.status_code)
    response.json(nacionalidade)
})

router.get('/v1/locadora/nacionalidade/:id', cors(), async function(request, response){

    let idNacionalidade = request.params.id

    let nacionalidade = await controllerNacionalidade.buscarNacionalidadeId(idNacionalidade)
    response.status(nacionalidade.status_code)
    response.json(nacionalidade)
})

router.post('/v1/locadora/nacionalidade', cors(), bodyParserJSON, async function(request, response){
    let dadosBody = request.body

    let contentType = request.headers['content-type']

    let nacionalidade = await controllerNacionalidade.inserirNacionalidade(dadosBody, contentType)

    response.status(nacionalidade.status_code)
    response.json(nacionalidade)
})

router.put('/v1/locadora/nacionalidade/:id', cors(), bodyParserJSON, async function(request, response){
    //recebe o id do personagem
    let idNacionalidade = request.params.id

    //Recebe os dados a serem atualizados
    let dadosBody = request.body

    //Recebe o content-type da requisição
    let contentType = request.headers['content-type']

    //Chama a função para atualziar o personagem e encaminha os dados, o id e o content-type
    let nacionalidade = await controllerNacionalidade.atualizarNacionalidade(dadosBody, idNacionalidade, contentType)

    response.status(nacionalidade.status_code)
    response.json(nacionalidade)
})

router.delete('/v1/locadora/nacionalidade/:id', cors(), bodyParserJSON, async function(request, response){
    let idNacionalidade = request.params.id

    let nacionalidade = await controllerNacionalidade.excluirNacionalidade(idNacionalidade)

    response.status(nacionalidade.status_code)
    response.json(nacionalidade)
})

module.exports = router