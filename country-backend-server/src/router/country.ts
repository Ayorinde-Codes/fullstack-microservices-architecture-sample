import express from 'express'

import { get, getDetails } from '../controllers/country'

export default (router: express.Router) => {
  router.get('/countries', get)
  router.post('/country/details', getDetails)
}
