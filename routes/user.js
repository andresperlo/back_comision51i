const { Router } = require('express')
const router = Router()
const { check } = require('express-validator')

const { getAllUser, createUser,
  updateUser, deleteUser, getOneUser, loginUser, logoutUser } = require('../controllers/user')
const auth = require('../middleware/auth')
/* ENDPOINT */
router.get('/logout', auth('user'), logoutUser)
router.get('/:id',auth(['admin', 'user']), getOneUser)
router.get('/', auth('admin'),getAllUser)
router.post('/', [
  check('nombre', 'El campo nombre esta vacio').notEmpty(),
  check('nombre', 'El minimo es de 3 caracteres').isLength({ min: 3 }),
  check('usuario', 'El campo nombre esta vacio').notEmpty(),
  check('usuario', 'El minimo es de 3 caracteres').isLength({ min: 3 }),
  /*   check('usuario', 'El campo USUARIO debe ser tipo MAIL').isEmail(), */
  check('contrasenia', 'El campo nombre esta vacio').notEmpty(),
  check('contrasenia', 'El minimo es de 8 caracteres').isLength({ min: 8 }),
], createUser)
router.post('/login', [
  check('usuario', 'El campo nombre esta vacio').notEmpty(),
  /*   check('usuario', 'El campo USUARIO debe ser tipo MAIL').isEmail(), */
  check('contrasenia', 'El campo contraseña esta vacio').notEmpty(),
], loginUser)
router.put('/:id', [
  check('id', 'El ID no corresponde a un ID de Mongo').isMongoId()
], auth('admin'),updateUser)
router.delete('/:id', auth('admin'),deleteUser)

module.exports = router
