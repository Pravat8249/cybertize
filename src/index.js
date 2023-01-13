const express = require('express')
const route = require('./routes/route')
const mongoose = require('mongoose')
const multer = require('multer')

const app = express()

app.use(multer().any())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/', route)
mongoose.set(`strictQuery`,true);
mongoose.connect("mongodb+srv://AAbhishek2022:1ESrG6kzyaqzUE3p@cluster0.am17a.mongodb.net/cybertize", { useNewUrlParser: true })
    .then(() => console.log('MongoDB is connected!!'))
    .catch(err => console.log(err))


app.listen(process.env.PORT || 3000, function () {
    console.log('Sever Connected at : ' + (process.env.PORT || 3000))
});