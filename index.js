require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const mysql = require('mysql2')
const { v4: uuidv4 } = require('uuid')
const Joi = require('joi')
const app = express()
const port = process.env.APP_PORT

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
        firstname: Joi.string().min(4).max(30).required(),
        othername: Joi.string().min(4).max(30).required(),
        phone: Joi.string().min(11).max(14).required(),
        email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
    })
    
    const { error, value } = schema.validate(req.body);
    
    if (error != "undefined") {
        
        res.status(400).send({
            message: 'validation error'
        })
    }

    const { firstname, othername, email, phone } = req.body

    //1. validate teh varibles
    //2. check if email or phone exist
    //3. if email exist , return a message that email or phonne already exist
    //4. else create the customer
    try {
        if (!firstname || !othername || !email || !phone) {
            throw new Error ('All fields are required')
       
        }

        connection.query(
            `select * from customers where email='${email}' or phone='${phone}'`,
            (err, results, fields) => {
                 if (err) {
                   console.log('errr: ', err)
                    throw new Error ('Please check back, this is on us.')
                }

           
                if (results.length > 0) {
                    throw new Error ('The email/Phone exists.', 400)
                }


                //create the customer 
                let customer_id = uuidv4()
                connection.query(
                    `insert into customers(customer_id,firstname, othernames, phone, email)
                 values('${customer_id}','${firstname}','${othername}','${phone}', '${email}' )`,
                    (err, results, fields) => {
                        if (err) {
                            // console.log("error: ", err.sqlMessage)
                            throw new Error("This is on us, pleae try later")
                        }


                        res.status(201).json({
                            message: "Account succesfully created",
                            data: {
                                firstname,
                                othername,
                                phone,
                                email
                            }
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
    
    const { _id } = req.params
    const user = users.find(x => x.id == _id)
    
    if (!user) {
        res.status(404).send({
            message: "user not found"
        })
    } 

    res.status(200).send({
        message: "user found",
        data: user
    })
   
    

})

//get all users
app.get('/users', (req, res) => { 

    res.status(200).send({
        message: "All users",
        data: users
    })

})



// connection.end()