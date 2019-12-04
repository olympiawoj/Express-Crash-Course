//Bring in express
const express = require('express')

//initialize variable app w/ express
const app = express()

app.get("/", (req, res) => {
    res.send('<h1>Hey World!</> ')
})

const PORT = process.env.PORT || 3000

app.listen(PORT, () => console.log(`Server running on ${PORT}`))