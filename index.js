//Bring in express
const express = require('express')
const path = require('path')
const members = require('./Members')

//initialize variable app w/ express
const app = express()


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