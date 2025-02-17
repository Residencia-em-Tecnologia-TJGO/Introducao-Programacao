const { ContatoEmergencia: ContatoEmergenciaModel } = require("../models/ContatoEmergencia");
const UsuarioManager = require("./UsuarioManager");
const ErrorEnum = require("../enums/ErrorEnum");
const SuccessEnum = require("../enums/SuccessEnum");

const ContatoEmergenciaManager = {
    createContatoEmergencia: async (reqData) => {
        if(!UsingContatoEmergencia.checkRequiredFields(reqData)) {
            throw new Error(ErrorEnum.MISSING_FIELDS);
        }
        await UsuarioManager.validarUsuario(reqData.usuario.id, reqData.usuario.token)
            .catch((err) => {
                throw new Error(err.message);
            });
        
        const contatoEmergencia = new ContatoEmergenciaModel(reqData);
        await contatoEmergencia.save()
            .catch((err) => {
                throw new Error(err.message);
            });
        return SuccessEnum.CREATED_CONTATO_EMERGENCIA
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