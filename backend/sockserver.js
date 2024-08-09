import express from'express';
import dotenv from 'dotenv';
dotenv.config()

import {Server} from 'socket.io';
import { createServer} from 'http'

const app = express()
const server = new createServer(app)
const io = new Server(server)
const port = process.env.PORT

app.get('/', (req, res) => {
  res.send('Hello World!')
})

io.on('connection', (socket) => {
    console.log('A user connected')
    console.log(`ID is ${socket.id}`)
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})