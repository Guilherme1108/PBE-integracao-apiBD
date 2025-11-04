/******************************************************************************************
 * Objetivo: Arquivo responsavel pelo CRUD de dados no Mysql referente aos dubladores
 * Data: 04/11/2025
 * Autor: Guilherme Moreira
 * Versão: 1.0
******************************************************************************************/

//Import da dependencia do Prisma que permite a execução de scipt SLQ no BD
const { PrismaClient } = require('../../generated/prisma')

const prisma = new PrismaClient()

//Função para pegar todos os atores
const getSelectAllVoiceActor = async function () {
    try {
        sql = `select * from tbl_dublador order by id desc`

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

const getSelectActorVoiceById = async function (id) {
    try {
        let sql = `select * from tbl_dublador where id=${id}`

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
        let sql = `select id from tbl_dublador order by id desc limit 1`

        let result = await prisma.$queryRawUnsafe(sql)

        if (Array.isArray(result))
            return Number(result[0].id)
        else
            return false

    } catch (error) {
        return false
    }
}

const setInsertActorVoice = async function (dublador) {
    try {
        if (dublador.data_falescimento == null || dublador.data_falescimento == '' || dublador.data_falescimento == undefined) {

            let sql = `INSERT INTO tbl_dublador (nome, data_nascimento, data_falescimento)
            VALUES 
            ('${dublador.nome}', 
            '${dublador.data_nascimento}', 
            null);`

            let result = await prisma.$executeRawUnsafe(sql)

            if (result)
                return true
            else
                return false

        } else {
            let sql = `INSERT INTO tbl_dublador (nome, data_nascimento, data_falescimento)
            VALUES 
            ('${dublador.nome}', 
            '${dublador.data_nascimento}', 
            '${dublador.data_falescimento}');`

            let result = await prisma.$executeRawUnsafe(sql)

            if (result)
                return true
            else
                return false
        }


    } catch (error) {
        return false
    }
}

const setUpdateActorVoice = async function (dublador) {
    try {

        if (dublador.data_falescimento == null || dublador.data_falescimento == '' || dublador.data_falescimento == undefined) {

            let sql = `UPDATE tbl_dublador SET
                        nome                    = '${dublador.nome}',
                        data_nascimento         = '${dublador.data_nascimento}',
                        data_falescimento       = null
                    WHERE id = ${dublador.id};`

            let result = await prisma.$executeRawUnsafe(sql)

            if (result)
                return true
            else
                return false

        } else {
            let sql = `UPDATE tbl_dublador SET
                        nome                    = '${dublador.nome}',
                        data_nascimento         = '${dublador.data_nascimento}',
                        data_falescimento       = '${dublador.data_falescimento}'
                    WHERE id = ${dublador.id};`

            let result = await prisma.$executeRawUnsafe(sql)

            if (result)
                return true
            else
                return false
        }


    } catch (error) {
        return false
    }
}

const setDeleteActorVoice = async function (id) {
    try {
        let sql = `DELETE FROM tbl_dublador WHERE id = ${id};`

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
    getSelectAllVoiceActor,
    getSelectActorVoiceById,
    getSelectLastId,
    setInsertActorVoice,
    setUpdateActorVoice,
    setDeleteActorVoice
}