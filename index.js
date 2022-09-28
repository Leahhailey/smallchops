require('dotenv').config()
const express = require('express')
const mysql   = require('mysql')
const bodyParser = require('body-parser')
const { v4: uuidv4 } = require('uuid');
const app = express()
const port = 8000

app.use(bodyParser.json())

app.listen(port, () => {

    console.log(`smallchops api is listening on port ${port}`)
    
})

const connection = mysql.createConnection({
    host     : process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    port: process.env.DATABASE_PORT,
    password : process.env.DATABASE_PASSWORD,
    database : process.env.DATABASE_NAME
  });

connection.connect()


//create user
app.post('/create', (req, res) => { 

    const { firstname, othername, phone, email } = req.body

    // 1. validate the inputs
    //2. comfirm the email or phone does not exist
    //3. if 2 is true, return email or phone exist
    //4. else create teh customer 

    if (!firstname || !othername || !phone || !email) { 

        return res.status(400)
            .json(
                { message: 'Please fill all fields' } )
    } 

    connection.query(`SELECT * from customers where email='${email}' or phone='${phone}'`,
        (error, results, fields) => {
            if (error) {
                console.log("here1: " , error)
                res.status(500).json( { message: 'An error occured' } )
            }
            if(results.length > 0) {
                res.status(400).json( { message: 'Email or phone already exists' } )
            }

            let customer_id = uuidv4()
            
            connection.query(`INSERT INTO customers (customer_id, firstname, othernames, phone, email) 
                              VALUES ('${customer_id}','${firstname}', '${othername}', '${phone}', '${email}')`),
                (error, results, fields) => { 

                    if (error) {
                        console.log("here2: " , error)
                         res.status(500).json( { message: 'An error occured' } )
                    }
                     res.status(201).json( { message: 'Customer created' } )
                }
        

            
      });


      


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


