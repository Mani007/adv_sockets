import express from'express';
import dotenv from 'dotenv';
dotenv.config()
import cors from 'cors';

import {Server} from 'socket.io';
import { createServer} from 'http'

const app = express()
app.use(cors())
const server = new createServer(app)
const io = new Server(server,{
    cors: {
      origin: 'http://localhost:5173', // make sure this url is correct
      methods: ['GET', 'POST'],
      credentials: true,
    }
  });

const port = process.env.PORT

app.get('/', (req, res) => {
  res.send('Hello World!!!!!!')
})

io.on('connection', (socket) => {
    console.log('A user connected')
    console.log(`ID is ${socket.id}`)
    socket.emit('welcome',"Welcome you are connected to the best server")
})

// app.listen(port, () => {
//   console.log(`Example app listening on port ${port}`)
// })

server.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`)
})