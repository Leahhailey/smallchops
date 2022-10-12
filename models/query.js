
const { connection } = require('./connection')


const allUsers = () => {

    connection.query( `select * from customers`,
        (err, results, fields) => { 

        } )


}

const User = (email) => {

    return connection.query( `select * from customers where email='${email}'`)
        
}


const checkIfUserWithEmailOrPhoneExist = (email, phone) => {

    return connection.query(`select * from customers where email='${email}' or phone='${phone}'`)
       

}



module.exports = { allUsers ,  User, checkIfUserWithEmailOrPhoneExist}