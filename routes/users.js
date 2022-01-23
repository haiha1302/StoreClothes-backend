const express = require('express')
const usersController = require('../controller/usersController')
const uploadFiles = require('../middleware/uploadUser')

const router = express.Router()

router.get('/', usersController.getUsers)

router.get('/:id', usersController.getUser)

router.post('/', uploadFiles.single('avatar'), usersController.createUser)

router.patch('/:id', uploadFiles.single('avatar'), usersController.updateUser)

router.delete('/:id', usersController.deleteUser)

module.exports = router