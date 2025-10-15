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

    //Chama a função para atualziar o filme e encaminha os dados, o id e o content-type
    let filme = await controllerFilme.excluirFilme(idFilme)

    response.status(filme.status_code)
    response.json(filme)
})

app.listen(PORT, function(){
    console.log('API Aguardando Requisições🏎️')
})