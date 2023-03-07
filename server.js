const express = require('express')
const cookieParser = require('cookie-parser')

const home = require('./routes/home')

const app = express()

app.use(express.static(__dirname + '/public'))
app.use(express.json())
app.use(cookieParser())

// Routes
app.use('/home', home)

// connection
const port = process.env.PORT || 3001
app.listen(port, () => console.log(`Listening to port ${port}`))
