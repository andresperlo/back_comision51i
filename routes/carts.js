const { Router } = require('express')
const { getOneCartAllProduct, addProductCart, createCart } = require('../controllers/carts')
const auth = require('../middleware/auth')
const router = Router()

router.get('/:id', auth('user'), getOneCartAllProduct)
router.post('/:idCart/:idProd', auth('user'), addProductCart)
router.post('/', createCart)

module.exports = router
