/****************************************************************************************
 * Objetivo: Arquivo responsavel pelas requisições da API da locadora de filmes
 * Data: 07/10/2025
 * Autor: Guilherme Moreira
 * Versão: 1.0
*****************************************************************************************/

//Import das dependencias da API
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')

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
app.get('/v1/locadora/filme', cors(), async function(request, response){
    //Chama a função para listar os filmes do BD
    let filme = await controllerFilme.listarFilmes()
    response.status(filme.status_code)
    response.json(filme)
})

app.listen(PORT, function(){
    console.log('API Aguardando Requisições🏎️')
})