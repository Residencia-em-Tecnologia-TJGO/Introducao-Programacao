const mongoose = require('mongoose')

const { Schema } = mongoose

const usuarioSchema = new Schema({
    nome: {
        type: String,
        maxlength: 100,
        required: true,
    },
    cpf: {
        type: String,
        unique: true,
        maxlength: 100
    },
    senha:{
        type: String,
        required: true,
        maxlength: 100,
    },
    telefone:{
        type: String,
        maxlength: 15,
        unique: true,
    },
    email:{
        type: String,
        required: true,
        unique: true,
        maxlength: 60,
    },
},
)
usuarioSchema.index({ cpf: 1 }, { unique: true });
usuarioSchema.index({ email: 1 }, { unique: true });
usuarioSchema.index({ telefone: 1 }, { unique: true });

const Usuario = mongoose.model('Usuario', usuarioSchema)

module.exports = {
    Usuario,
    usuarioSchema,
}