import React from 'react'
import "../../styles/SignUp.css"
const LogInLoader = () => {
  return (
    <div className='w-[30px] rounded-full backdrop-filter backdrop-blur-lg bg-gray-100 relative h-[30px]'>
        <div className='w-[10px] absolute top-0 left-0 bg-gradient-to-r from-gray-300 to-gray-500 rounded-full box1 h-[10px]'></div>
        <div className='w-[10px] bg-gradient-to-r from-gray-300 absolute  right-0 bottom-0 box2 to-gray-500 rounded-full  h-[10px]'></div>
    </div>
  )
}

export default LogInLoader