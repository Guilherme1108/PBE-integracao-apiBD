/*******************************************************************************************************
 * Objetivo: Arquivo responsavel pela manipulação de dados entre o APP e a MODEL para o CRUD de filmes
 * Data: 07/10/2025
 * Autor: Guilherme Moreira
 * Versão: 1.0 (CRUD básico do filme, sem as relações com outras tabelas)
 * Versão: 1.1 (CRUD do filme com relacionamento com a tabela genero) 
*******************************************************************************************************/
//Import da model do DAO do filme     
const filmeDAO = require('../../model/DAO/filme.js')

//Import da model da controller de relação entre filme e genero 
const controllerFilmeGenero = require('./controller_filme_genero.js')

//Import do arquivo de mensagens
const DEFAULT_MESSAGES = require('../modulo/config_messages.js')

//Retorna uma lista de todos os filmes
const listarFilmes = async () => {

    //Criando um onjeto novo para as mensagens
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {

        //Chama a função do DAO para retornar a lista de filmes do BD
        let resultFilmes = await filmeDAO.getSelectAllMovies()

        if (resultFilmes) {
            if (resultFilmes.length > 0) {

                //filme é um objeto criado agora
                for(filme of resultFilmes) {
                    let resultGeneros = await controllerFilmeGenero.listarGenerosIdFilme(filme.id)
                    if(resultGeneros.status_code == 200)
                    filme.genero = resultGeneros.items.filme_genero
                }

                MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_REQUEST.status
                MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_REQUEST.status_code
                MESSAGES.DEFAULT_HEADER.items.filmes = resultFilmes

                return MESSAGES.DEFAULT_HEADER //200
            } else {
                return MESSAGES.ERROR_NOT_FOUND //404
            }
        } else {
            return MESSAGES.ERROR_INTERNAL_SERVER_MODEL //500
        }

    } catch (error) {
        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}

//Retorna um filme filtrando pelo ID
const BuscarFilmeId = async (id) => {
    //Criando um onjeto novo para as mensagens
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {
        //validação da chegada do ID
        if (!isNaN(id) && id != '' && id != null && id > 0) {
            let resultFilmes = await filmeDAO.getSelectByIdMovies(Number(id))

            if (resultFilmes) {
                if (resultFilmes.length > 0) {
                    let resultFilmesGenero = await controllerFilmeGenero.listarGenerosIdFilme(id)

                    if (resultFilmesGenero.status_code == 200) {
                        resultFilmes[0].genero = resultFilmesGenero.items.filme_genero

                    } else {
                        resultFilmes[0].genero = 'Gênero não informado'
                    }

                    MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_REQUEST.status
                    MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_REQUEST.status_code
                    MESSAGES.DEFAULT_HEADER.items.filme = resultFilmes

                    return MESSAGES.DEFAULT_HEADER //200
                } else {
                    return MESSAGES.ERROR_NOT_FOUND //404
                }
            } else {
                return MESSAGES.ERROR_INTERNAL_SERVER_MODEL // 500
            }
        } else {
            MESSAGES.ERROR_REQUIRED_FIELDS.message += '[ID Incorreto]'
            return MESSAGES.ERROR_REQUIRED_FIELDS //400
        }

    } catch (error) {
        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }

}

//Insere um filme
const inserirFilme = async (filme, contentType) => {

    //Criando um onjeto novo para as mensagens
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {
        //Validação do tipo de conteúdo de requisição (Obrigatório ser um JSON)
        if (String(contentType).toUpperCase() == 'APPLICATION/JSON') {

            //Chama a função de validar todos os dados do filme
            let validar = await validarDadosFilme(filme)

            if (!validar) {

                //Processamento
                //Chama a função para inserir um novo filme no BD
                let resultFilmes = await filmeDAO.setInsertMovies(filme)

                if (resultFilmes) {
                    //Chama a função para receber o ID gerado no BD
                    let lastId = await filmeDAO.getSelectLastId()
                    if (lastId) {

                        //Processar a inserção dos dados na tabela de relação
                        //entre Filme e Genero
                        // filme.genero.forEach(async function(genero){
                        for (genero of filme.genero) {

                            let filmeGenero = {
                                id_filme: lastId,
                                id_genero: genero.id
                            }

                            let resultFilmesGenero = await controllerFilmeGenero.inserirFilmeGenero(filmeGenero, contentType)

                            if (resultFilmesGenero.status_code != 201)
                                return MESSAGES.ERROR_RELATION_TABLE //200 porem com problemas na tabela de relação
                        }


                        //Adiciona o ID no JSON com os dados do filme
                        filme.id = lastId
                        MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_CREATED_ITEM.status
                        MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_CREATED_ITEM.status_code
                        MESSAGES.DEFAULT_HEADER.message = MESSAGES.SUCCESS_CREATED_ITEM.message

                        //Processamento para trazer dados dos generos cadastrados na tabela de relaçao
                        delete filme.genero

                        //Pesquisa no BD quais os generos e os seus dados que foram inseridos na tabela relação
                        let resultGenerosFilme = await controllerFilmeGenero.listarGenerosIdFilme(lastId)

                        //Adiciona momentaneamente o atributi genero com todas as informações do genero (ID, filme)
                        filme.genero = resultGenerosFilme.items.filme_genero


                        MESSAGES.DEFAULT_HEADER.items = filme

                        return MESSAGES.DEFAULT_HEADER //201

                    } else {
                        return MESSAGES.ERROR_INTERNAL_SERVER_MODEL //500
                    }

                } else {
                    return MESSAGES.ERROR_INTERNAL_SERVER_MODEL //500
                }
            } else {
                return validar //400
            }

        } else {
            return MESSAGES.ERROR_CONTENT_TYPE //415
        }

    } catch (error) {
        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }

}

//Atualiza um filme buscando pelo ID
const atualizarFilme = async (filme, id, contentType) => {

    //Criando um onjeto novo para as mensagens
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {
        //Validação do tipo de conteúdo de requisição (Obrigatório ser um JSON)
        if (String(contentType).toUpperCase() == 'APPLICATION/JSON') {

            //Chama a função de validar todos os dados do filme
            let validar = await validarDadosFilme(filme)

            if (!validar) {

                //Validação de ID válido, chama a função da controller que verifica no BD se o ID existe e valida o ID
                let validarID = await BuscarFilmeId(id)

                if (validarID.status_code == 200) {

                    //Adiciona o ID do filme no JSON de dados para ser encaminhado ao DAO
                    filme.id = Number(id)

                    //Processamento
                    //Chama a função para atualizar um novo filme no BD
                    let resultFilmes = await filmeDAO.setUpdateMovies(filme)

                    if (resultFilmes) {
                        MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_UPDATED_ITEM.status
                        MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_UPDATED_ITEM.status_code
                        MESSAGES.DEFAULT_HEADER.message = MESSAGES.SUCCESS_UPDATED_ITEM.message
                        MESSAGES.DEFAULT_HEADER.items.filme = filme

                        return MESSAGES.DEFAULT_HEADER //200
                    } else {
                        return MESSAGES.ERROR_INTERNAL_SERVER_MODEL //500
                    }
                } else {
                    return validarID //A função buscarFilmeID poderá retornar (400 ou 404 ou 500)
                }
            } else {
                return validar //400 referente a validação dos dados
            }


        } else {
            return MESSAGES.ERROR_CONTENT_TYPE //415
        }

    } catch (error) {
        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }
}

//Exclui um filme buscando pelo ID
const excluirFilme = async (id) => {

    //Criando um onjeto novo para as mensagens
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {

        //Validação de ID válido, chama a função da controller que verifica no BD se o ID existe e valida o ID
        let validarID = await BuscarFilmeId(id)

        if (validarID.status_code == 200) {

            //Adiciona o ID do filme no JSON de dados para ser encaminhado ao DAO
            id = Number(id)

            //Processamento
            //Chama a função para atualizar um novo filme no BD
            let resultFilmes = await filmeDAO.setDeleteMovies(id)

            if (resultFilmes) {
                MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_DELETED_ITEM.status
                MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_DELETED_ITEM.status_code
                MESSAGES.DEFAULT_HEADER.message = MESSAGES.SUCCESS_DELETED_ITEM.message
                delete MESSAGES.DEFAULT_HEADER.items

                return MESSAGES.DEFAULT_HEADER //200
            } else {
                return MESSAGES.ERROR_INTERNAL_SERVER_MODEL //500
            }
        } else {
            return validarID //A função buscarFilmeID poderá retornar (400 ou 404 ou 500)
        }

    } catch (error) {
        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER //500

    }

}

//Validação dos dados de cadastros e atualização do filme
const validarDadosFilme = async function (filme) {

    //Criando um onjeto novo para as mensagens
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    //Validação de todas as entradas de dados
    if (filme.nome == '' || filme.nome == undefined || filme.nome == null || filme.nome.length > 100) {
        MESSAGES.ERROR_REQUIRED_FIELDS.message += '[Nome incorreto]'
        return MESSAGES.ERROR_REQUIRED_FIELDS

    } else if (filme.sinopse == undefined) {
        MESSAGES.ERROR_REQUIRED_FIELDS.message += '[Sinopse incorreto]'
        return MESSAGES.ERROR_REQUIRED_FIELDS

    } else if (filme.data_lancamento == undefined || filme.data_lancamento.length != 10) {
        MESSAGES.ERROR_REQUIRED_FIELDS.message += '[Data lançamento incorreto]'
        return MESSAGES.ERROR_REQUIRED_FIELDS

    } else if (filme.duracao == '' || filme.duracao == undefined || filme.duracao == null || filme.duracao.length > 8) {
        MESSAGES.ERROR_REQUIRED_FIELDS.message += '[Duração incorreto]'
        return MESSAGES.ERROR_REQUIRED_FIELDS

    } else if (filme.orcamento == '' || filme.orcamento == undefined || filme.orcamento == null || filme.orcamento.length > 12 || typeof (filme.orcamento) != 'number') {
        MESSAGES.ERROR_REQUIRED_FIELDS.message += '[Orçamento incorreto]'
        return MESSAGES.ERROR_REQUIRED_FIELDS

    } else if (filme.trailer == '' || filme.trailer.length > 200) {
        MESSAGES.ERROR_REQUIRED_FIELDS.message += '[Trailer incorreto]'
        return MESSAGES.ERROR_REQUIRED_FIELDS

    } else if (filme.capa == '' || filme.capa == undefined || filme.capa == null || filme.capa.length > 200) {
        MESSAGES.ERROR_REQUIRED_FIELDS.message += '[Capa incorreto]'
        return MESSAGES.ERROR_REQUIRED_FIELDS
    } else {
        return false
    }
}

module.exports = {
    listarFilmes,
    BuscarFilmeId,
    inserirFilme,
    atualizarFilme,
    excluirFilme
}