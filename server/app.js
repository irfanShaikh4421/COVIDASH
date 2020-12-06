const express = require('express')
const app = express()
const { redisClient } = require('./utilities/redis')
const cors = require('cors')
const admin = require('firebase-admin')
const { authenticate } = require('./config/firebase')

// environment configs if any
require('dotenv').config()

//default configs
const config = require("./config/index")

app.use(cors())
app.use(express.json({ limit: "50kb" }))
app.use(express.urlencoded({ extended : true }))
app.use(express.static('./public'))


// routes
const test = require('./routes/test')
const authRoute = require('./routes/authRoute')

app.use("/test", test)
app.use("/authRoute", authenticate ,authRoute)

// auth thingy

// global error handler

app.use((err,req,res,next) => {

    if( err.response && err.response.data.status)
        err.status = err.response.data.status

    if(!err.status)
    {
        err.status = 500
        err.message = "INTERNAL SERVER ERROR"
    }
    console.error(err)
    res.status(err.status).json(err.message)
} )

app.listen(config.port, () => {
    console.log(`[BACKEND] Your server is running on ${config.port}`)
})
