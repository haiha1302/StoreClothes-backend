const express = require('express')
const dotenv = require('dotenv')
const { connectToMongo } = require('./database')
const usersRouter = require('./routes/users')
const uploadRouter = require('./routes/uploadUser')

dotenv.config()

const app = express()
app.use(express.json())

app.get('/', (req, res) => {
    res.json('Hello')
})

app.use('/users', usersRouter)
app.use('/upload', express.static('Images'), uploadRouter)

connectToMongo()

const PORT = process.env.PORT || 5050

app.listen(PORT, () => console.log(`App is running at port: ${PORT}`))