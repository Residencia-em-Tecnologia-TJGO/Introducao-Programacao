const mongoose = require('mongoose')

const { Schema } = mongoose

const acaoSchema = new Schema({
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true,
    },
    contatoEmergencia: {
        type: Schema.Types.ObjectId,
        ref: 'ContatoEmergencia',
        required: true,
    },
    tipo_acao:{
        type: String,
        required: true,
    },
    mensagem:{
        type: String,
        maxlength: 200,
    },
    localizacao: {
        type: String,
        maxlength: 200,
    }
},
)

const Acao = mongoose.model('Acao', acaoSchema)

module.exports = {
    Acao,
    acaoSchema,
}