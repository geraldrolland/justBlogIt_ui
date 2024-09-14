import React from 'react'
import placeholder from "../../assets/images/imageplaceholder.png"
const Reply = ({reply}) => {
  return (
    <div className='w-[100%] flex flex-col'>
      <div className='w-[100%] flex justify-between items-center h-[40px] space-x-2 '>
         <img className='w-[40px] h-[40px] border-1px rounded-full' src={reply.user.image ? reply.user.image : placeholder} alt="" />
         <div className='w-[410px] flex justify-between items-center h-[100%] '>
          <div className='w-[320px] flex flex-col justify-center items-start h-[100%] '>
          <h1 className='dark:text-gray-400 text-gray-800  text-[16px]'>{reply.user.username}</h1>
          <h1 className='w-[60%] truncate text-gray-500  tracking-tight dark:text-gray-300 text-[13px] '>{reply.user.bio}</h1>            
          </div>
          <div className='w-[80px] h-[100%] flex justify-center'>
          <h1 className='text-gray-400 tracking-wide text-[14px]'>{reply.createdAt}</h1>
          </div>
         </div>
      </div>
      <div className='w-[410px] shadow-sm rounded-md md:ml-[66px] flex text-[14px] dark:text-gray-300  mt-1 p-2 text-gray-500  border-1px'>
        {reply.commentText}
      </div>
    </div>
  )
}

export default Reply