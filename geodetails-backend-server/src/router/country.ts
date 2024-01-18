import { isAuthenticated } from '../middlewares/index'
import express from 'express'

import { show } from '../controllers/countryDetail'

export default (router: express.Router) => {
  router.post('/country/details', isAuthenticated, show)
}
