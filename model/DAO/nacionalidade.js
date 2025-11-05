/******************************************************************************************
 * Objetivo: Arquivo responsavel pelo CRUD de dados no Mysql referente a nacionalidade
 * Data: 03/11/2025
 * Autor: Guilherme Moreira
 * Versão: 1.0
******************************************************************************************/

//Import da dependencia do Prisma que permite a execução de scipt SLQ no BD
const { PrismaClient } = require('../../generated/prisma')

//Cria um novo objeto baseado na classe do PrismaClient
const prisma = new PrismaClient()

//Função para pegar todos os gêneros
const getSelectAllNationality = async function () {
    try {
        //Script SQL
        let sql = `select * from tbl_nacionalidade order by nome asc`

        //Encaminha para o BD o script SQL
        let result = await prisma.$queryRawUnsafe(sql) //Unsafe signfica que é sem segurança

        if (Array.isArray(result))
            return result
        else
            return false

    } catch (error) {
        // console.log(error)
        return false
    }

}

const getSelectNationalityById = async function (id) {
    try {
        let sql = `select * from tbl_nacionalidade where id=${id}`

        let result = await prisma.$queryRawUnsafe(sql)

        if (Array.isArray(result))
            return result
        else
            return false

    } catch (error) {
        return false
    }
}

const getSelectLastId = async function () {
    try {
        let sql = `select id from tbl_nacionalidade order by id desc limit 1`

        let result = await prisma.$queryRawUnsafe(sql)

        if (Array.isArray(result))
            return Number(result[0].id)
        else
            return false

    } catch (error) {
        return false
    }
}

const setInsertNacionality = async function (nacionalidade) {
    try {
        let sql = `INSERT INTO tbl_nacionalidade (nome, pais_origem) 
                    VALUES
                        ('${nacionalidade.nome}',
                        '${nacionalidade.pais_origem}');`

        let result = await prisma.$executeRawUnsafe(sql)

        if (result)
            return true
        else
            return false

    } catch (error) {
        return false
    }
}

const setUpdateNacionality = async function (nacionalidade) {
    try {
        let sql = `UPDATE tbl_nacionalidade SET
                        nome            = '${nacionalidade.nome}',
                        pais_origem     = '${nacionalidade.pais_origem}'
                    WHERE id = ${nacionalidade.id};`

        let result = await prisma.$executeRawUnsafe(sql)

        if (result)
            return true
        else
            return false
        
    } catch (error) {
        return false
    }
}

const setDeleteNacionality = async function (id) {
    try {
        let sql = `DELETE FROM tbl_nacionalidade WHERE id = ${id};`

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
    getSelectAllNationality,
    getSelectNationalityById,
    getSelectLastId,
    setInsertNacionality,
    setUpdateNacionality,
    setDeleteNacionality
}