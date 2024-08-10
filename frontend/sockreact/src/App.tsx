import { useState } from 'react'
import {io} from 'socket.io-client'
import './App.css'

function App() {
  //const [count, setCount] = useState(0)
  const socket = io('http://localhost:7000')

  return (
    <>
      <h1>Hello world tsx</h1>
    </>
  )
}

export default App
