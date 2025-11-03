/****************************************************************************************
 * Objetivo: Arquivo responsavel pelas requisições da API da locadora de filmes
 * Data: 07/10/2025
 * Autor: Guilherme Moreira
 * Versão: 1.0
*****************************************************************************************/

//Import das dependencias da API
const express       = require('express')
const cors          = require('cors')
// const bodyParser    = require('body-parser')

//CRia um objeto especialista no formado JSON para receber dados via POST e PUT
// const bodyParserJSON = bodyParser.json()

//Cria um onjeto app para criar a API
const app = express()

//porta
const PORT = process.PORT || 8080

//permissões
app.use((request, response, next) => {
    response.header('Access-Control-Allow-Origin', '*')    //Servidor de origem da API
    response.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS') //verbos permitidos / para adicionar mais métodos separar por , dentro da mesma aspas
    //carrega as configurações no cors da API 
    app.use(cors())
    next() // proximo, carregar os proximos endpoints
})

// Importando rotas
const filmeRoutes = require('./routes/router_filme.js')
const generoRoutes = require('./routes/router_genero.js')
const atorRoutes = require('./routes/router_ator.js')
const personagemRoutes = require('./routes/router_personagem.js')
const nacionalidadeRoutes = require('./routes/router_nacionalidade.js')

// Usando rotas
app.use(filmeRoutes)
app.use(generoRoutes)
app.use(atorRoutes)
app.use(personagemRoutes)
app.use(nacionalidadeRoutes)

app.listen(PORT, function(){
    console.log('API Aguardando Requisições🏎️')
})