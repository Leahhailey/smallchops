
const Joi = require('joi')
const { getAllUsers, checkIfUserWithEmailOrPhoneExist } = require('../models/query')

const getUsers = (req, res) => { 

    try {
        getAllUsers()

    } catch (error) {
        
    }
   

}


const data = (req, res)  => { 

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
            data: []
        })

    })
    

}


const createUser = (req, res) => {

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
        
        checkIfUserWithEmailOrPhoneExist(email, phone)
        .then(zubiar => {
            console.log("x", zubiar)
        })
        .catch(qudus => {
            console.log("y", qudus)
        })
       
    } catch (e) {

        res.status(400).json({
            message: e.message
        })

    }

}

const aaliyah = (req, res) => {
    

}

module.exports = { getUsers, data , createUser, aaliyah }

//module.exports = { getUsers, data , createUser, aaliyah }