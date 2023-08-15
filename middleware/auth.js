const jwt = require('jsonwebtoken')
const UserModel = require('../modals/user')

module.exports = (role) => async (req, res, next) => {
  try {
    const token = req.header('authorization').replace('Bearer ', '')
    const verifyToken = jwt.verify(token, process.env.SECRET_KEY)

    const userLogin = await UserModel.findOne({ _id: verifyToken.usuario.id })

    if (userLogin.token && userLogin.role === role) {
      req.userLoginId = userLogin._id
      next()
    } else if (Array.isArray(role) && role.includes(userLogin.role)) {
      req.userLoginId = userLogin._id
      next()
    } else {
      res.status(401).json({ msg: 'No Autorizado' })
    }

  } catch (error) {
    res.status(500).json({ msg: 'Token Invalido' })
  }
}
