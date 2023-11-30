const mongoose = require('mongoose')

const Schema = mongoose.Schema

const userSchema = new Schema({
  nome: {
    type: String,
    required: true
  },
  email: {
    type: String ,
    required: true,
    unique: true,
  },
  senha: {
    type: String,
    required: true
  },
  telefones: {
    type: [],
    required: true
  }
}, { timestamps: true })

module.exports = mongoose.model('User', userSchema)