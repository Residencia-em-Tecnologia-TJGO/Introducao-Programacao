const bcrypt = require("bcrypt");
const ErrorEnum = require("./enums/ErrorEnum");

const Utils = {
    // função pra verificar se o CPF é valido
    validaCPF: async (cpf) => {
        // Remove caracteres não numéricos
        const cpfClean = cpf.replace(/[^\d]/g, '');
        if (cpfClean.length !== 11) throw new Error(ErrorEnum.CPF_INVALID);
        const calcDigit = (cpf, factor) => {
            let total = 0;
            for (let i = 0; i < factor - 1; i++) {
                total += cpf[i] * (factor - i);
            }
            const remainder = (total * 10) % 11;
            return remainder === 10 ? 0 : remainder;
        };
        const digit1 = calcDigit(cpfClean, 10);
        if (digit1 !== parseInt(cpfClean[9])) throw new Error(ErrorEnum.CPF_INVALID);
        const digit2 = calcDigit(cpfClean, 11);
        if (digit2 !== parseInt(cpfClean[10])) throw new Error(ErrorEnum.CPF_INVALID);
        return true;
    },
    encryptPassword: async (password) => {
        // essa função serve para encriptar a senha do usuário
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        return hashedPassword
    },
    removeNotNumberChar: (string) => {
        // essa função serve para remover caracteres não numéricos
        return string.replace(/[^\d]/g, '').trim();
    },
    comparePassword: async (password, hashedPassword) => {
        // essa função serve para comparar a senha do usuário com a senha encriptada
        return await bcrypt.compare(password, hashedPassword);
    },
    validaEmail: async (email) => {
        // essa função serve para verificar se o email é valido
        const emailRegex = /\S+@\S+\.\S+/;
        if (!emailRegex.test(email)) throw new Error(ErrorEnum.EMAIL_INVALID);
        return true;
    },
    getValidationErrorMessage: (error) => {
        // Captura a parte que contém o campo com erro (ex.: "cpf dup key")
        const errorMessage = error.message.split(': ')[2];
        
        // Remove qualquer sufixo de índice (_1, _2, etc.) e a parte "dup key"
        const cleanMessage = errorMessage.replace(/(_\d+)? dup key/g, '').trim();
    
        // Separa os campos restantes e devolve apenas os nomes dos campos
        return cleanMessage.split(',').map((msg) => msg.split(':')[0]).join(', ').trim();
    },
    formatDate: (date) => {
        // uma função que formata a data para dd/mm/aaaa hh:mm e ajuste o horario para o horario de brasilia
        const options = { timeZone: 'America/Sao_Paulo', hour12: false };
        return new Date(date).toLocaleString('pt-BR', options);
    }
}

module.exports = Utils;