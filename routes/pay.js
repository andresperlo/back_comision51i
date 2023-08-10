const { Router } = require('express')
const { createPay, responseSuccess, responsePending, responseFailure } = require('../controllers/pay')
const auth = require('../middleware/auth')
const router = Router()

router.post('/', auth('user'), createPay)
router.get('/success', responseSuccess)
router.get('/pending', responsePending)
router.get('/failure', responseFailure)

module.exports = router
