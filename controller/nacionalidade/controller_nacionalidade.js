/************************************************************************************************************
 * Objetivo: Arquivo responsavel pela manipulação de dados entre o APP e a MODEL para o CRUD da nacionalidade
 * Data: 03/11/2025
 * Autor: Guilherme Moreira
 * Versão: 1.0
*************************************************************************************************************/

//Import da model do DAO do genero    
const nacionalidadeDAO = require('../../model/DAO/nacionalidade.js')

//Import do arquivo de mensagens
const DEFAULT_MESSAGES = require('../modulo/config_messages.js')

//Retorna uma lista de todos as nacionalidades
const listarNacionalidades = async () => {

    //Criando um objeto novo para as mensagens
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {

        let resultNacionalidade = await nacionalidadeDAO.getSelectAllNationality()

        if (resultNacionalidade) {
            if (resultNacionalidade.length > 0) {
                MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_REQUEST.status
                MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_REQUEST.status_code
                MESSAGES.DEFAULT_HEADER.items.nacionalidades = resultNacionalidade

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

const buscarNacionalidadeId = async (id) => {
    //Criando um objeto novo para as mensagens
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {
        if (!isNaN(id) && id != '' && id != null && id > 0) {
            let resultNacionalidade = await nacionalidadeDAO.getSelectNationalityById(Number(id))

            if (resultNacionalidade) {
                if (resultNacionalidade.length > 0) {
                    MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_REQUEST.status
                    MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_REQUEST.status_code
                    MESSAGES.DEFAULT_HEADER.items.nacionalidade = resultNacionalidade

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

const inserirNacionalidade = async (nacionalidade, contentType) => {
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {
        //validação do tipo de conteúdo
        if (String(contentType).toUpperCase() == 'APPLICATION/JSON') {
            let validar = await validarDadosNacionalidade(nacionalidade)

            if (!validar) {
                let resultNacionalidade = await nacionalidadeDAO.setInsertNacionality(nacionalidade)

                if (resultNacionalidade) {
                    let lastId = await nacionalidadeDAO.getSelectLastId()
                    if (lastId) {
                        nacionalidade.id = lastId
                        MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_CREATED_ITEM.status
                        MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_CREATED_ITEM.status_code
                        MESSAGES.DEFAULT_HEADER.message = MESSAGES.SUCCESS_CREATED_ITEM.message
                        MESSAGES.DEFAULT_HEADER.items = nacionalidade

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
        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}

const atualizarNacionalidade = async (nacionalidade, id, contentType) => {

    //Criando um onjeto novo para as mensagens
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {
        if (String(contentType).toUpperCase() == 'APPLICATION/JSON') {

            let validar = await validarDadosNacionalidade(nacionalidade)

            if (!validar) {

                let validarID = await buscarNacionalidadeId(id)

                if (validarID.status_code == 200) {

                    nacionalidade.id = Number(id)

                    let resultNacionalidade = await nacionalidadeDAO.setUpdateNacionality(nacionalidade)

                    if (resultNacionalidade) {
                        MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_UPDATED_ITEM.status
                        MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_UPDATED_ITEM.status_code
                        MESSAGES.DEFAULT_HEADER.message = MESSAGES.SUCCESS_UPDATED_ITEM.message
                        MESSAGES.DEFAULT_HEADER.items.nacionalidade = nacionalidade

                        return MESSAGES.DEFAULT_HEADER //200
                    } else {
                        return MESSAGES.ERROR_INTERNAL_SERVER_MODEL //500
                    }
                } else {
                    return validarID //(400 ou 404 ou 500)
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

const excluirNacionalidade = async (id) => {
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {

        let validarId = await buscarNacionalidadeId(id)

        if (validarId.status_code == 200) {

            id = Number(id)

            let resultNacionalidade = await nacionalidadeDAO.setDeleteNacionality(id)

            if (resultNacionalidade) {
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

const validarDadosNacionalidade = async function (nacionalidade) {

    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    //validação
    if (nacionalidade.nome == '' || nacionalidade.nome == undefined || nacionalidade.nome == null || nacionalidade.nome.length > 50) {
        MESSAGES.ERROR_REQUIRED_FIELDS.message += '[Nome incorreto!]'
        return MESSAGES.ERROR_REQUIRED_FIELDS

    } else if (nacionalidade.pais_origem == '' || nacionalidade.pais_origem == undefined || nacionalidade.pais_origem == null || nacionalidade.pais_origem.length > 100) {
        MESSAGES.ERROR_REQUIRED_FIELDS.message += '[País incorreto!]'
        return MESSAGES.ERROR_REQUIRED_FIELDS
    } else {
        return false
    }

}

module.exports = {
    listarNacionalidades,
    buscarNacionalidadeId,
    inserirNacionalidade,
    atualizarNacionalidade,
    excluirNacionalidade
}