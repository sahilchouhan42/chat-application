import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from "axios"
import toast from "react-hot-toast"
import { useDispatch } from "react-redux"
import { setAuthUser } from '../redux/userSlice.js'


const Login = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [user, setUser] = useState({
    username: "",
    password: "",
  })

  const onSubmitHandler = async (e) => {
    e.preventDefault()
    try {
      const res = await axios.post(`https://chat-application-1-hrbk.onrender.com/api/v1/user/login`, user, { withCredentials: true })
      if (res.data.success) {
        localStorage.setItem(
          "user",
          JSON.stringify(res.data.user)
        );
        toast.success(res.data.message)
      }
      console.log(res.data)
      dispatch(setAuthUser(res.data.user))
      navigate("/dashboard")
    } catch (error) {
      console.log(error.message)
      toast.error(error.response.data.message)
    }
    setUser({
      username: "",
      password: "",
    })
  }

  return (
    <div className="min-w-96 mx-auto">
      <div className="w-full p-6 rounded shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-10 border border-gray-100">
        <h1 className="text-3xl font-bold text-center text-white">Login</h1>
        <form onSubmit={onSubmitHandler} action="">
          <div>
            <label className="label p-2">
              <span className="text-base label-text">Username</span>
            </label>
            <input value={user.username} onChange={(e) => setUser({ ...user, username: e.target.value })} className="w-full input inputbordered h-10" type="text" placeholder="Enter your username" />
          </div>
          <div>
            <label className="label p-2">
              <span className="text-base label-text">Password</span>
            </label>
            <input value={user.password} onChange={(e) => setUser({ ...user, password: e.target.value })} className="w-full input inputbordered h-10" type="password" placeholder="Enter your password" />
          </div>
          <div className='flex items-center my-4'>
          </div>
          <div>
            <button type='submit' className="btn  btn-block font-bold bg-black text-white">Login</button>
          </div>
          <div className='mt-4 flex justify-center'>
            Don't have an account?  <Link to={"/login"} className='font-bold ml-2'>Please Signup</Link>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Login
