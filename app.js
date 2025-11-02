/****************************************************************************************
 * Objetivo: Arquivo responsavel pelas requisições da API da locadora de filmes
 * Data: 07/10/2025
 * Autor: Guilherme Moreira
 * Versão: 1.0
*****************************************************************************************/

//Import das dependencias da API
const express       = require('express')
const cors          = require('cors')
const bodyParser    = require('body-parser')

//CRia um objeto especialista no formado JSON para receber dados via POST e PUT
const bodyParserJSON = bodyParser.json()

//Cria um onjeto app para criar a API
const app = express()

//porta
const PORT = process.PORT || 8080

//permissões
app.use((request, response, next) => {
    response.header('Acces-Control-Allow-Origin', '*')    //Servidor de origem da API
    response.header('Acces-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS') //verbos permitidos / para adicionar mais métodos separar por , dentro da mesma aspas
    //carrega as configurações no cors da API 
    app.use(cors())
    next() // proximo, carregar os proximos endpoints
})

//Import das controllers
const controllerFilme = require('./controller/filme/controller_filme.js')
const controllerGenero = require('./controller/genero/controller_genero.js')
const controllerAtor = require('./controller/ator/controller_ator.js')
const controllerPersonagem = require('./controller/personagem/controller_personagem.js')

//EndPoints para a rota de filme

//Retorna a lista de todos os filmes
app.get('/v1/locadora/filmes', cors(), async function(request, response){
    //Chama a função para listar os filmes do BD
    let filme = await controllerFilme.listarFilmes()
    response.status(filme.status_code)
    response.json(filme)
})

//Retorna o filme filtrando pelo ID
app.get('/v1/locadora/filme/:id', cors(), async function(request, response){

    //recebe o ID encaminhado via parametro na erquisição
    let idFilme = request.params.id

    //Chama a função para listar os filmes do BD
    let filme = await controllerFilme.BuscarFilmeId(idFilme)
    response.status(filme.status_code)
    response.json(filme)
})

//Insere um novo filme
app.post('/v1/locadora/filme', cors(), bodyParserJSON, async function(request, response){
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
app.put('/v1/locadora/filme/:id', cors(), bodyParserJSON, async function(request, response){
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
app.delete('/v1/locadora/filme/:id', cors(), bodyParserJSON, async function(request, response){
    //recebe o id do filme
    let idFilme = request.params.id

    //Chama a função para excluir um filme
    let filme = await controllerFilme.excluirFilme(idFilme)

    response.status(filme.status_code)
    response.json(filme)
})

/*********************CRUD DOS GENEROS***********************************/

//Retorna todos os generos
app.get('/v1/locadora/generos', cors(), async function(request, response){
    //Chama a função para listar os filmes do BD
    let genero = await controllerGenero.listarGeneros()
    response.status(genero.status_code)
    response.json(genero)
})

//Busca genero pelo ID
app.get('/v1/locadora/genero/:id', cors(), async function(request, response){

    //recebe o ID encaminhado via parametro na erquisição
    let idGenero = request.params.id

    //Chama a função para listar os filmes do BD
    let genero = await controllerGenero.buscarGeneroId(idGenero)
    response.status(genero.status_code)
    response.json(genero)
})

//Insere um novo gênero
app.post('/v1/locadora/genero', cors(), bodyParserJSON, async function(request, response){
    let dadosBody = request.body

    let contentType = request.headers['content-type']

    let genero = await controllerGenero.inserirGenero(dadosBody, contentType)

    response.status(genero.status_code)
    response.json(genero)
})

//Atualiza um gênero existente
app.put('/v1/locadora/genero/:id', cors(), bodyParserJSON, async function(request, response){
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
app.delete('/v1/locadora/genero/:id', cors(), bodyParserJSON, async function(request, response){
    let idGenero = request.params.id

    //Chama a função para atualziar o filme e encaminha os dados, o id e o content-type
    let genero = await controllerGenero.excluirGenero(idGenero)

    response.status(genero.status_code)
    response.json(genero)
})

/*********************CRUD DOS ATORES***********************************/

app.get('/v1/locadora/atores', cors(), async function(request, response){
    //Chama a função para listar os filmes do BD
    let ator = await controllerAtor.listarAtores()
    response.status(ator.status_code)
    response.json(ator)
})

//Busca ator pelo ID
app.get('/v1/locadora/ator/:id', cors(), async function(request, response){

    let idAtor = request.params.id

    let ator = await controllerAtor.buscarAtorId(idAtor)
    response.status(ator.status_code)
    response.json(ator)
})

//Insere um novo ator
app.post('/v1/locadora/ator', cors(), bodyParserJSON, async function(request, response){
    let dadosBody = request.body

    let contentType = request.headers['content-type']

    let ator = await controllerAtor.inserirAtor(dadosBody, contentType)

    response.status(ator.status_code)
    response.json(ator)
})

//Atualiza um ator existente
app.put('/v1/locadora/ator/:id', cors(), bodyParserJSON, async function(request, response){
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
app.delete('/v1/locadora/ator/:id', cors(), bodyParserJSON, async function(request, response){
    let idAtor = request.params.id

    let ator = await controllerAtor.excluirAtor(idAtor)

    response.status(ator.status_code)
    response.json(ator)
})

/*********************CRUD DOS PERSONAGENS***********************************/

app.get('/v1/locadora/personagens', cors(), async function(request, response){
    //Chama a função para listar os filmes do BD
    let personagem = await controllerPersonagem.listarPersonagens()
    response.status(personagem.status_code)
    response.json(personagem)
})

app.get('/v1/locadora/personagem/:id', cors(), async function(request, response){

    let idPersonagem = request.params.id

    let personagem = await controllerPersonagem.buscarPersonagemId(idPersonagem)
    response.status(personagem.status_code)
    response.json(personagem)
})

app.post('/v1/locadora/personagem', cors(), bodyParserJSON, async function(request, response){
    let dadosBody = request.body

    let contentType = request.headers['content-type']

    let personagem = await controllerPersonagem.inserirPersonagem(dadosBody, contentType)

    response.status(personagem.status_code)
    response.json(personagem)
})

//Atualiza um ator existente
app.put('/v1/locadora/personagem/:id', cors(), bodyParserJSON, async function(request, response){
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

app.delete('/v1/locadora/personagem/:id', cors(), bodyParserJSON, async function(request, response){
    let idPersonagem = request.params.id

    let personagem = await controllerPersonagem.excluirPersonagem(idPersonagem)

    response.status(personagem.status_code)
    response.json(personagem)
})


/********************************************************************* */

app.listen(PORT, function(){
    console.log('API Aguardando Requisições🏎️')
})