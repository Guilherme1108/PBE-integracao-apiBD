/******************************************************************************************
 * Objetivo: Arquivo responsavel pelo CRUD de dados no Mysql referente aos atores
 * Data: 29/10/2025
 * Autor: Guilherme Moreira
 * Versão: 1.0
******************************************************************************************/

//Import da dependencia do Prisma que permite a execução de scipt SLQ no BD
const { PrismaClient } = require('../../generated/prisma')

const prisma = new PrismaClient()

//Função para pegar todos os atores
const getSelectAllActor = async function () {
    try {
        sql = `select * from tbl_ator order by id desc`

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

const getSelectActorById = async function (id) {
    try {
        let sql = `select * from tbl_ator where id=${id}`

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
        let sql = `select id from tbl_ator order by id desc limit 1`

        let result = await prisma.$queryRawUnsafe(sql)

        if (Array.isArray(result))
            return Number(result[0].id)
        else
            return false

    } catch (error) {
        return false
    }
}

const setInsertActor = async function (ator) {
    try {
        if (ator.data_falescimento == null || ator.data_falescimento == '' || ator.data_falescimento == undefined) {

            let sql = `INSERT INTO tbl_ator (nome, nome_artistico, data_nascimento, data_falescimento, altura, biografia)
            VALUES 
            ('${ator.nome}', 
            '${ator.nome_artistico}',
            '${ator.data_nascimento}', 
            null, 
             ${ator.altura}, 
            '${ator.biografia}');`

            let result = await prisma.$executeRawUnsafe(sql)

            if (result)
                return true
            else
                return false

        } else {
            let sql = `INSERT INTO tbl_ator (nome, nome_artistico, data_nascimento, data_falescimento, altura, biografia)
            VALUES 
            ('${ator.nome}', 
            '${ator.nome_artistico}',
            '${ator.data_nascimento}', 
            '${ator.data_falescimento}', 
             ${ator.altura}, 
            '${ator.biografia}');`

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

module.exports = {
    getSelectAllActor,
    getSelectActorById,
    getSelectLastId,
    setInsertActor
}