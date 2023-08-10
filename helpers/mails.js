const transporter = require("../middleware/nodemailer");

const sendMailerRegister = async (emailUser) => {
  await transporter.sendMail({
    from: '"Bienvenido 👻" <proferc23@gmail.com>', // sender address
    to: emailUser, // list of receivers
    subject: 'Bienvenido', // Subject line
    html: `
    <div>
      <h2>Bienvenido a nuestra tienda</h2>
      <img src="https://nextius.com/portafolio/public/storage/post/1619025676.png" alt="" width="250">
    </div>
    `, // html body
  });
}

const sendMailerPay = async (emailUser) => {
  await transporter.sendMail({
    from: '"Bienvenido 👻" <proferc23@gmail.com>', // sender address
    to: emailUser, // list of receivers
    subject: 'Compra realizada con exito', // Subject line
    html: `
    <div>
      <h2>Gracias por su compra</h2>
      <img src="https://www.solbyte.com/blog/wp-content/uploads/tienda-online-1.jpg" alt="" width="250">
    </div>
    `, // html body
  });
}

module.exports = {
  sendMailerRegister,
  sendMailerPay
}
