const { v4: uuid } = require('uuid')
const { db } = require('../database')

const getUsers = async (req, res) => {
    const users = await db.users.find({}).toArray()
    res.json(users)
}

const createUser = async (req, res) => {
    const user = {
        ...req.body,
        image_path: req.file.filename,
        id: uuid()
    }

    await db.users.insertOne(user)
    res.json(user)
}

const getUser = async (req, res) => {
    const checkUser = await db.users.findOne({
        id: req.params.id
    })
    console.log(req.params.id);
    if (!checkId) {
        res.json('User does not existed')
    }

    res.json(checkUser)
}

const deleteUser = async (req, res) => {
    const checkUser = await db.users.findOne({
        id: req.params.id
    })

    if (!checkUser) {
        res.json('User does not existed')
    }

    await db.users.deleteOne({
        id: req.params.id
    })

    res.json('User has been deleted')
}

const updateUser = async (req, res) => {
    const checkUser = await db.users.findOne({
        id: req.params.id
    })
    
    if (!checkUser) {
        res.json('User does not existed')
    }

    await db.users.updateOne(
        {id: req.params.id},
        {
            $set: {
                ...req.body,
                image_path: req.file.filename
            }
        }    
    )

    res.json('Update success')   
}

module.exports = { getUsers, createUser, getUser, deleteUser, updateUser }