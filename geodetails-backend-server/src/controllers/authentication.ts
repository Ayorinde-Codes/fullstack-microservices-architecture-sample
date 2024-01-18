import { generateApiKey } from '../utils/helpers'
import express from 'express'
import { createUser, getUserByEmail } from '../models/users'
import bcrypt from 'bcryptjs'
import {
  sendBadRequest,
  sendNotFound,
  sendServerError,
  sendSuccess,
} from '../utils/errorCodes'

/**
 * Controller method to register a new user.
 * Encrypts the user's password, checks for existing users, and creates a new user in the database.
 * @param req Express Request object with user registration data
 * @param res Express Response object
 * @returns Response indicating the success or failure of user registration
 */
export const register = async (req: express.Request, res: express.Response) => {
  try {
    const salt = bcrypt.genSaltSync(10)
    const hash = bcrypt.hashSync(req.body.password, salt)
    const { email, password, username } = req.body

    if (!email || !password || !username) {
      return sendBadRequest(res, 'Invalid data')
    }
    // Checking if the user already exists in the database
    const existingUser = await getUserByEmail(email)

    if (existingUser) {
      return sendBadRequest(res, 'User exist')
    }

    const user = await createUser({
      email,
      username,
      password: hash,
      api_key: generateApiKey(),
    })

    return sendSuccess(res, 'User created successfully', user)
  } catch (error) {
    console.log(error)
    return sendServerError(res, 'Unable to create user')
  }
}

/**
 * Controller method for user login.
 * Validates user credentials, checks for the existence of the user, and generates an API key for authentication.
 * @param req Express Request object with user login data
 * @param res Express Response object
 * @returns Response indicating the success or failure of user login along with an API key
 */
export const login = async (req: express.Request, res: express.Response) => {
  try {
    const { email, password } = req.body

    if (!email || !password) {
      return sendBadRequest(res, 'Invalid details')
    }

    const user = await getUserByEmail(email).select('+password +api_key')

    if (!user) {
      return sendNotFound(res, 'User not found')
    }

    console.log()
    const isPasswordCorrect = await bcrypt.compare(password, user.password)

    if (!isPasswordCorrect) {
      return sendNotFound(res, 'password mismatch')
    }

    const token = user.api_key

    return sendSuccess(res, 'Login successful', { api_key: token })
  } catch (error) {
    console.error(error)
    return sendServerError(res, 'Unable to perform log in')
  }
}

/**
 * Controller method to regenerate a user's API key.
 * Validates user credentials, generates a new API key, and updates it in the database.
 * @param req Express Request object with user credentials
 * @param res Express Response object
 * @returns Response indicating the success or failure of API key regeneration, along with the new API key
 */
export const regenerateApiKey = async (
  req: express.Request,
  res: express.Response,
) => {
  try {
    const { email, password } = req.body

    if (!email || !password) {
      return sendBadRequest(res, 'Invalid details')
    }

    const user = await getUserByEmail(email).select('+password +api_key')

    if (!user) {
      return sendNotFound(res, 'User not found')
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password)

    if (!isPasswordCorrect) {
      return sendNotFound(res, 'Password mismatch')
    }

    // Generate a new API key
    const newApiKey = generateApiKey()

    // Update the user's API key in the database
    user.api_key = newApiKey
    await user.save()

    return sendSuccess(res, 'API key regenerated successfully', {
      api_key: newApiKey,
    })
  } catch (error) {
    console.error(error)
    return sendServerError(res, 'Unable to regenerate user API key')
  }
}
