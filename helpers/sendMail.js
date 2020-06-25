const nodemailer = require('nodemailer')

const sendEmail = async options => {
  // ! Transporter
  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD
    }
  })

  // ! Email options
  const mailOptions = {
    from: options.from,
    to: options.to,
    subject: options.subject,
    html: options.message
  }

  // ! Send the email
  await transporter.sendMail(mailOptions)
}

module.exports = sendEmail
