import express, { Response, Request } from 'express'
import http from 'http'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import compression from 'compression'
import cors from 'cors'
import connectDb from './models/connection'
import dotenv from 'dotenv'
import router from './router/index'
import { sendNotFound, sendSuccess } from './utils/errorCodes'

dotenv.config()

const app = express()

app.use(
  cors({
    credentials: true,
  }),
)

app.use(compression())
app.use(cookieParser())
app.use(bodyParser.json())

const server = http.createServer(app)

const port = process.env.PORT || 4001

app.get('/', (req: Request, res: Response) => {
  return sendSuccess(res, 'Welcome to country service')
})
app.use('/api', router())
app.use('*', (req: Request, res: Response) => {
  return sendNotFound(res, 'Not Found')
})

server.listen(port, () => {
  connectDb()
  console.log(`Server running on http://localhost:${port}`)
})
