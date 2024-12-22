const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')
require('dotenv').config()
const router = require('./routes/index')
//
const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/tokenDB')
    .then(() => console.log('db is connected'))
    .catch((err) => console.log(err))

const PORT = process.env.PORT || 3000
const app = express()

app.use(express.json())
app.use(cors())
app.use(cookieParser())
app.use('/api', router)

app.listen(PORT, () => console.log(`server is running ${PORT}`))