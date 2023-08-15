const mercadopago = require('mercadopago')

const createPay = async (req, res) => {
  try {
    mercadopago.configure({
      access_token: process.env.TOKEN_MERCADOPAGO
    });

   const preference = await mercadopago.preferences.create({
      items: [
        {
          title: 'Samsung A50',
          quantity: 1,
          currency_id: 'ARS',
          unit_price: 100.000
        }
      ],
      back_urls: {
        success: 'http://localhost:8080/api/pay/success',
        pending: 'http://localhost:8080/api/pay/pending',
        failure: 'http://localhost:8080/api/pay/failure'
      }
    })
    res.status(200).json({res: preference.body})
  } catch (error) {
    res.status(500).json(error)
  }
}

const responseSuccess = async (req, res) => {
  res.send('success')
}

const responsePending = async (req, res) => {
  res.send('pending')
}

const responseFailure = async (req, res) => {
  res.send('failure')
}

module.exports = {
  createPay,
  responseSuccess,
  responsePending,
  responseFailure
}
