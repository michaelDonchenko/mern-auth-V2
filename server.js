//express & DB
const express = require('express')
const app = express()
const path = require('path')
const connectDB = require('./config/db')

const dotenv = require('dotenv');
dotenv.config()

//init middleware
app.use(express.json({extended: false}))

//set routes
const authRoutes = require('./routes/auth')

//Routing
app.use('/auth', authRoutes)

//connect DB
connectDB()

const PORT = process.env.PORT || 5000

//port listener
app.listen(PORT, () => {
  console.log(`The app listening at http://localhost:${PORT}`)
})