const { MongoClient } = require('mongodb')
require('dotenv').config()

const url = process.env.DATABASE_URL
const client = new MongoClient(url)

const db = {}

const configDB = {
    url: process.env.DATABASE_URL,
    database: 'files',
    imgBucket: 'photos'
}

const connectToMongo = async () => {
    await client.connect()
    console.log('DB connected');

    const database = client.db('Users')
    db.users = database.collection('users')
    db.upload = database.collection('upload')
}

module.exports = { connectToMongo, db, configDB }
