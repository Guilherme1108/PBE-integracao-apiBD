/******************************************************************************************
 * Objetivo: Arquivo responsavel pelo CRUD de dados no Mysql referente ao genero
 * Data: 22/10/2025
 * Autor: Guilherme Moreira
 * Versão: 1.0
******************************************************************************************/

//Import da dependencia do Prisma que permite a execução de scipt SLQ no BD
const { PrismaClient } = require('../../generated/prisma')

//Cria um novo objeto baseado na classe do PrismaClient
const prisma = new PrismaClient()

//Função para pegar todos os gêneros
const getSelectAllGender = async function () {
    try {
        //Script SQL
        let sql = `select * from tbl_genero order by id desc`

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

const getSelectGenderById = async function (id) {
    try {
        let sql = `select * from tbl_genero where id=${id}`

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
        let sql = `select id from tbl_genero order by id desc limit 1`

        let result = await prisma.$queryRawUnsafe(sql)

        if (Array.isArray(result))
            return Number(result[0].id)
        else
            return false

    } catch (error) {
        return false
    }
}

const setInsertGender = async function (genero) {
    try {
        let sql = `INSERT INTO tbl_genero (nome) 
                    VALUES
                        ('${genero.nome}');`

        let result = await prisma.$executeRawUnsafe(sql)

        if (result)
            return true
        else
            return false

    } catch (error) {
        return false
    }
}

const setUpdateGender = async function (genero) {
    try {
        let sql = `UPDATE tbl_genero SET
                        nome = '${genero.nome}'
                    WHERE id = ${genero.id};`

        let result = await prisma.$executeRawUnsafe(sql)

        if (result)
            return true
        else
            return false
        
    } catch (error) {
        return false
    }
}

const setDeleteGender = async function (id) {
    try {
        let sql = `DELETE FROM tbl_genero WHERE id = ${id};`

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
    getSelectAllGender,
    getSelectGenderById,
    getSelectLastId,
    setInsertGender,
    setUpdateGender,
    setDeleteGender
}