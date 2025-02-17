const { Acao: AcaoModel } = require("../models/Acao");
const ErrorEnum = require("../enums/ErrorEnum");
const Utils = require("../utils");
const UsuarioManager = require("./UsuarioManager");
const SuccessEnum = require("../enums/SuccessEnum");

const AcaoManager = {
    createAcao: async (reqData) => {
        if(!UsingAcao.checkRequiredFields(reqData)) {
            throw new Error(ErrorEnum.MISSING_FIELDS);
        }
        await UsuarioManager.validarUsuario(reqData.usuario.id, reqData.usuario.token)
            .catch((err) => {
                throw new Error(err.message);
            });
        // REGRA DE NEGÓCIO, MAXIMO DE 3 AÇÕES POR USUÁRIO
        const acaoLength = await AcaoModel.find({usuario: reqData.usuario.id}).countDocuments();
        if(acaoLength >= 3) {
            throw new Error(ErrorEnum.ACAO_LIMIT_REACHED);
        }
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
    },
    executarAcao: async (reqData) => {
        await UsuarioManager.validarUsuario(reqData.usuario.id, reqData.usuario.token)
        .catch((err) => {
            throw new Error(err.message);
        });
        const acao = await AcaoModel.findById(reqData.acao_id)
        if(!acao) {
            throw new Error(ErrorEnum.ACAO_NOT_FOUND);
        }

        await acao.populate("contatoEmergencia")
        const contatoTelefone = Utils.removeNotNumberChar(acao.contatoEmergencia.telefone);

        if(reqData.permitirLoc === true) {
            if(!acao.localizacao){
                acao.localizacao = "latitude:" + reqData.latitude + ", longitude:" + reqData.longitude;
            } else{
                acao.localizacao = "latitude:" + reqData.latitude + ", longitude:" + reqData.longitude;
            }
            await acao.save()
            const latitude = reqData.latitude;
            const longitude = reqData.longitude;
            const mapsLink = `https://www.google.com/maps?q=${latitude},${longitude}`;
            const mensagem = encodeURIComponent(`${acao.tipo_acao} > Minha localização atual: ${mapsLink} - ${acao.mensagem}`);
            const url = `https://api.whatsapp.com/send?phone=55${contatoTelefone}&text=${mensagem}`;
            return {
                message: SuccessEnum.EXECUTED_ACAO,
                open_blank_url: url
            };
        } else {
            const mensagem = encodeURIComponent(acao.mensagem);
            const url = `https://api.whatsapp.com/send?phone=55${contatoTelefone}&text=${mensagem}`;
            return {
                message: SuccessEnum.EXECUTED_ACAO,
                open_blank_url: url
            };
        }
    },
    deleteAcao: async (reqData) => {
        await UsuarioManager.validarUsuario(reqData.usuario.id, reqData.usuario.token)
        .catch((err) => {
            throw new Error(err.message);
        });
        const acao = await AcaoModel.findById(reqData.acao_id);
        if(!acao) {
            throw new Error(ErrorEnum.ACAO_NOT_FOUND);
        }
        await acao.remove();
        return SuccessEnum.DELETED_ACAO;
    },
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