const MongoClient = require('mongodb').MongoClient

const client = new MongoClient(process.env.MONGO_URI, { useUnifiedTopology: true })

// Database Name
const dbName = 'vend'

const connect = () => {
  return new Promise((resolve, reject) => {
    try {
      client.connect()
      const db = client.db(dbName)
      resolve({ db, client })
    } catch (e) {
      console.log('error connecting to database', e)
      reject(new Error('Error connecting to database'))
    }
  })
}

module.exports = connect
