const Joi = require('@hapi/joi')

// ! Validate User Registration
const registrationValidation = (data) => {
  const schema = Joi.object({
    name: Joi.string().min(6).required(),
    email: Joi.string().min(6).required().email(),
    password: Joi.string().min(6).required()
  })

  return schema.validate(data)
}

// ! Validate User Login
const loginValidation = (data) => {
  const schema = Joi.object({
    email: Joi.string().min(6).required().email(),
    password: Joi.string().min(6).required()
  })

  return schema.validate(data)
}

// ! Validate Student Creation
const studentCreationValidation = (data) => {
  const schema = Joi.object({
    name: Joi.string().min(6).required(),
    email: Joi.string().min(6).required().email()
  })

  return schema.validate(data)
}

// ! Users
module.exports.registrationValidation = registrationValidation
module.exports.loginValidation = loginValidation

// ! Students
module.exports.studentCreationValidation = studentCreationValidation
