const express = require('express')
const router = express.Router()
// const customerControllers = require('../controllers/customers.controllers')
const { getUsers, createUser, data } = require('../controllers/customers.controllers')


//get all users
router.get('/users',  getUsers)


router.post('/user', createUser)





module.exports = router;
