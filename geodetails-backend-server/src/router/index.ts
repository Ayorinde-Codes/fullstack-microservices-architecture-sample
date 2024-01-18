import express from 'express'
import country from './country'
import authentication from './authentication'

const router = express.Router()

export default (): express.Router => {
  authentication(router)
  country(router)
  return router
}
