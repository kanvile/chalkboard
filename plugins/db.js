const mongoose = require('mongoose')
const requireAll = require('require-all')

const connectDatabase = () => {
  const username = process.env.DB_USER
  const password = process.env.DB_PASS

  const uri = `mongodb://${username}:${password}@cluster0-shard-00-00.4q39j.mongodb.net:27017,cluster0-shard-00-01.4q39j.mongodb.net:27017,cluster0-shard-00-02.4q39j.mongodb.net:27017/chalkboard?ssl=true&replicaSet=atlas-royosx-shard-0&authSource=admin&retryWrites=true&w=majority`

  mongoose.connect(uri, { useNewUrlParser: true })

  requireAll(`${__dirname}/../models`)
}

module.exports = connectDatabase
