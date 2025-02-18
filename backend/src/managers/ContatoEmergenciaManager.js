const { ContatoEmergencia: ContatoEmergenciaModel } = require("../models/ContatoEmergencia");
const UsuarioManager = require("./UsuarioManager");
const ErrorEnum = require("../enums/ErrorEnum");
const SuccessEnum = require("../enums/SuccessEnum");
const { get } = require("mongoose");
const { Log: LogModel } = require("../models/Log");
const TipoLogEnum = require("../enums/TipoLogEnum");

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
        const log = new LogModel({
            usuario: reqData.usuario.id,
            tipo_log: TipoLogEnum.NOVO_CONTATO,
            contatoEmergencia: contatoEmergencia._id,
        });
        await log.save()
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
    deleteContatoEmergencia: async (reqData) => {
        if(!reqData || !reqData.id || !reqData.token || !reqData.contato_id) {
            throw new Error(ErrorEnum.MISSING_FIELDS);
        }
        await UsuarioManager.validarUsuario(reqData.id, reqData.token)
            .catch((err) => {
                throw new Error(err.message);
            });
        await ContatoEmergenciaModel.deleteOne({_id: reqData.contato_id})
            .catch((err) => {
                throw new Error(err.message);
            });
        return SuccessEnum.DELETED_CONTATO_EMERGENCIA;
    }
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