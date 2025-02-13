const mongoose = require('mongoose');
require('dotenv').config();

async function main () {
    try {
        mongoose.set('strictQuery', true)
        await mongoose.connect(process.env.MONGODB_URL_CONNECTION)
            .then(() => {
                console.log(`\n\n\t🖥️ PROJETO 01 - SAMUEL VICTOR [PRTI-UFG/TJGO] ⌨️
                    \n\n🗓️  ` + new Date().toLocaleString('pt-BR') 
                    + `⏱️\n\n🏦🎲 Conexão com MongoDB estabelecida com Sucesso
                    \n\---------------------------------------------------\n`)
            })

            .catch((error) => {
                console.error('Connection error: ' + error)
            })
    } catch (error) {
        console.error('Erro conn: ' + error)
    }

}

module.exports = main