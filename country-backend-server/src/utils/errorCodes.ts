import respond from './response'
import { Response } from 'express'

export const sendBadRequest = (
  response: Response,
  message: string,
  data: unknown = null,
): void => {
  respond(response, 400, message, data)
}

export const sendUnauthorized = (
  response: Response,
  message: string,
  data: unknown = null,
): void => {
  respond(response, 401, message, data)
}

export const sendForbidden = (
  response: Response,
  message: string,
  data: unknown = null,
): void => {
  respond(response, 403, message, data)
}

export const sendNotFound = (
  response: Response,
  message: string,
  data: unknown = null,
): void => {
  respond(response, 404, message, data)
}

export const sendServerError = (
  response: Response,
  message: string,
  data: unknown = null,
): void => {
  respond(response, 500, message, data)
}

export const sendServiceUnavailable = (
  response: Response,
  message: string,
  data: unknown = null,
): void => {
  respond(response, 503, message, data)
}

export const sendSuccess = (
  response: Response,
  message: string,
  data: unknown = null,
): void => {
  respond(response, 200, message, data)
}

export const sendValidationError = (
  response: Response,
  message: string,
  data: unknown = null,
): void => {
  respond(response, 422, message, data)
}
