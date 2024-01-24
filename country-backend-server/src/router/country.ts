import express from 'express'

import { get, details } from '../controllers/country'

export default (router: express.Router) => {
  router.get('/countries', get)
  router.post('/country/details', details)
}
