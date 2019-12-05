//Bring in express
const express = require('express')
const path = require('path')

const logger = require('./middleware/logger')

//initialize variable app w/ express
const app = express()


//Init middleware
// app.use(logger)

//Body parser middleware- allows us to handle raw json 
app.use(express.json())
//Form submissions & URL encoded data
app.use(express.urlencoded({ extended: false }))

//Set a static folder- use is method we use when we wanna include middleware
//Point to folder we want to set as static folder
app.use(express.static(path.join(__dirname, "public")))

//Members API routes
app.use('/api/members', require('./routes/api/members'))


const PORT = process.env.PORT || 3000

app.listen(PORT, () => console.log(`Server running on ${PORT}`))