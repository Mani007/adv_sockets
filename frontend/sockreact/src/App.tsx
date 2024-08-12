import { useEffect, useState } from 'react'
import {io} from 'socket.io-client'
import { Button, Container, TextField, Typography } from '@mui/material';
import './App.css'
// We usually emit from the frontend and listen at the backend
interface user {
  id: string;
  msg?: string;
  dismsg?: string;  // Displayed message to the user
}
 type msg = {
    message: string;
 }
function App() {
  //const [count, setCount] = useState(0)
  const [user, setUser] = useState<user>({ } as user)
  const [msg, setMsg] = useState<msg>({ message: '' })
  const socket = io('http://localhost:7000')
  useEffect(() => {
    socket.on('connect', () => {
      console.log('Connected to the server')
      //console.log(`The socket id is ${socket.id}`)
      const newUser = { id: socket.id, msg: `${socket.id} joined the sever`, dismsg: ''}
      setUser(newUser)
    })
    // socket.on('welcome', (msg) => {
    //     console.log(msg)
    // })
    // socket.on('joinedtheserver',(msg) =>{
    //     //console.log(msg)
    //     const newUser = { id: socket.id, msg: msg, dismsg: 'welcome'}
    //     setUser(newUser)
    // })
   

    return () => {
     // setUser({ id: socket.id, msg:`${socket.id} disconnected from the server`, dismsg: 'bye'})
      socket.disconnect()
    }
  },[])
 
  const handleSubmit = (e) => {
    e.preventDefault();
    socket.emit('message', msg.message)
    setMsg({ message: '' })

  }
  const handleChange = (e) => {
    setMsg({ message: e.target.value })
    //console.log(msg);  // this is working fine
    
  }

  return (
    <>
    <Container maxWidth='sm'>
      <form onSubmit={handleSubmit}>
      {/* <h1>Hello world tsx</h1> */}
      <Typography variant='h3' >Type your text below</Typography>
      <p>The message you are sending to server is ... {msg.message}</p>
      <TextField name="sendmessage" value={msg.message} onChange={handleChange} id="sendmessage" placeholder="Type here..." variant='outlined'></TextField>
      <Button type='submit'>SEND</Button>
      </form>
    </Container>
     
    </>
  )
}

export default App
