import express from 'express'
import { merge } from 'lodash'
import { getUserByApiKey } from '../models/users'
import { sendServerError, sendUnauthorized } from '../utils/errorCodes'

export const isAuthenticated = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => {
  try {
    // Check if the API key exists in headers
    const userApiKeyHeader = req.header('API-Key') as string

    if (!userApiKeyHeader) {
      return sendUnauthorized(res, 'API key in headers is missing')
    }

    // Check if the header API key matches the API key in the system
    const user = await getUserByApiKey(userApiKeyHeader)

    if (!user) {
      return sendUnauthorized(res, 'Invalid API key')
    }

    // Merge the user API key into the request object
    merge(req, { api_key: userApiKeyHeader })

    return next()
  } catch (error) {
    console.error(error)
    return sendServerError(res, 'Unable to authenticate user')
  }
}
