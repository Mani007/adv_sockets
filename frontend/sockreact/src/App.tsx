import { useEffect, useState } from 'react'
import {io} from 'socket.io-client'
import { Button, Container, TextField, Typography, Box } from '@mui/material';
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
  const [count, setCount] = useState<string>('')
  const [user, setUser] = useState<user>({} as user)
  const [msg, setMsg] = useState<msg>({ message: '' })
  //const socket = io('http://localhost:7000')
  // useEffect(() => {
  //   socket.on('connect', () => {
  //     console.log('Connected to the server')
  //     //console.log(`The socket id is ${socket.id}`)
  //     const newUser = { id: socket.id, msg: `${socket.id} joined the sever`, dismsg: ''}
  //     setUser(newUser)
  //   })
  //   // socket.on('welcome', (msg) => {
  //   //     console.log(msg)
  //   // })
  //   // socket.on('joinedtheserver',(msg) =>{
  //   //     //console.log(msg)
  //   //     const newUser = { id: socket.id, msg: msg, dismsg: 'welcome'}
  //   //     setUser(newUser)
  //   // })
   

  //   return () => {
  //    // setUser({ id: socket.id, msg:`${socket.id} disconnected from the server`, dismsg: 'bye'})
  //     socket.disconnect()
  //   }
  // },[])
 
  // const handleSubmit = (e: React.SyntheticEvent) => {
  //   e.preventDefault();
  //   socket.emit('message', msg.message)
  //   setMsg({ message: '' })

  // }
  useEffect( () => {
      fetch('http://localhost:7000/test').then((response) =>{
        return response.json()
      }).then((data) => {
        console.log(data);
        setCount(data);
      })
  },[])

  const handleSubmitconsole = (e: React.SyntheticEvent) => {   // This is working fine in console
    e.preventDefault();
    console.log(e)

  }
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMsg({ message: e.target.value })
    //console.log(msg);  // this is working fine
    
  }

  return (
    <>
    <Container maxWidth='sm'>
      <form onSubmit={handleSubmitconsole}>
      {/* <h1>Hello world tsx</h1> */}
      <h1>{count}</h1>
      <h6>Connected user ids are </h6>
      <p>{user.id}</p>
      {/* {user.map((user) =>{
        return <p key={user.id}>{user.id}</p>
      })} */}
      <Typography variant='h3' >Type your text below</Typography>
      <p>The message you are sending to server is ... {msg.message}</p>
      <Box 
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent:'space-between',
        alignItems: 'center',
        margin: '10px 0',
        padding: '10px',
        
        boxSizing: 'border-box'
      }}>
      <TextField name="sendmessage" value={msg.message} onChange={handleChange} id="sendmessage" placeholder="Type message here..." variant='outlined'></TextField> <br />
      <TextField name="sendmessage" value={msg.message} onChange={handleChange} id="sendmessage" placeholder="Room ID" variant='outlined'></TextField> <br />
      <TextField name="sendmessage" value={msg.message} onChange={handleChange} id="sendmessage" placeholder="Group ID" variant='outlined'></TextField> <br />
      <Button type='submit'variant="contained">SEND</Button>
      </Box>
      </form>
    </Container>
     
    </>
  )
}

export default App
