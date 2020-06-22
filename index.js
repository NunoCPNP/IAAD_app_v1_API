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
app.use(cors({ origin: 'http://localhost:3000' }))

// ! Routes
const authRoute = require('./routes/Auth')

// ! Routes Middlewares
app.use('/auth', authRoute)

const PORT = process.env.PORT || 3000

app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`))
