require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const { v4: uuidv4 } = require('uuid')
const app = express()
const port = process.env.APP_PORT
const customerRoutes = require('./routes/customer.routes')
const dbConnection = require('./models/connection')


app.use(bodyParser.json())
app.use(customerRoutes)


app.listen(port, function() {

    console.log(`smallchops api is listening on port ${port}`)
    
})

console.log("i got called ")
console.log("i got called ")
console.log("i got called ")





// connection.end()