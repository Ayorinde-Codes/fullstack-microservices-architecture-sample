import express from 'express'

import {
  login,
  regenerateApiKey,
  register,
} from '../controllers/authentication'

export default (router: express.Router) => {
  router.post('/auth/register', register)
  router.post('/auth/login', login)
  router.post('/auth/regenerate-api-key', regenerateApiKey)
}
