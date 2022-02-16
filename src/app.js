const express = require('express')
const morgan = require('morgan')
require('dotenv').config()
const connectMongo = require("./database/MongoConection");

const app = express()
//Connect Mongo
connectMongo();
// MIDLEWARE
app.use(morgan('tiny'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// routes
app.use('/api/node/v1',require('./routes'))

// Iniciando Servidor.
app.listen(process.env.NODE_PORT, process.env.NODE_HOST, async () => {
    try {
        console.log(`succes ${process.env.NODE_HOST}:${process.env.NODE_PORT} - ${process.env.NODE_ENV}`)
    } catch (error) {
        console.error('err ', error)
    }
})
