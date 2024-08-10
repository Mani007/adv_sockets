import { useEffect, useState } from 'react'
import {io} from 'socket.io-client'
import './App.css'

function App() {
  //const [count, setCount] = useState(0)
  const socket = io('http://localhost:7000')
  useEffect(() => {
    socket.on('connect', () => {
      console.log('Connected to the server')
      console.log(`The socket id is ${socket.id}`)
    })
    socket.on('welcome', (msg) => {
        console.log(msg)
    })
    // socket.on('disconnect', () => {
    //   console.log('Disconnected from the server')
    // })

    // return () => {
    //   socket.disconnect()
    // }
  },[])

  return (
    <>
      <h1>Hello world tsx</h1>
    </>
  )
}

export default App
