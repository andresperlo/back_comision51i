const ProductModel = require("../modals/products")
const { validationResult } = require('express-validator')

const getAllProducts = async (req, res) => { /* req - request, res - resolve */
  try {
    const getAllProd = await ProductModel.find()
    res.status(200).json({ msg: 'Se envian productos', getAllProd })
  } catch (error) {
    throw new Error('No se encontro el producto')
  }
}

const getOneProduct = async (req, res) => { /* req - request, res - resolve */
  try {
    const getOneProd = await ProductModel.findOne({ _id: req.params.id })
    res.status(200).json({ msg: 'Producto encontrado', getOneProd })
  } catch (error) {
    res.status(500).json(error)
  }
}

const createProduct = async (req, res) => { /* req - request, res - resolve */
  try {

    const errors = validationResult(req)

    if (!errors.isEmpty()) {
      return res.status(422).json({ msg: errors.array() })
    }

    const newProd = new ProductModel(req.body)
    await newProd.save()
    res.status(201).json({ msg: 'Se creo el producto correctamente', newProd, status: 201  })
  } catch (error) {
    res.status(500).json(error)
  }
}

const updateProduct = async (req, res) => { /* req - request, res - resolve */
  try {

    const errors = validationResult(req)

    if (!errors.isEmpty()) {
      return res.status(422).json({ msg: errors.array() })
    }

    const updateProd = await ProductModel.findByIdAndUpdate({ _id: req.params.id }, req.body, { new: true })
    res.status(200).json({ msg: 'Producto actualizado correctamente', updateProd })
  } catch (error) {
    res.status(500).json(error)
  }
}

const deleteProduct = async (req, res) => { /* req - request, res - resolve */
  try {
    await ProductModel.findByIdAndDelete({ _id: req.params.id })
    res.status(200).json({ msg: 'Producto eliminado correctamentes', status:200 })
  } catch (error) {
    res.status(500).json(error)
  }
}

module.exports = {
  getAllProducts,
  getOneProduct,
  createProduct,
  updateProduct,
  deleteProduct
}
