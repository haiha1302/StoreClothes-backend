const express = require('express')
const usersController = require('../controller/usersController')

const router = express.Router()

router.get('/', usersController.getUsers)

router.get('/:id', usersController.getUser)

router.post('/', usersController.createUser)

router.patch('/:id', usersController.updateUser)

router.delete('/:id', usersController.deleteUser)

module.exports = router