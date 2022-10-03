require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const mysql = require('mysql2')
const { v4: uuidv4 } = require('uuid')
const Joi = require('joi')
const app = express()
const port = process.env.APP_PORT


try {



    
} catch (error) {
    console.log(error.message)
}






app.use(bodyParser.json())

app.listen(port, () => {

    console.log(`smallchops api is listening on port ${port}`)
    
})

//create the connection to database
const connection = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    port: process.env.DATABASE_PORT,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME
});


//create user
app.post('/create', (req, res) => { 


    const schema = Joi.object({
        firstname: Joi.string().min(4).max(30),
        othername: Joi.string().min(4).max(30).required(),
        email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', ] } }).required(),
        phone: Joi.string().min(11).max(14).required(),
    })
    
    const { error, value }= schema.validate(req.body);
    
    if (error != undefined) {
        res.status(400).send({
            status: false,
            message:  error
        })
    }

    const { firstname, othername, email, phone } = req.body

    //1. validate teh varibles
    //2. check if email or phone exist
    //3. if email exist , return a message that email or phonne already exist
    //4. else create the customer
    try {
        
        connection.query(
            `select * from customers where email='${email}' or phone='${phone}'`,
            (err, results, fields) => {
                if (err) {
                    console.log("1: error: ", err)
                     throw new Error('Please check back, this is on us.')
    
                }
         
                if (results.length > 0) {
                    throw new Error ('The email/Phone exists.', 400)
                }


                //create the customer 
                connection.query(
                    `insert into customers(customer_id,firstname, othernames, phone, email)
                 values('${uuidv4()}','${firstname}','${othername}','${phone}', '${email}' )`,
                    (err, results, fields) => {
                        if (err) {
                            console.log("2: error: ", err)
                            throw new Error("This is on us, pleae try later")
                        }


                        res.status(201).json({
                            status:true,
                            message: "Account succesfully created",
                            data: req.body
                        })
                     

                    

                    }
                );
              

            }
        );
       
    } catch (e) {

        res.status(400).json({
            message: e.message
        })

    }








})


//get user
app.get('/user/:_id', (req, res) => { 
    
    const schema = Joi.object({
        _id: Joi.string().required()
    })

    const { error, value } = schema.validate(req.params)

    if (error != undefined) {
        res.status(400).send({
            status: false,
            message:  error.details[0].message
        })
    }

    const { _id } = req.params
    try {

        connection.query(`select * from customers where customer_id='${_id}'`,
            (err, results, fields) => {
                if (err) {
                    console.log("2: error: ", err)
                    throw new Error("This is on us, pleae try later")
                }
    
                delete results[0].sn

                res.status(200).json({
                    status:true,
                    message: "Account succesfully fetched",
                    data: results
                })
    
            }
        )
       
    } catch (e) {
        res.status(400).send({
            status: false,
            message: e.message || "Something went wrong"
        })
    }
    
   
    

})

//get all users
app.get('/users', (req, res) => { 

    connection.query(`select * from customers`,
    (err, results, fields) => {
        if (err) {
            console.log("2: error: ", err)
            throw new Error("This is on us, pleae try later")
        }
        const result_arr = results.map(item => delete item.sn)

        res.status(200).json({
            status:true,
            message: "Account succesfully fetched",
            data: results
        })

    })
    

})


//updarte
app.put('/user/:_id', (req, res) => {

    const schema = Joi.object({
        firstname: Joi.string().min(5).required(),
        othernames: Joi.string().min(5).required(),
        address: Joi.string().required(),
        gender: Joi.string().valid(0, 1, 2).required(),
        dob: Joi.string().required(),
    })

    const { error, value } = schema.validate(req.body)

    if (error != undefined) {
        res.status(400).send({
            status: false,
            message:  error.details[0].message
        })
    }

    const { _id } = req.params
    const { body } = req
        
    connection.query(`update customers set firstname=${body.firstname}, othernames=${body.othernames},
    address=${body.address}, gender=${body.gender}, dob=${body.dob} where customer_id='${customer_id}`,
    (err, results, fields) => {
        if (err) {
            console.log("2: error: ", err)
            throw new Error("This is on us, pleae try later")
        }
        const result_arr = results.map(item => delete item.sn)

        res.status(200).json({
            status:true,
            message: "Account succesfully updated"
        })

    })


})


// connection.end()