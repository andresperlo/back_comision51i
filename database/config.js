const mongoose = require('mongoose')

try {
  mongoose.connect(process.env.MONGO_CONNECT)
  .then(() => console.log('Base de Datos Conectado'))
} catch (error) {
  throw new Error('No se pudo conectar con Mongo', error)
}
