const MongoClient = require('mongodb').MongoClient

const MONGO_USER = process.env.MONGO_USER
const MONGO_PASS = process.env.MONGO_PASS
const MONGO_SERVER = process.env.MONGO_SERVER || 'mongodb'
const MONGO_PORT = process.env.MONGO_PORT || 27017

const dbName = 'requests'

const mongourl = `mongodb://${MONGO_USER}:${MONGO_PASS}@${MONGO_SERVER}:${MONGO_PORT}`;
const client = new MongoClient(mongourl, {
  useUnifiedTopology: true
})

module.exports.saveRequestAsync = async (req, res, next) => {
  try {
    const db = client.db(dbName)

    const r = await db.collection('inserts').insertOne({
        'verb': req.method,
        'host': req.host,
        'path': req.path
      }, {
        w: 'majority',
        wtimeout: 10000,
        serializeFunctions: true,
        forceServerObjectId: true
      }
    )
    console.log('Inserted')
  } catch (err) {
    console.log(err.stack)
  }

  next()
}

module.exports.addListToRequest = async (req,res,next) => {
  try {
    const db = client.db(dbName)

    req.list = await db.collection('inserts').find({}).toArray();
  } catch (err) {
    console.log(err.stack)
  }
  next()
}

module.exports.initialize = async () => {
  try {
  console.log(`Connecting to mongodb://${MONGO_USER}:******@${MONGO_SERVER}:${MONGO_PORT}`)
  await client.connect()
  console.log('Connected correctly to server')
  } catch (err) {
    console.log(err.stack);
  }
}
