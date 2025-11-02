/*******************************************************************************************************
 * Objetivo: Arquivo responsavel pela manipulação de dados entre o APP e a MODEL para o CRUD de atores
 * Data: 29/10/2025
 * Autor: Guilherme Moreira
 * Versão: 1.0
*******************************************************************************************************/

//Import da model do DAO do genero    
const atorDAO = require('../../model/DAO/ator.js')

//Import do arquivo de mensagens
const DEFAULT_MESSAGES = require('../modulo/config_messages.js')

const listarAtores = async () => {

    //Criando um objeto novo para as mensagens
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {
        let resultAtor = await atorDAO.getSelectAllActor()
        
        if(resultAtor){
            if (resultAtor.length > 0) {
                MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_REQUEST.status
                MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_REQUEST.status_code
                MESSAGES.DEFAULT_HEADER.items.atores = resultAtor

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

const buscarAtorId = async (id) => {
    //Criando um objeto novo para as mensagens
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {
        if (!isNaN(id) && id != '' && id != null && id > 0) {
            let resultAtor = await atorDAO.getSelectActorById(Number(id))

            if (resultAtor) {
                if (resultAtor.length > 0) {
                    MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_REQUEST.status
                    MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_REQUEST.status_code
                    MESSAGES.DEFAULT_HEADER.items.ator = resultAtor

                    return MESSAGES.DEFAULT_HEADER //200
                } else {
                    return MESSAGES.ERROR_NOT_FOUND //404
                }
            } else {
                return MESSAGES.ERROR_INTERNAL_SERVER_MODEL
            }
        } else {
            MESSAGES.ERROR_REQUIRED_FIELDS.message += '[ID incorreto]'
            return MESSAGES.ERROR_REQUIRED_FIELDS //400
        }

    } catch (error) {
        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }
}

//Inserir um novo genero
const inserirAtor = async (ator, contentType) => {
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {
        //validação do tipo de conteúdo
        if (String(contentType).toUpperCase() == 'APPLICATION/JSON') {
            let validar = await validarDadosAtor(ator)

            if (!validar) {
                let resultAtor = await atorDAO.setInsertActor(ator)

                if (resultAtor) {
                    let lastId = await atorDAO.getSelectLastId()
                    if (lastId) {
                        ator.id = lastId
                        MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_CREATED_ITEM.status
                        MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_CREATED_ITEM.status_code
                        MESSAGES.DEFAULT_HEADER.message = MESSAGES.SUCCESS_CREATED_ITEM.message
                        MESSAGES.DEFAULT_HEADER.items = ator

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
        console.log(error)
        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}


const atualizarAtor = async (ator, id, contentType) => {

    console.log('ID recebido:', id)

    //Criando um objeto novo para as mensagens
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {
        if (String(contentType).toUpperCase() == 'APPLICATION/JSON') {

            let validar = await validarDadosAtor(ator)

            if (!validar) {

                let validarID = await buscarAtorId(id)

                if (validarID.status_code == 200) {

                    ator.id = Number(id)

                    let resultAtor = await atorDAO.setUpdateActor(ator)

                    if (resultAtor) {
                        MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_UPDATED_ITEM.status
                        MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_UPDATED_ITEM.status_code
                        MESSAGES.DEFAULT_HEADER.message = MESSAGES.SUCCESS_UPDATED_ITEM.message
                        MESSAGES.DEFAULT_HEADER.items.ator = ator

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

const excluirAtor = async (id) => {
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {

        let validarId = await buscarAtorId(id)

        if (validarId.status_code == 200) {

            id = Number(id)

            let resultAtor = await atorDAO.setDeleteActor(id)

            if (resultAtor) {
                MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_DELETED_ITEM.status
                MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_DELETED_ITEM.status_code
                MESSAGES.DEFAULT_HEADER.message = MESSAGES.SUCCESS_DELETED_ITEM.message

                return MESSAGES.DEFAULT_HEADER //200
            } else {
                return MESSAGES.ERROR_INTERNAL_SERVER_MODEL //500
            }
        } else {
            return validarId // 400 / 404 / 500
        }

    } catch (error) {
        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }
}
//Validação dos dados de cadastros e atualização do filme
const validarDadosAtor = async function (ator) {

    //Criando um onjeto novo para as mensagens
        let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    //Validação de todas as entradas de dados
    if (ator.nome == '' || ator.nome == undefined || ator.nome == null || ator.nome.length > 100) {
        MESSAGES.ERROR_REQUIRED_FIELDS.message += '[Nome incorreto]'
        return MESSAGES.ERROR_REQUIRED_FIELDS

    } else if (ator.nome_artistico.length > 100) {
            MESSAGES.ERROR_REQUIRED_FIELDS.message += '[Nome artistico incorreto]'
            return MESSAGES.ERROR_REQUIRED_FIELDS

    } else if (ator.data_nascimento == undefined || ator.data_nascimento.length != 10) {
        MESSAGES.ERROR_REQUIRED_FIELDS.message += '[Data nascimento incorreto]'
        return MESSAGES.ERROR_REQUIRED_FIELDS

    } else if (ator.altura == '' || ator.altura == undefined || ator.altura == null || ator.altura.length > 3 || typeof (ator.altura) != 'number') {
        MESSAGES.ERROR_REQUIRED_FIELDS.message += '[Altura incorreto]'
        return MESSAGES.ERROR_REQUIRED_FIELDS

    } else if (ator.biografia == '' || ator.biografia.length > 1000) {
        MESSAGES.ERROR_REQUIRED_FIELDS.message += '[Biografia incorreto]'
        return MESSAGES.ERROR_REQUIRED_FIELDS

    } else {
        return false
    }
}

module.exports = {
    listarAtores,
    buscarAtorId,
    inserirAtor,
    atualizarAtor,
    excluirAtor
}