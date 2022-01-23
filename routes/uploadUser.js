const express = require('express')
const { postNewUserProfile, getUserProfile, getUserProfileImage } = require('../controller/profileController')
const upload = require('../middleware/uploadUser')

const router = express.Router()

router.get('/', getUserProfile)

router.get('/:id', getUserProfileImage)

router.post('/', upload.single('file'), postNewUserProfile)

module.exports = router


