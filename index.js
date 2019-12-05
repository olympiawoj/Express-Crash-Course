//Bring in express
const express = require('express')
const path = require('path')
const members = require('./Members')
const logger = require('./middleware/logger')

//initialize variable app w/ express
const app = express()


//Init middleware
// app.use(logger)

//This route Gets all  members
app.get('/api/members', (req, res) => {
    //return some JSON
    res.json(members)
})

//Get single member
app.get('/api/members/:id', (req, res) => {
    //some gives us true or false
    const found = members.some(member => member.id === parseInt(req.params.id))
    found ? res.json(members.filter((member) => member.id === parseInt(req.params.id))) : res.status(400).json({ msg: `No member with the id of ${req.params.id}` })

})

//Set a static folder- use is method we use when we wanna include middleware
//Point to folder we want to set as static folder
app.use(express.static(path.join(__dirname, "public")))

const PORT = process.env.PORT || 3000

app.listen(PORT, () => console.log(`Server running on ${PORT}`))