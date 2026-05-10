import React, { useState } from 'react'
import {Link, useNavigate} from 'react-router-dom'
import axios from "axios"
import toast from "react-hot-toast"

const Signup = () => {
  const navigate = useNavigate()
  const [user, setUser] = useState({
    fullName: "",
    username: "",
    password: "",
    confirmPassword: "",
    gender: ""
  })

  const handleCheckbox = (gender)=>{
    setUser({...user, gender})
  }

  const onSubmitHandler = async (e)=>{
    e.preventDefault()
    console.log(user)
    try {
      const res = await axios.post(`http://localhost:8080/api/v1/user/register`, user)
      if(res.data.success){
        toast.success(res.data.message)
      }
      navigate("/login")
    } catch (error) {
      console.log(error.message)
      toast.error(error.response.data.message)
    }
    setUser({fullName: "",
    username: "",
    password: "",
    confirmPassword: "",
    gender: ""})
  }
  return (
    <div className="min-w-96 mx-auto">
      <div className="w-full p-6 rounded shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-10 border border-gray-100">
        <h1 className="text-3xl font-bold text-center text-white">Signup</h1>
        <form onSubmit={onSubmitHandler} action="">
          <div>
            <label className="label p-2">
              <span className="text-base label-text">Full Name</span>
            </label>
            <input onChange={(e)=>setUser({...user, fullName: e.target.value})} value={user.fullName} className="w-full input inputbordered h-10" type="text" placeholder="Enter your full name"/>
          </div>
          <div>
            <label className="label p-2">
              <span className="text-base label-text">Username</span>
            </label>
            <input onChange={(e)=>setUser({...user, username: e.target.value})} value={user.username} className="w-full input inputbordered h-10" type="text" placeholder="Enter your username"/>
          </div>
          <div>
            <label className="label p-2">
              <span className="text-base label-text">Password</span>
            </label>
            <input onChange={(e)=>setUser({...user, password: e.target.value})} value={user.password} className="w-full input inputbordered h-10" type="password" placeholder="Enter your password"/>
          </div>
          <div>
            <label className="label p-2">
              <span className="text-base label-text">Confirm Password</span>
            </label>
            <input onChange={(e)=>setUser({...user, confirmPassword: e.target.value})} value={user.confirmPassword} className="w-full input inputbordered h-10" type="password" placeholder="Confirm password"/>
          </div>
          <div className='flex items-center my-4'>
            <div className='flex items-center gap-1'>
              <p>Male</p>
            <input 
            type="checkbox"
            checked={user.gender==="male"}
            onChange={()=>handleCheckbox("male")}
              className="checkbox mx-1" />
            </div>
            <div className='flex items-center gap-1'>
              <p>Female</p>
            <input 
            type="checkbox"
            checked={user.gender==="female"}
            onChange={()=>handleCheckbox("female")} 
            className="checkbox mx-1" />
            </div>
          </div>
          <div>
          <button type='submit' className="btn  btn-block font-bold bg-black text-white">Signup</button>
          </div>
          <div className='mt-4 flex justify-center'>
            Already have a account?  <Link to={"/login"} className='font-bold ml-2'>Please Login</Link>
          </div>
          
        </form>
      </div>
    </div>
  )
}

export default Signup
