const { Usuario: UsuarioModel } = require("../models/Usuario");
const ErrorEnum = require("../enums/ErrorEnum");
const Utils = require("../utils");

const UsuarioManager = {
    createUsuario: async (usuario) => {
        // funcoes de validaçao de campos e identificaçao de erros na criaçao de usuario
        if(!UsingUsuario.checkRequiredFields(usuario)) {
            throw new Error(ErrorEnum.MISSING_FIELDS);
        }
        await UsingUsuario.checkFieldsLength(usuario).catch((e) => {
            throw new Error(e.message);
        });
        await Utils.validaCPF(usuario.cpf).catch((e) => {
            throw new Error(e.message);
        });
        await Utils.validaEmail(usuario.email).catch((e) => {
            throw new Error(e.message);
        });
        await Utils.encryptPassword(usuario.senha).then((hashedPassword) => {
            usuario.senha = hashedPassword;
        });
        const novoUsuario = new UsuarioModel(usuario);
        await novoUsuario.save().catch((e) => {
            // executa esse bloco caso o email, cpf ou telefone ja existam no banco de dados
            const validationErrorMsg = Utils.getValidationErrorMessage(e);
            throw new Error(ErrorEnum.EXISTING_USER + ` [${validationErrorMsg}]`);
        })
        return UsuarioResponse.createUsuarioResponse(novoUsuario);
    },
    loginUsuario: async (usuarioData) => {
        if(!usuarioData.cpf || !usuarioData.senha ) throw new Error(ErrorEnum.MISSING_FIELDS);
        const usuario = await UsuarioModel.findOne({ cpf: usuarioData.cpf })
        if(!usuario) throw new Error(ErrorEnum.USER_NOT_FOUND);
        if(!await Utils.comparePassword(usuarioData.senha, usuario.senha)) {
            throw new Error(ErrorEnum.INVALID_CREDENTIALS   );
        }
        return UsuarioResponse.createUsuarioResponse(usuario);
    }
}

const UsingUsuario = {
    checkRequiredFields: (usuario) => {
        if(!usuario) {
            return false;
        }
        if(!usuario.nome || !usuario.email || !usuario.senha || !usuario.telefone || !usuario.cpf) {
            return false
        }
        return true;
    },
    checkFieldsLength: async (usuario) => {
        // Verifica se o nome tem mais de 3 caracteres
        if(usuario.nome.length < 3) {
            throw new Error(ErrorEnum.NAME_LENGTH);
        }
        // Verifica se a senha tem mais de 6 caracteres
        if(usuario.senha.length < 6) {
            throw new Error(ErrorEnum.PASSWORD_LENGTH);
        }
        // Verifica se o telefone tem 11 caracteres
        if(usuario.telefone.length < 11) {
            throw new Error(ErrorEnum.PHONE_LENGTH);
        }
    }
}

const UsuarioResponse = {
    createUsuarioResponse: (usuario) => {
        return {
            id: usuario._id,
            nome: usuario.nome,
            email: usuario.email,
            telefone: usuario.telefone,
            cpf: usuario.cpf,
            token: usuario.senha[0] + usuario.senha[1]
        }
    }
}

module.exports = UsuarioManager;