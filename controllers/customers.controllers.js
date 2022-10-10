



const getUsers = (req, res)  => { 

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

}


module.exports = { getUsers, data , createUser }