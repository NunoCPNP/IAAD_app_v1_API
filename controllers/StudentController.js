const { studentCreationValidation } = require('../helpers/validation')

const sendEmail = require('../helpers/sendMail')

const Student = require('../model/Student')

module.exports = {
  // ! CREATE STUDENT
  async create (request, response) {
    // ! CHECK VALIDATION
    const { error } = studentCreationValidation(request.body)
    if (error) return response.status(400).send(error.details[0].message)

    // ! CHECK IF EMAIL ALREADY EXISTS
    const emailExist = await Student.findOne({ email: request.body.email })
    if (emailExist) return response.status(400).send('Email already exists')

    // ! CREATE STUDENT
    const student = new Student({
      name: request.body.name,
      email: request.body.email,
      startDate: Date.now(),
      modulesData: [{
        module: 2,
        startDate: Date.now()
      }]
    })

    try {
      const savedStudent = await student.save()
      response.status(201).send({
        status: 'success',
        data: savedStudent
      })
    } catch (error) {
      response.status(400).send(error)
    }
  },

  //! GET STUDENT
  async show (request, response) {
    try {
      const student = await Student.findById(request.params.id)

      response.status(200).send({
        status: 'success',
        data: student
      })
    } catch (error) {
      response.status(404).send({
        status: 'No student found with that ID',
        error: error
      })
    }
  },

  // ! UPDATE STUDENT
  async update (request, response) {
    try {
      const student = await Student.findByIdAndUpdate(request.params.id, request.body, {
        new: true
      })

      response.status(201).send({
        status: 'success',
        data: student
      })
    } catch (error) {
      response.status(404).send({
        status: 'No student found with that ID',
        error: error
      })
    }
  },

  // ! PASS STUDENT
  async pass (request, response) {
    try {
      const student = await Student.findById(request.params.id)

      if (student.modulesData.length < 8) {
        student.modulesData[student.modulesData.length - 1].endDate = Date.now()

        const newModule = {
          module: student.modulesData.length + 2,
          startDate: Date.now()
        }

        student.modulesData.push(newModule)

        const updatedStudent = await Student.findByIdAndUpdate(request.params.id, student, {
          new: true
        })

        response.status(201).send({
          status: 'success',
          data: updatedStudent
        })
      } else {
        response.status(400).send({
          status: 'Student is already on module 9'
        })
      }
    } catch (error) {
      response.status(404).send({
        status: 'No student found with that ID',
        error: error
      })
    }
  },

  // ! LIST ALL STUDENTS
  async list (request, response) {
    const students = await Student.find()

    response.status(200).send({
      status: 'success',
      results: students.length,
      data: students
    })
  }
}
