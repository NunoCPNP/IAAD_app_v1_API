const mongoose = require('mongoose')

const StudentSchema = new mongoose.Schema({
  name: String,
  email: String,
  active: {
    type: Boolean,
    default: true
  },
  startDate: Date,
  endDate: {
    type: Date
  },
  currentModule: {
    type: Number,
    default: 2
  },
  modulesData: [{
    module: Number,
    startDate: Date,
    endDate: Date,
    finalGrade: Number
  }]
})

module.exports = mongoose.model('Student', StudentSchema)
