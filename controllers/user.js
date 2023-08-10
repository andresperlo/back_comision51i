const UserModel = require('../modals/user')
const bcrypt = require('bcryptjs')
const { validationResult } = require('express-validator')
const jwt = require('jsonwebtoken')
const CartModel = require('../modals/cart')
const { sendMailerRegister } = require('../helpers/mails')

const getAllUser = async (req, res) => {
  const allUsers = await UserModel.find()
  res.status(200).json({ msg: 'Se envian todos los usuarios', allUsers })
}

const getOneUser = async (req, res) => {
  const getUser = await UserModel.findOne({ _id: req.params.id })
  res.json({ msg: 'Usuario encontrado', getUser })
}

const createUser = async (req, res) => {
  console.log(req.body)

  try {

    const errors = validationResult(req)

    if (!errors.isEmpty()) {
      return res.status(422).json({ msg: errors.array() })
    }

    const body = req.body
    const userExist = await UserModel.findOne({ usuario: body.usuario })

    if (userExist) {
      return res.status(400).json({ msg: 'El usuario ya existe' })
    }

    const salt = await bcrypt.genSaltSync()
    body.contrasenia = await bcrypt.hash(body.contrasenia, salt)

    const user = new UserModel(body);
    const cart = new CartModel()

    cart.idUsuario = user._id
    user.idCart = cart._id

/*     await sendMailerRegister(req.body.email) */

    await user.save()
    await cart.save()

    res.status(201).json({ msg: 'Usuario Creado con exito', user, status: 201 })
  } catch (error) {
    console.log(error)
  }
}

const updateUser = async (req, res) => {
  try {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
      return res.status(422).json({ msg: errors.array() })
    }

    const updateUser = await UserModel.findByIdAndUpdate({ _id: req.params.id }, req.body, { new: true })
    res.status(200).json({ msg: 'Usuario Actualizado Correctamente', updateUser, status:200 })
  } catch (error) {
    console.log(error)
  }
}

const deleteUser = async (req, res) => {
  await UserModel.findByIdAndDelete({ _id: req.params.id })
  res.json({ msg: 'Se borro correctamente el usuario' })
}

/* Termina el CRUD o el ABM de USUARIO */

const loginUser = async (req, res) => {
  try {

    const errors = validationResult(req)

    if (!errors.isEmpty()) {
      res.status(422).json({ msg: errors.array() })
    }

    const { usuario, contrasenia } = req.body
    const userExists = await UserModel.findOne({ usuario })

    if (!userExists) {
      return res.status(400).json({ msg: 'El usuario no existe' })
    }

    const passCheck = await bcrypt.compare(contrasenia, userExists.contrasenia)

    if (passCheck) {
      const jwtPayload = {
        usuario: {
          id: userExists._id,
          username: userExists.usuario
        }
      }
      const token = jwt.sign(jwtPayload, process.env.SECRET_KEY)
      userExists.token = token
      const userUpdate = await UserModel.findByIdAndUpdate({ _id: userExists._id }, userExists, { new: true })
      res.status(200).json({ msg: 'Usuario Logueado', userUpdate })

    } else {
      res.status(422).json({ msg: 'Usuario y/o contraseña incorrecto' })
    }

  } catch (error) {
    console.log(error)
  }
}

const logoutUser = async (req, res) => {
  const userId = await UserModel.findOne({ _id: req.userLoginId })
  console.log(userId)

  userId.token = ''
  const userLogout = await UserModel.findByIdAndUpdate({ _id: req.userLoginId }, userId, { new: true })
  console.log(userLogout)
  res.status(200).json({ msg: 'Usuario Desloguado' })
}

module.exports = {
  getAllUser,
  getOneUser,
  createUser,
  updateUser,
  deleteUser,
  loginUser,
  logoutUser
}
