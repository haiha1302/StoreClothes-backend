const { db } = require('../database')
const dotenv = require('dotenv').config()

const getUserProfile = async (req, res) => {
    const usersProfile = await db.upload.find({}).toArray()
    res.json(usersProfile)
}

const getUserProfileImage = async (req, res) => {
    const image = await db.upload.findOne({
        image: req.params.id
    })

    if (!image) {
        throw new Error('Cannot find image')
    }
    console.log('res', image.image);
    // return image.image
    res.status(200).send(image)
}

const postNewUserProfile = async (req, res) => {
    try {
        const profileData = {
            nameUser: req.body.nameUser,
            image: req.file.filename,
            nameCard: req.body.nameCard,
            colorCard: req.body.colorCard,
            qrImage: req.body.qrImage,
            socials: req.body.socials,
            idUserMongo: req.body.idUserMongo
        }

        await db.upload.insertOne(profileData, (err, rows) => {
            if (err) {
                res.send({ message: 'An error occurred' })
            } else {
                res.json({
                    status: 'Successfully create',
                    success: 1,
                    avatarUrl: `${process.env.BASEURL}/${req.file.filename}`
                })
            }
        })
    } catch (err) {
        console.log(err);
    }
}

module.exports = { getUserProfile, getUserProfileImage, postNewUserProfile }