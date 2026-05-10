import React from 'react'
import OtherUser from './OtherUser'
import useGetOtherUsers from '../hooks/useGetOtherUsers'
import { useSelector } from 'react-redux'

const OtherUsers = () => {
  //custom hooks  
  useGetOtherUsers()
  const {otherUser} = useSelector(store=>store.user)
  // console.log(otherUser)
  if (!otherUser) return; //early return in react
  return (
    <div className='h-full overflow-y-scroll'>
      {
        otherUser?.map((user)=>{
          return (
      <OtherUser key={user._id} user={user} />

          )
        })
      }
      
    </div>
  )
}

export default OtherUsers
