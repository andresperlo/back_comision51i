const express = require('express')
const { check } = require('express-validator')

const router = express.Router()
const { getAllProducts, getOneProduct, createProduct, updateProduct, deleteProduct } = require('../controllers/products')
const auth = require('../middleware/auth')

router.get('/', getAllProducts)
router.get('/:id', getOneProduct)

router.post('/',
  [
    check('nombre', 'campo NOMBRE vacio').notEmpty(),
    check('precio', 'campo PRECIO vacio').notEmpty(),
    check('codigo', 'campo CODIGO vacio').notEmpty(),

  ], auth('admin'), createProduct)
router.put('/:id', [
  check('nombre', 'campo NOMBRE vacio').notEmpty(),
  check('precio', 'campo PRECIO vacio').notEmpty(),
  check('codigo', 'campo CODIGO vacio').notEmpty(),
], auth('admin'), updateProduct)
router.delete('/:id', auth('admin'), deleteProduct)

module.exports = router
