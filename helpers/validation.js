const Joi = require('@hapi/joi')

// ! Validate Registration
const registrationValidation = (data) => {
  const schema = Joi.object({
    name: Joi.string().min(6).required(),
    email: Joi.string().min(6).required().email(),
    password: Joi.string().min(6).required()
  })

  return schema.validate(data)
}

// ! Validate Login
const loginValidation = (data) => {
  const schema = Joi.object({
    email: Joi.string().min(6).required().email(),
    password: Joi.string().min(6).required()
  })

  return schema.validate(data)
}

module.exports.registrationValidation = registrationValidation
module.exports.loginValidation = loginValidation
