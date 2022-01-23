const upload = require('../middleware/uploadUser')
const configDB = require('../database')

const MongoClient = require('mongodb').MongoClient
const GridFSBucket = require('mongodb').GridFSBucket

const url = process.env.DATABASE_URL

const baseUrl = 'http://localhost:5000/files'

const mongoClient = new MongoClient(url)

const uploadFiles = async (req, res) => {
    try {
        await upload(req, res)
        console.log(req.files);

        if (req.files.length <= 0) {
            return res.status(400).send({
                message: 'You must select at least 1 file.'
            })
        }

        return res.status(200).send({
            message: 'Files have been uploaded.'
        })
    } catch(err) {
        console.log(err);

        if (err.code === 'LIMIT_UNEXPECTED_FILE') {
            return res.status(400).send({
                message: 'Too many files to upload.'
            })
        }

        return res.status(500).send({
            message: `Error when trying upload many files: ${err}`
        })
    }
}