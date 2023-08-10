const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
  nombre: String,
  usuario: {
    type: String,
    unique: true,
    require: true
  },
  contrasenia: String,
  token: {
    type: String,
    default: ''
  },
  role: {
    type: String,
    default: 'user'
  },
  idCart:{
    type: String
  }
})

UserSchema.methods.toJSON = function () {
  const { __v, contrasenia, ...usuario } = this.toObject()
  return usuario
}

const UserModel = mongoose.model('users', UserSchema);

module.exports = UserModel
