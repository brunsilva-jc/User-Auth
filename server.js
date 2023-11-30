require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')

const userRoute = require('./routes/user')

const app = express()

app.use(express.json())

app.use((req,res, next) => {
    console.log(req.path, req.method)
    next()
})

app.use('/api/user/', userRoute)

mongoose.connect('mongodb+srv://BrunoSilva:f4DMrm90NiqolYEQ@user-auth.xxpqi4i.mongodb.net/?retryWrites=true&w=majority').
    then(() => {
        app.listen(process.env.PORT, () => { 
            console.log('connect to DB!')
        })
    })
    .catch((error) => {
        console.log(error)
    })