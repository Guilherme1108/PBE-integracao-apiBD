/******************************************************************************************
 * Objetivo: Arquivo responsavel pelo CRUD de dados no Mysql referente aos personagens
 * Data: 02/11/2025
 * Autor: Guilherme Moreira
 * Versão: 1.0
******************************************************************************************/

//Import da dependencia do Prisma que permite a execução de scipt SLQ no BD
const { PrismaClient } = require('../../generated/prisma')

const prisma = new PrismaClient()

//Função para pegar todos os atores
const getSelectAllCharacter = async function () {
    try {
        sql = `select * from tbl_personagem order by id desc`

        let result = await prisma.$queryRawUnsafe(sql)

        if (Array.isArray(result)) {
            return result
        } else {
            return false
        }
    } catch (error) {
        return false
    }
}

const getSelectCharactorById = async function (id) {
    try {
        let sql = `select * from tbl_personagem where id=${id}`

        let result = await prisma.$queryRawUnsafe(sql)

        if (Array.isArray(result))
            return result
        else
            return false

    } catch (error) {
        return false
    }
}

const getSelectLastId = async function (id) {
    try {
        let sql = `select id from tbl_personagem order by id desc limit 1`

        let result = await prisma.$queryRawUnsafe(sql)

        if (Array.isArray(result))
            return Number(result[0].id)
        else
            return false

    } catch (error) {
        return false
    }
}

const setInsertCharacter = async function (personagem) {
    try {
        let sql = `INSERT INTO tbl_personagem (nome,idade,descricao,papel)
                        VALUES  ('${personagem.nome}',
                                '${personagem.idade}',
                                '${personagem.descricao}',
                                '${personagem.papel}')`

        //ExecuteRawUnsafe() -> executa o script SQL que não tem o retorno de valores
        let result = await prisma.$executeRawUnsafe(sql)

        if (result)
            return true
        else
            return false

    } catch (error) {
        return false
    }
}

const setUpdateCharacter = async function (personagem) {
    try {
        let sql = `UPDATE tbl_personagem SET
                        nome                = '${personagem.nome}',
                        idade               = '${personagem.idade}',
                        descricao           = '${personagem.descricao}',
                        papel               = '${personagem.papel}'
                        
                    WHERE id = ${personagem.id};`

        let result = await prisma.$executeRawUnsafe(sql)

        if (result)
            return true
        else
            return false
        
    } catch (error) {
        return false
    }
}

const setDeleteCharacter = async function (id) {
    try {
        let sql = `DELETE FROM tbl_personagem WHERE id = ${id};`

        let result = await prisma.$executeRawUnsafe(sql)

        if (result)
            return true
        else
            return false

    } catch (error) {
        return false
    }

}

module.exports = {
    getSelectAllCharacter,
    getSelectCharactorById,
    getSelectLastId,
    setInsertCharacter,
    setUpdateCharacter,
    setDeleteCharacter
}