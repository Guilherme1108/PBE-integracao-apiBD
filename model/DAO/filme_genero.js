/******************************************************************************************
 * Objetivo: Arquivo responsavel pelo CRUD de dados no Mysql referente ao relacionamento entre filme e genero
 * Data: 05/11/2025
 * Autor: Guilherme Moreira
 * Versão: 1.0
******************************************************************************************/

//Import da dependencia do Prisma que permite a execução de scipt SLQ no BD
const { PrismaClient } = require('../../generated/prisma')

//Cria um novo objeto baseado na classe do PrismaClient
const prisma = new PrismaClient()

// Retorna uma lista de todos os filmes e generos do banco de dados
const getSelectAllMoviesGenres = async function () {
    try {
        //Script SQL
        let sql = `select * from tbl_filme_genero order by id desc`

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

//Retorna uma lista de generos filtrando pelo id
const getSelectByIdMoviesGenres = async function (id) {
    try {
        let sql = `select * from tbl_filme_genero where id=${id}`

        let result = await prisma.$queryRawUnsafe(sql)

        if (Array.isArray(result))
            return result
        else
            return false

    } catch (error) {
        return false
    }
}

//Retorna uma lista de generos filtrando pelo id do filme
const getSelectMoviesGenresByIdFilme = async function (id_filme) {
    try {
        let sql = `select * from tbl_filme_genero where id_filme =${id_filme}`

        let result = await prisma.$queryRawUnsafe(sql)

        if (Array.isArray(result))
            return result
        else
            return false

    } catch (error) {
        return false
    }
}

//Retorna uma lista de generos filtrando pelo id do filme
const getSelectGenresByIdMovies = async function (id_filme) {
    try {
        let sql = `select tbl_genero.id, tbl_genero.nome
                        from tbl_filme 
                                inner join tbl_filme_genero
                                on tbl_filme.id = tbl_filme_genero.id_filme
                                inner join tbl_genero
                                on tbl_genero.id = tbl_filme_genero.id_genero
                        where tbl_filme.id = ${id_filme}`

        let result = await prisma.$queryRawUnsafe(sql)

        if (Array.isArray(result))
            return result
        else
            return false

    } catch (error) {
        return false
    }
}

//Retorna uma lista de filmes filtrando pelo id do genero
const getSelectMoviesByIdGenre = async function (id_genero) {
    try {
        let sql = `select tbl_filme.id, tbl_filme.nome
                        from tbl_filme 
                                inner join tbl_filme_genero
                                on tbl_filme.id = tbl_filme_genero.id_filme
                                inner join tbl_genero
                                on tbl_genero.id = tbl_filme_genero.id_genero
                        where tbl_genero.id = ${id_genero}`

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
        let sql = `select id from tbl_filme_genero order by id desc limit 1`

        let result = await prisma.$queryRawUnsafe(sql)

        if (Array.isArray(result))
            return Number(result[0].id)
        else
            return false

    } catch (error) {
        return false
    }
}

const setInsertMoviesGenres = async function (filmeGenero) {
    try {
        let sql = `INSERT INTO tbl_filme_genero (id_filme, id_genero) 
                    VALUES (${filmeGenero.id_filme}, ${filmeGenero.id_genero});`

        let result = await prisma.$executeRawUnsafe(sql)

        if (result)
            return true
        else
            return false

    } catch (error) {
        return false
    }
}

const setUpdateMoviesGenres = async function (filmeGenero) {
    try {
        let sql = `UPDATE tbl_filme_genero SET
                        id_filme    =   ${filmeGenero.id_filme},
                        id_genero   =   ${filmeGenero.id_genero}
                    WHERE id = ${filmeGenero.id};`

        let result = await prisma.$executeRawUnsafe(sql)

        if (result)
            return true
        else
            return false
        
    } catch (error) {
        return false
    }
}

const setDeleteMoviesGenres = async function (id) {
    try {
        let sql = `DELETE FROM tbl_filme_genero WHERE id = ${id};`

        let result = await prisma.$executeRawUnsafe(sql)

        if (result)
            return true
        else
            return false
        
    } catch (error) {
        return false
    }

}
const setDeleteMoviesGenresByIdMovies = async function (id_filme) {
    try {
        let sql = `DELETE FROM tbl_filme_genero WHERE id_filme = ${id_filme};`

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
    getSelectAllMoviesGenres,
    getSelectByIdMoviesGenres,
    getSelectMoviesGenresByIdFilme,
    getSelectGenresByIdMovies,
    getSelectMoviesByIdGenre,
    getSelectLastId,
    setInsertMoviesGenres,
    setUpdateMoviesGenres,
    setDeleteMoviesGenres,
    setDeleteMoviesGenresByIdMovies
}