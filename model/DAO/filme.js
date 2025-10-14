/******************************************************************************************
 * Objetivo: Arquivo responsavel pelo CRUD de dados no Mysql referente ao filme
 * Data: 01/10/2025
 * Autor: Guilherme Moreira
 * Versão: 1.0
******************************************************************************************/
/*
    Exemplos de dependencias para conexão com o BD
    Bancos de Dados Relacionais
        Sequelize  -> Foi utilizado em muitos projetos desde o inico do node
        Prisma     -> É uma dependencia atual que trabalha com BD (MySQL PostgreSQL, SQL Server) (SQL ou ORM)
            npm install prisma --save           -> Instalar o prisma (conexão com o database)
            npm install @prisma/client --save   -> Instalar o cliente do prisma (Executar scripts SQL no BD)
            npm prisma init                     -> Prompt de comando para inicializar o prisma no projeto
            npx prisma migrate dev              -> Realiza o sincronsmo entre o prisma e o BD (CUIDADO,
                                                    nesse processo você poderá perder dados reais do BD, pois,
                                                    ele pega e cria as tabelas programadas no ORM schema.prisma)
            npx prisma generate                 -> apenas realiza o sincronismo entre o prisma e o BD, geralmente
                                                    usamos para rodas o projeto em um PC novo

        Knex       -> É uma dependencia atual que trabalja com MySQL

    Banco de Dados Não Relacional
        Mongoose   -> É uma dependencia para o Mongo DB (Não Relacional)
*/

//Import da dependencia do Prisma que permite a execução de scipt SLQ no BD
const { PrismaClient } = require('../../generated/prisma')

//Cria um novo objeto baseado na classe do PrismaClient
const prisma = new PrismaClient()

// $queryRawUnsafe() -> permite executar um script SQL 
// de uma variavel e que retorna valores do banco (SELECT)

// $executeRawUnsafe() -> permite executar um script SQL 
// de uma variavel e que não retorna dados do banco (INSERT, UPDATE E DELETE)

// $queryRaw() -> permite executar um script SQL 
// SEM estar de uma variavel e que retorna valores do banco (SELECT)
// faz tratamentos de segurança contra SQL Injection

// $executeRaw() -> permite executar um script SQL 
// SEM estar de uma variavel e que não retorna dados do banco (INSERT, UPDATE E DELETE)
// faz tratamentos de segurança contra SQL Injection


//Retorna uma lista de todos os filmes do banco de dados
const getSelectAllMovies = async function () {
    try {
        //Script SQL
        let sql = `select * from tbl_filme order by id desc`

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

//Retorna um filme filtrando pelo ID do banco de dados
const getSelectByIdMovies = async function (id) {
    try {
        //Script SQL
        let sql = `select * from tbl_filme where id=${id}`

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

// Insere um filme novo no banco de dados
const setInsertMovies = async function (filme) {
    try {
        let sql = `INSERT INTO tbl_filme (nome,sinopse,data_lancamento,duracao,orcamento,trailer,capa)
			            VALUES  ('${filme.nome}',
			                    '${filme.sinopse}',
			                    '${filme.data_lancamento}',
			                    '${filme.duracao}',
			                    '${filme.orcamento}',
			                    '${filme.trailer}',
		        	            '${filme.capa}')`

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

//Altera um filme no banco de dados
const setUpdateMovies = async function (id) {
}

//Exclui um filme pelo ID no banco de dados
const setDeleteMovies = async function (id) {
}

module.exports = {
    getSelectAllMovies,
    getSelectByIdMovies,
    setInsertMovies
}