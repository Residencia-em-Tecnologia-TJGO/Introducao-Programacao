const { Acao: AcaoModel } = require("../models/Acao");
const ErrorEnum = require("../enums/ErrorEnum");
const Utils = require("../utils");
const UsuarioManager = require("./UsuarioManager");
const SuccessEnum = require("../enums/SuccessEnum");

const AcaoManager = {
    create_acao: async (reqData) => {
        if(!UsingAcao.checkRequiredFields(reqData)) {
            throw new Error(ErrorEnum.MISSING_FIELDS);
        }
        await UsuarioManager.validarUsuario(reqData.usuario.id, reqData.usuario.token)
            .catch((err) => {
                throw new Error(err.message);
            });
        const acaoObject = {
            tipo_acao: reqData.tipo_acao,
            contatoEmergencia: reqData.contatoEmergencia || null,
            usuario: reqData.usuario.id,
            mensagem: reqData.mensagem || null,
        }
        const acao = new AcaoModel(acaoObject);
        await acao.save()
            .catch((err) => {
                throw new Error(err.message);
            });
        return SuccessEnum.CREATED_ACAO;
    }
}

const UsingAcao = {
    checkRequiredFields: (reqData) => {
        if(!reqData || !reqData.tipo_acao || !reqData.contatoEmergencia || !reqData.usuario) {
            return false;
        }
        return true;
    }
}

module.exports = AcaoManager;