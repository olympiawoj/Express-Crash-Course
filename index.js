//Bring in express
const express = require('express')
const path = require('path')
const moment = require('moment')
const members = require('./Members')

//initialize variable app w/ express
const app = express()

//middleware
const logger = (req, res, next) => {
    console.log('Middleware dispatching')
    console.log(`${req.protocol}://${req.get('host')}${req.originalUrl}:${moment().format()}`)
    next()
}

//Init middleware
app.use(logger)

//This route Gets all  members
app.get('/api/members', (req, res) => {
    //return some JSON
    res.json(members)
})

//Set a static folder- use is method we use when we wanna include middleware
//Point to folder we want to set as static folder
app.use(express.static(path.join(__dirname, "public")))

const PORT = process.env.PORT || 3000

app.listen(PORT, () => console.log(`Server running on ${PORT}`))