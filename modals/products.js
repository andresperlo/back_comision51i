const { Schema, model } = require('mongoose')

const ProductSchema = new Schema({
  nombre: {
    type: String,
    required: true,
  },
  precio: {
    type: Number,
    required: true
  },
  codigo: {
    type: String,
    required: true
  },
  cantidad:{
    type:Number,
    default: 0
  }
})

ProductSchema.methods.toJSON = function () {
  const { __v, ...product } = this.toObject()
  return product
}

const ProductModel = model('products', ProductSchema)
module.exports = ProductModel
