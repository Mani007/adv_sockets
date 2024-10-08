import express, { json } from'express';
import dotenv from 'dotenv';
dotenv.config()
import bodyParser from "body-parser";
import cors from 'cors';
// We usually emit from the frontend and listen at the backend
import {Server} from 'socket.io';
import { createServer} from 'http'

const app = express()
app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
//app.use(express-json())
const server = new createServer(app)
const io = new Server(server,{
    cors: {
      origin: ['http://localhost:5173', 'http://192.168.1.229:5173'], // make sure this url is correct
      methods: ['GET', 'POST'],
      //credentials: true,
    }
  });

const port = process.env.PORT

app.get('/test', (req, res) => {
  res.sendJSON('Hello World!!!!!!')
})

io.on('connection', (socket) => {
    console.log('A user connected')
    console.log(`ID is ${socket.id}`)
    socket.emit('welcome',`Welcome you are connected with id ${socket.id} `)
    socket.broadcast.emit('joinedtheserver',`${socket.id} joined the server `)
    
    socket.on('message', (msg) => {
      console.log(`Message from ${socket.id}: ${msg}`)
      //io.emit('message', {id: socket.id, message: msg})
    })
    socket.on('disconnect', () => {
      console.log(`${socket.id} user disconnected`)
      //socket.broadcast.emit('lefttheserver',`${socket.id} left the server `)
    })
})

// app.listen(port, () => {
//   console.log(`Example app listening on port ${port}`)
// })

server.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`)
})