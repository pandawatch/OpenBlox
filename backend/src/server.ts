import cors from 'cors'
import express from 'express'
import { createServer } from 'node:http'
import { Server } from 'socket.io'
import { registerRealtime } from './realtime/registerRealtime.js'

const app = express()
const httpServer = createServer(app)
const io = new Server(httpServer, {
  cors: { origin: 'http://localhost:5173' },
})
const port = Number(process.env.PORT ?? 3001)

app.use(cors())
app.use(express.json())

app.get('/', (_request, response) => {
  response.json({
    service: 'openblox-backend',
    status: 'ok',
    frontend: 'http://localhost:5173',
    health: 'http://localhost:3001/health',
  })
})

app.get('/health', (_request, response) => {
  response.json({ service: 'openblox-backend', status: 'ok', version: '0.1.0' })
})

registerRealtime(io)

httpServer.listen(port, () => {
  console.log(`OpenBlox backend listening on http://localhost:${port}`)
})
