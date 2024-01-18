import { Response } from 'express'

const respond = (
  response: Response,
  status: number,
  message: string,
  data: unknown = null,
): Response => {
  const send = data ? { message, data } : { message }
  return response.status(status).json(send)
}

export default respond
