var database = require("../database/config");

function buscarUltimasMedidas() {

    instrucaoSql = ''

    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucaoSql = `SELECT count(preferido) humano, (SELECT count(preferido) corredor FROM inimigo WHERE preferido = 'corredor') corredor,
        (SELECT count(preferido) perseguidor FROM inimigo WHERE preferido = 'perseguidor') perseguidor,
        (SELECT count(preferido) estalador FROM inimigo WHERE preferido = 'estalador') estalador,
        (SELECT count(preferido) verme FROM inimigo WHERE preferido = 'verme') verme
        FROM inimigo WHERE preferido = 'humano';
    `;
    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucaoSql = `SELECT count(preferido) humano, (SELECT count(preferido) corredor FROM inimigo WHERE preferido = 'corredor') corredor,
        (SELECT count(preferido) perseguidor FROM inimigo WHERE preferido = 'perseguidor') perseguidor,
        (SELECT count(preferido) estalador FROM inimigo WHERE preferido = 'estalador') estalador,
        (SELECT count(preferido) verme FROM inimigo WHERE preferido = 'verme') verme
        FROM inimigo WHERE preferido = 'humano';
    `;
    } else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return
    }

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}



module.exports = {
    buscarUltimasMedidas,
}
