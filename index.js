const express = require('express')
const bodyParser = require('body-parser')
const mysql = require('mysql2')
const { v4: uuidv4 } = require('uuid')
const app = express()
const port = 5500

app.use(bodyParser.json())

app.listen(port, () => {

    console.log(`smallchops api is listening on port ${port}`)
    
})

// create the connection to database
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    port:'8889',
    password: 'root',
    database: 'smallchops'
});
  


//create user
app.post('/create', (req, res) => { 


    const { firstname, othername, email, phone } = req.body
    
    //1. validate teh varibles
    //2. check if email or phone exist
    //3. if email exist , return a message that email or phonne already exist
    //4. else create the customer

    if (!firstname || !othername || !email || !phone ) {
        res.status(400).json({
            message: "All fields are required"
        })
    }

    connection.query(
        `select * from customers where email='${email}' or phone='${phone}'`,
        (err, results, fields)  => {
            console.log(results); // results contains rows returned by server
            console.log(fields); // fields contains extra meta data about results, if available
            if (err) {
                console.log(err.sqlMessage)
                res.status(400).json({
                    message: "An error cocured "
                })
            }

           
            if (results.length > 0) {
                res.status(400).json({ 
                    message: "This email/phone exists"
                })
            }


            //create the customer 
            let customer_id =  uuidv4()
            connection.query(
                `insert into customers(customer_id,firstname, othernames, phone, email)
                 values('${customer_id}','${firstname}','${othername}','${phone}', '${email}' )`,
                 (err, results, fields)  => {
                     if (err) {
                         console.log("error: ", err.sqlMessage)
                         res.status(400).json({
                         message: "An error occured"
                     })
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


