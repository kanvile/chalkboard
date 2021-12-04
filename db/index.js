const mongoose = require('mongoose')

const connectDatabase = async () => {
  const username = 'kanvile'
  const password = '9176183999JoLiN'
  const uri = `mongodb://${username}:${password}@cluster0-shard-00-00.4q39j.mongodb.net:27017,cluster0-shard-00-01.4q39j.mongodb.net:27017,cluster0-shard-00-02.4q39j.mongodb.net:27017/chalkboard?ssl=true&replicaSet=atlas-royosx-shard-0&authSource=admin&retryWrites=true&w=majority`

  try {
    await mongoose.connect(uri, { useNewUrlParser: true })
    console.log('database connected...')
  } catch (e) {
    console.error(e)
  }
}

module.exports = connectDatabase
