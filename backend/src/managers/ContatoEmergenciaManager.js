const { ContatoEmergencia: ContatoEmergenciaModel } = require("../models/ContatoEmergencia");
const UsuarioManager = require("./UsuarioManager");
const ErrorEnum = require("../enums/ErrorEnum");
const SuccessEnum = require("../enums/SuccessEnum");
const { get } = require("mongoose");

const ContatoEmergenciaManager = {
    createContatoEmergencia: async (reqData) => {
        if(!UsingContatoEmergencia.checkRequiredFields(reqData)) {
            throw new Error(ErrorEnum.MISSING_FIELDS);
        }
        await UsuarioManager.validarUsuario(reqData.usuario.id, reqData.usuario.token)
            .catch((err) => {
                throw new Error(err.message);
            });
        const contatoObject = {
            nome: reqData.contato.nome,
            telefone: reqData.contato.telefone,
            usuario: reqData.usuario.id,
            email: reqData.contato.email || null,
        }
        const contatoEmergencia = new ContatoEmergenciaModel(contatoObject);
        await contatoEmergencia.save()
            .catch((err) => {
                throw new Error(err.message);
            });
        return SuccessEnum.CREATED_CONTATO_EMERGENCIA
    },
    getContatosEmergenciaPorUsuario: async (reqData) => {
        if(!reqData || !reqData.id || !reqData.token) {
            throw new Error(ErrorEnum.MISSING_FIELDS);
        }
        await UsuarioManager.validarUsuario(reqData.id, reqData.token)
            .catch((err) => {
                throw new Error(err.message);
            });
        const contatos = await ContatoEmergenciaModel.find({usuario: reqData.id})
            .catch((err) => {
                throw new Error(err.message);
            });
        return contatos;
    },
}

const UsingContatoEmergencia = {
    checkRequiredFields: (reqData) => {
        if(!reqData) {
            return false;
        }
        if(!reqData.usuario.id || !reqData.usuario.token || !reqData.contato.nome || !reqData.contato.telefone) {
            return false
        }
        return true;
    },
}

const ContatoEmergenciaResponse = {

}

module.exports = ContatoEmergenciaManager;