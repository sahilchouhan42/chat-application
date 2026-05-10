import React, { useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'

const Message = ({message}) => {
  console.log(message)
  const {authUser, selectedUser} = useSelector(store=>store.user)
  
  const scroll = useRef()
  useEffect(()=>{
    scroll.current?.scrollIntoView({behavior: "smooth"})
  }, [message])
  return (
    <>
   
<div ref={scroll} className={`chat ${String(authUser?._id)===String(message?.senderId)?'chat-end': 'chat-start'}`}>
  <div className="chat-image avatar">
    <div className="w-10 rounded-full">
      <img
        alt="Tailwind CSS chat bubble component"
        src={message?.senderId===authUser?._id?authUser?.profilePhoto:selectedUser?.profilePhoto}
      />
    </div>
  </div>
  <div className="chat-header">
    {/* <time className="text-xs opacity-50">12:46</time> */}
    <time className="text-xs opacity-50">
  {new Date().toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  })}
</time>
  </div>
  <div className="chat-bubble">{message?.message}</div>
</div>
</>
  )
}

export default Message
