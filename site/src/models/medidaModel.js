var database = require("../database/config");

function buscarUltimasMedidas() {

    instrucaoSql = ''

    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucaoSql = `SELECT count(preferido) humano, (SELECT sum(qtdMortes) FROM inimigo WHERE preferido = 'humano') mortesHumano, 
        (SELECT count(preferido) corredor FROM inimigo WHERE preferido = 'corredor') corredor, (SELECT sum(qtdMortes) FROM inimigo WHERE preferido = 'corredor') mortesCorredor,
            (SELECT count(preferido) perseguidor FROM inimigo WHERE preferido = 'perseguidor') perseguidor, (SELECT sum(qtdMortes) FROM inimigo WHERE preferido = 'perseguidor') mortesPerseguidor,
            (SELECT count(preferido) estalador FROM inimigo WHERE preferido = 'estalador') estalador, (SELECT sum(qtdMortes) FROM inimigo WHERE preferido = 'estalador') mortesEstalador,
            (SELECT count(preferido) verme FROM inimigo WHERE preferido = 'verme') verme, (SELECT sum(qtdMortes) FROM inimigo WHERE preferido = 'verme') mortesVerme
            FROM inimigo WHERE preferido = 'humano';
    `;
    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucaoSql = `SELECT count(preferido) humano, (SELECT sum(qtdMortes) FROM inimigo WHERE preferido = 'humano') mortesHumano, 
        (SELECT count(preferido) corredor FROM inimigo WHERE preferido = 'corredor') corredor, (SELECT sum(qtdMortes) FROM inimigo WHERE preferido = 'corredor') mortesCorredor,
            (SELECT count(preferido) perseguidor FROM inimigo WHERE preferido = 'perseguidor') perseguidor, (SELECT sum(qtdMortes) FROM inimigo WHERE preferido = 'perseguidor') mortesPerseguidor,
            (SELECT count(preferido) estalador FROM inimigo WHERE preferido = 'estalador') estalador, (SELECT sum(qtdMortes) FROM inimigo WHERE preferido = 'estalador') mortesEstalador,
            (SELECT count(preferido) verme FROM inimigo WHERE preferido = 'verme') verme, (SELECT sum(qtdMortes) FROM inimigo WHERE preferido = 'verme') mortesVerme
            FROM inimigo WHERE preferido = 'humano';
    `;
    } else {
        console.log("\nO AMBIENTE (produ????o OU desenvolvimento) N??O FOI DEFINIDO EM app.js\n");
        return
    }

    console.log("Executando a instru????o SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}



module.exports = {
    buscarUltimasMedidas,
}
