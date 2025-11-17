/******************************************************************************************
 * Objetivo: Arquivo responsavel pelo CRUD de dados no Mysql referente ao relacionamento entre ator e genero
 * Data: 12/11/2025
 * Autor: Guilherme Moreira
 * Versão: 1.0
******************************************************************************************/

//Import da dependencia do Prisma que permite a execução de scipt SLQ no BD
const { PrismaClient } = require('../../generated/prisma')

//Cria um novo objeto baseado na classe do PrismaClient
const prisma = new PrismaClient()

// Retorna uma lista de todos os filmes e nacionalidades do banco de dados
const getSelectAllActorsNationality = async function () {
    try {
        //Script SQL
        let sql = `select * from tbl_ator_nacionalidade order by id desc`

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

//Retorna uma lista de nacionalidades filtrando pelo id
const getSelectByIdActorsNationality = async function (id) {
    try {
        let sql = `select * from tbl_ator_nacionalidade where id=${id}`

        let result = await prisma.$queryRawUnsafe(sql)

        if (Array.isArray(result))
            return result
        else
            return false

    } catch (error) {
        return false
    }
}

// //Retorna uma lista de generos filtrando pelo id do filme
const getSelectActorsNationalityByIdAtor = async function (id_ator) {
    try {
        let sql = `select * from tbl_ator_nacionalidade where id_ator =${id_ator}`

        let result = await prisma.$queryRawUnsafe(sql)

        if (Array.isArray(result))
            return result
        else
            return false

    } catch (error) {
        return false
    }
}

// //Retorna uma lista de generos filtrando pelo id do filme
const getSelectNationalityByIdActor = async function (id_ator) {
    try {
        let sql = `select tbl_nacionalidade.id, tbl_nacionalidade.nome
		                from tbl_ator 
			                inner join tbl_ator_nacionalidade
			                on tbl_ator.id = tbl_ator_nacionalidade.id_ator
			                inner join tbl_nacionalidade
			                on tbl_nacionalidade.id = tbl_ator_nacionalidade.id_nacionalidade
		                where tbl_ator.id = ${id_ator};`

        let result = await prisma.$queryRawUnsafe(sql)

        if (Array.isArray(result))
            return result
        else
            return false

    } catch (error) {
        return false
    }
}

// //Retorna uma lista de atores filtrando pelo id da nacionalidade
const getSelectActorByIdNationality = async function (id_nacionalidade) {
    try {
        let sql = `select tbl_ator.id, tbl_ator.nome
                        from tbl_ator 
                                inner join tbl_ator_nacionalidade
                                on tbl_ator.id = tbl_ator_nacionalidade.id_ator
                                inner join tbl_nacionalidade
                                on tbl_nacionalidade.id = tbl_ator_nacionalidade.id_nacionalidade
                        where tbl_nacionalidade.id = ${id_nacionalidade}`

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
        let sql = `select id from tbl_ator_nacionalidade order by id desc limit 1`

        let result = await prisma.$queryRawUnsafe(sql)

        if (Array.isArray(result))
            return Number(result[0].id)
        else
            return false

    } catch (error) {
        return false
    }
}

const setInsertActorNationality = async function (atorNacionalidade) {
    try {
        let sql = `INSERT INTO tbl_ator_nacionalidade (id_ator, id_nacionalidade) 
                    VALUES (${atorNacionalidade.id_ator}, ${atorNacionalidade.id_nacionalidade});`

        let result = await prisma.$executeRawUnsafe(sql)

        if (result)
            return true
        else
            return false

    } catch (error) {
        return false
    }
}

const setUpdateActorNationality = async function (atorNacionalidade) {
    try {
        let sql = `UPDATE tbl_filme_genero SET
                        id_ator    =   ${atorNacionalidade.id_ator},
                        id_nacionalidade   =   ${atorNacionalidade.id_nacionalidade}
                    WHERE id = ${atorNacionalidade.id};`

        let result = await prisma.$executeRawUnsafe(sql)

        if (result)
            return true
        else
            return false
        
    } catch (error) {
        return false
    }
}

const setDeleteActorNationality = async function (id) {
    try {
        let sql = `DELETE FROM tbl_ator_nacionalidade WHERE id = ${id};`

        let result = await prisma.$executeRawUnsafe(sql)

        if (result)
            return true
        else
            return false
        
    } catch (error) {
        return false
    }
}

const setDeleteActorNationalityByIdActor = async function (id_ator) {
    try {
        let sql = `DELETE FROM tbl_ator_nacionalidade WHERE id_ator = ${id_ator};`

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
    getSelectAllActorsNationality,
    getSelectByIdActorsNationality,
    getSelectActorsNationalityByIdAtor,
    getSelectNationalityByIdActor,
    getSelectActorByIdNationality,
    getSelectLastId,
    setInsertActorNationality,
    setUpdateActorNationality,
    setDeleteActorNationality,
    setDeleteActorNationalityByIdActor
}