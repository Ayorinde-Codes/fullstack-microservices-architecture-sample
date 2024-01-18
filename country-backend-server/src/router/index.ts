import express from 'express'
import country from './country'

const router = express.Router()

export default (): express.Router => {
  country(router)
  return router
}
