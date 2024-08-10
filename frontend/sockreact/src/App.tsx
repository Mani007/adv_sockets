import { useEffect, useState } from 'react'
import {io} from 'socket.io-client'
import './App.css'
// We usually emit from the frontend and listen at the backend
interface user {
  id: string;
  msg?: string;
  dismsg?: string;  // Displayed message to the user
}
function App() {
  //const [count, setCount] = useState(0)
  const [user, setUser] = useState<user>({ } as user)
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
    socket.on('joinedtheserver',(msg) =>{
        //console.log(msg)
        const newUser = { id: socket.id, msg: msg, dismsg: 'welcome'}
        setUser(newUser)
    })
   

    return () => {
     // setUser({ id: socket.id, msg:`${socket.id} disconnected from the server`, dismsg: 'bye'})
      socket.disconnect()
    }
  },[])

  return (
    <>
      <h1>Hello world tsx</h1>
      <p>{user.id}</p> <br />
      <p>{user.msg}</p> <br />
      <p>{user.dismsg}</p> 
    </>
  )
}

export default App
