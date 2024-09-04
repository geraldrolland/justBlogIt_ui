import React, { useEffect } from 'react'
import { useContext } from 'react'
import { theme } from '../../App'
import "../../styles/SignUp.css"
import { IoShareSocialOutline } from "react-icons/io5";
const UploadPage = () => {
  const {setIsScrollTop} = useContext(theme)

  const uploadImage = () => {
    const fileImage = document.getElementById('image')
    fileImage.click()
  } 

  const setImage = (e) => {
    const prevImage = document.getElementById("prevImage")
    if (e.target.files[0]) {
      console.log("error")
      const reader = new FileReader()
      reader.onload = (e) => {
        prevImage.src = e.target.result
      }

      reader.readAsDataURL(e.target.files[0])
    }
  } 

  useEffect(() => {
    setIsScrollTop(true)
  }, [])
  return (
    <div className='w-[100%] tab-container h-[100%] overflow-y-scroll '>
      <div className='w-[100%] h-[1000px]'>
        <div className='w-[90%] h-[50px] mt-4 flex justify-end items-center mx-auto'>
          <img className='w-[50px] h-[50px] border-1px rounded-full' src="" alt="" />
        </div>
        <div className='w-[90%] h-[50px] mt-4  mx-auto flex justify-between items-center '>
          <h1 className='capitalize text-gray-500 dark:text-gray-400 font-semibold tracking-wider text-[22px]'>title</h1>
          <div className='w-[10px] h-[10px] rounded-full bg-gray-500'></div>
          <input className='w-[400px] border-1px h-[50px] rounded-md pl-4 focus:outline-none tracking-wide bg-gray-300' type="text" placeholder='Add post title here ...' />
        </div>
        <img id='prevImage' src='' alt='' className='w-[90%] bg-cover rounded-lg mt-4 mx-auto block h-[400px] border-1px'/>
        <div className='w-[90%] h-[50px] mx-auto  flex justify-end items-center'>
          <button onClick={() => uploadImage()} className='capitalize w-[150px] h-[40px] text-gray-500 border-1px rounded-md text-[18px]'>upload image</button>
          <input onChange={(e) => setImage(e)} className='hidden' id='image' type="file" placeholder='' />
        </div>
        <textarea className='w-[90%] tab-container block mt-4 resize-none h-[300px]  mx-auto pt-2 focus:outline-none bg-gray-300 text-gray-600 dark:text-gray-400 dark:bg-gray-600 pl-4 rounded-lg' placeholder='Add description here ...'>
        </textarea>
        <div className='w-[90%] h-[50px] mx-auto mt-4 flex justify-between items-center'>
          <div className='w-[250px] flex justify-between items-center h-[100%] '>
            <button className='w-[100px] h-[40px]  rounded-md capitalize tracking-wide bg-gray-400 text-gray-300 font-semibold'>edit</button>
            <button className='w-[100px] h-[40px] rounded-md capitalize tracking-wide bg-gray-400 text-gray-300 font-semibold dark:text-red-600'>delete</button>
          </div>
          <div className='w-[80px]  flex justify-end items-center  h-[100%] '>
            <IoShareSocialOutline className='text-[35px] text-gray-600 dark:text-gray-400' />
          </div>
        </div>
      </div>
    </div>
  )
}

export default UploadPage
