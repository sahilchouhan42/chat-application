import React, { useState } from 'react'
import { ImSearch } from "react-icons/im";
import OtherUsers from './OtherUsers';
import axios from 'axios';
import toast from 'react-hot-toast'
import {useNavigate} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { setAuthUser, setOtherUser } from '../redux/userSlice';

const Sidebar = () => {
  const [search, setSearch] = useState("")
  const [filteredUsers, setFiltredUsers] = useState([])
  const dispatch = useDispatch()
  const {otherUser} = useSelector(store=>store.user)
  const navigate = useNavigate()
  const logoutHandler = async ()=>{
    try {
      const res = await axios.get('http://localhost:8080/api/v1/user/logout')
      toast.success(res.data.message)
      dispatch(setAuthUser(null))
      navigate('/')
    } catch (error) {
      console.log(error.message)
      toast.error(error.response.data.message)
    }
  }
  const searchSubmitHandler = (e)=>{
    try {
      e.preventDefault()
    const conversationUser = otherUser?.find((user)=>user.fullName.toLowerCase().includes(search.toLowerCase()))
    if (conversationUser){
      dispatch(setOtherUser([conversationUser]))
    }else{
      toast.error("User not found")
    }
    } catch (error) {
      console.log(error.message)
    }
  }
  return (
    <div className='border-r border-slate-500 p-4 flex flex-col'>
      <form onSubmit={searchSubmitHandler} action="" className='flex items-center gap-2'>
        <input
        value={search}
        onChange={(e)=>setSearch(e.target.value)}
        className='input input-bordered rounded-md' type="text" 
        placeholder='Search...' />
        <button type='submit' className='btn  bg-slate-500 text-white'><ImSearch className='w-6 h-6 outline-none'  /></button>
      </form>
      <div className='divider px-3'>OR</div>
         <div className="flex-1 overflow-hidden">
         <OtherUsers />
         </div>
         <button onClick={logoutHandler} className='btn btn-sm mt-5'>Logout</button>
      </div>
  )
}

export default Sidebar
