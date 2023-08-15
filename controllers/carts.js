const CartModel = require("../modals/cart")
const ProductModel = require("../modals/products")

const getOneCartAllProduct = async (req, res) => {
  try {
    const getCart = await CartModel.findOne({_id: req.params.id})
    res.status(200).json({msg: 'Carrito encontrado', getCart})
  } catch (error) {
    res.status(500).json(error)
  }
}

const addProductCart = async (req, res) => {
    try {

      const getCart = await CartModel.findOne({_id: req.params.idCart})
      const getProd = await ProductModel.findOne({_id: req.params.idProd})

      const prodExist = getCart.products.filter((prod) => prod._id == req.params.idProd)
      
      if(prodExist.length > 0){
        return res.status(400).json({msg:'Producto ya existente en el carrito', status: 400})
      }

      getCart.products.push(getProd)
      await getCart.save()

      res.status(200).json({msg: 'Producto se cargo correctamente', getCart})
    } catch (error) {
      res.status(500).json(error)
    }
}

const createCart = async (req, res) => {
  try {
    const newCart = new CartModel(req.body)
    await newCart.save()
    res.status(201).json({msg:'Carrito Creado', newCart})
  } catch (error) {
    res.status(500).json(error)
  }
}



module.exports = {
  getOneCartAllProduct,
  addProductCart, 
  createCart
}
