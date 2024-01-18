import mongoose from 'mongoose'
const RECONNECT_TO_DB_ON_FAIL = 3
// const DB_HOST = process.env.DB_HOST || 'localhost'
const DB_HOST = process.env.DB_HOST || 'mongodb'
const DB_NAME = 'country-backend-server'

const MONGO_PORT = 27017
// const connection = `mongodb://${DB_HOST}:${MONGO_PORT}/geodetails-backend-server`
const connection = `mongodb://${DB_HOST}:${MONGO_PORT}/${DB_NAME}`

const connectDb = () => {
  mongoose
    .connect(connection)
    .then(() => {
      console.log('DB connected')
    })
    .catch((ex) => {
      console.error('Could not connect to DB', ex)
      console.log(`Retry in ${RECONNECT_TO_DB_ON_FAIL} seconds`)
      setTimeout(() => {
        console.log('Retrying to connect to DB...')
        connectDb()
      }, RECONNECT_TO_DB_ON_FAIL * 1000)
    })
}

export default connectDb
