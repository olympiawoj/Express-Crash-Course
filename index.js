//Bring in express
const express = require('express')
const path = require('path')
const exphbrs = require('express-handlebars')

const logger = require('./middleware/logger')
const members = require('./Members')

//initialize variable app w/ express
const app = express()


//Init middleware
// app.use(logger)

//Handlebars middleware - first set the engine, then set default layout to file called main, so when we create our layut we want to call it main.handlebars
app.engine('handlebars', exphbrs({ defaultLayout: 'main' }));
//Set the view engine
app.set('view engine', 'handlebars')

//Body parser middleware- allows us to handle raw json 
app.use(express.json())
//Form submissions & URL encoded data
app.use(express.urlencoded({ extended: false }))

//Homepage
app.get('/', (req, res) =>
    res.render('index', {
        title: "Member App",
        members
    })
)

//Set static folder- use is method we use when we wanna include middleware
//Point to folder we want to set as static folder
app.use(express.static(path.join(__dirname, "public")))

//Homepage route -Render index here
app.get('/', (req, res) => {
    res.render('index')
})


//Members API routes
app.use('/api/members', require('./routes/api/members'))


const PORT = process.env.PORT || 3000

app.listen(PORT, () => console.log(`Server running on ${PORT}`))