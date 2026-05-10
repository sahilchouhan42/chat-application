import React, { useEffect } from 'react'
import axios from 'axios'
import {useDispatch} from "react-redux"
import { setOtherUser } from '../redux/userSlice'

const useGetOtherUsers = () => {
    const dispatch = useDispatch()
  useEffect(()=>{
    const fetchOtherUsers = async ()=>{
        try {
            axios.defaults.withCredentials = true;
            const res = await axios.get("http://localhost:8080/api/v1/user", {
                withCredentials:true
            })
            console.log(res)

            //stored in store
            dispatch(setOtherUser(res.data.otherUsers))
        } catch (error) {
            console.log(error.message)
        }
    }
    fetchOtherUsers()
  }, [])
}

export default useGetOtherUsers
