
import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import HomePage from './components/HomePage'
import Login from './components/Login'
import Signup from './components/Signup'
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setAuthUser, setOnlineUsers } from "./redux/userSlice"
import io from 'socket.io-client'
import { useState } from 'react'
import { setSocket } from './redux/socketSlice'
import Home from './components/Home'


const router = createBrowserRouter([
  { path: "/", element: <Home /> },
  {path:"/dashboard", element: <HomePage />},
  { path: "/register", element: <Signup /> },
  { path: "/login", element: <Login /> }
])

function App() {
  const { authUser } = useSelector(store => store.user)
  const {socket} = useSelector(store=>store.socket)
  
  const dispatch = useDispatch();

  useEffect(() => {
    const user = JSON.parse(
      localStorage.getItem("user")
    );
    if (user) {
      dispatch(setAuthUser(user));
    }
  }, []);

  useEffect(() => {
    if (authUser) {
      const socket = io('https://chat-application-1-hrbk.onrender.com', {
        query:{
          userId: authUser._id
        }
      })
      dispatch(setSocket(socket))
      socket.on('getOnlineUsers', (onlineUsers)=>{
        dispatch(setOnlineUsers(onlineUsers))
      })
      return ()=> socket.close()
    }
    else{
      if(socket){
        socket.close()
        dispatch(setSocket(null))
      }
    }
  }, [authUser])

  return (
    <div className='p-4 h-screen flex items-center justify-center '>
      <RouterProvider router={router} />
    </div>
  )
}

export default App
