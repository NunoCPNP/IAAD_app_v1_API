const cors = require('cors')
const dotenv = require('dotenv')
const express = require('express')
const helmet = require('helmet')
const morgan = require('morgan')

const connectDB = require('./config/mongodb')

// ! Environment Variables
dotenv.config({ path: './config/config.env' })

// ! Connect to MongoDB
connectDB()

const app = express()

// ! Logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}

// !  Middlewares
app.use(express.json())
app.use(helmet())

if (process.env.NODE_ENV === 'development') {
  app.use(cors({ origin: 'http://localhost:3000' }))
} else {
  app.use(cors({ origin: 'https://iaadappv1.netlify.app' }))
}

// ! Routes
const authRoute = require('./routes/Auth')
const studentRoute = require('./routes/Student')
const notificationRoute = require('./routes/Notification')

// ! Routes Middlewares
app.use('/api/v1/auth', authRoute)
app.use('/api/v1/student', studentRoute)
app.use('/api/v1/notification', notificationRoute)

const PORT = process.env.PORT || 5000

app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`))
