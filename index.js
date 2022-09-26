const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = 8000

app.use(bodyParser.json())


const users = [
    {
        id: 1,
        firstname: "Qudus",
        othername: "Adedokun",
        occupation: "Jobless",
        age: 18
    },
    
    {
        id: 2,
        firstname: "Qudus",
        othername: "Zubair",
        occupation: "Retired",
        age: 22
    },
    {
        id: 3,
        firstname: "Adedeji",
        othername: "Aminah",
        occupation: "Doctor",
        age: 5
    }
]



app.listen(port, () => {

    console.log(`smallchops api is listening on port ${port}`)
    
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


//create user

app.post('/create', (req, res) => { 

    const { firstname, othername, occupation, age } = req.body

    const user = {
        id: users.length + 1,
        firstname: firstname,   
        othername: othername,
        occupation: occupation,
        age: age
    }

    users.push(user)

    res.status(200).send({
        message: "user created",
        data: user
    })


})