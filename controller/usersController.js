const { v4: uuid } = require('uuid')
const { db } = require('../database')

const checkId = async (id) => {
    const check = await db.users.findOne({
        id: id
    })

    if (check) {
        return check
    }
}

const getUsers = async (req, res) => {
    const users = await db.users.find({}).toArray()
    res.json(users)
}

const createUser = async (req, res) => {
    const user = {
        ...req.body,
        id: uuid()
    }

    await db.users.insertOne(user)
    res.json(user)
}

const getUser = async (req, res) => {
    const checkUser = checkId(req.params.id)

    if (!checkId) {
        res.json('User does not existed')
    }

    res.json(checkUser)
}

const deleteUser = async (req, res) => {
    const checkUser = checkId(req.params.id)

    if (!checkUser) {
        res.json('User does not existed')
    }

    await db.users.deleteOne({
        id: req.params.id
    })

    res.json('User has been deleted')
}

const updateUser = async (req, res) => {
    const checkUser = checkId(req.params.id)

    if (!checkUser) {
        res.json('User does not existed')
    }

    await db.users.updateOne(
        {id: req.params.id},
        {
            $set: {

            }
        }    
    )
}

module.exports = { getUsers, createUser, getUser, deleteUser, updateUser }