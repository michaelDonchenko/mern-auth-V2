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

//serve static assets in production
if (process.env.NODE_ENV === 'production') {
  //set static folder
  app.use(express.static('client/build'))

  app.get('*', (req,res) => res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html')))
}

const PORT = process.env.PORT || 5000

//port listener
app.listen(PORT, () => {
  console.log(`The app listening at http://localhost:${PORT}`)
})

