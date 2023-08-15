const { Schema, model } = require('mongoose')

const CartSchema = new Schema({
  idUsuario: {
    type: String
  },
  products:[]
})

CartSchema.methods.toJSON = function () {
  const { __v, ...cart } = this.toObject()
  return cart
}

const CartModel = model('carts', CartSchema)
module.exports = CartModel
