const express = require('express')
const router = express.Router()
const customerControllers = require('../controllers/customers.controllers')

//get all users
router.get('/users', customerControllers.getUsers)


router.post('/user', customerControllers.createUser)


module.exports = router;
