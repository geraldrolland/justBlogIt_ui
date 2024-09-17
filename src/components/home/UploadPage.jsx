import React, { useEffect, useRef, useState } from 'react'
import "../../styles/SignUp.css"
import axios from 'axios'
import UseMutationFunc from '../customhooks/UseMutationFunc'
import { useMutation } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import placeholder from "../../assets/images/imageplaceholder.png"
const getMutationFunc = async (url) => {
  //const navigateToLogin = useNavigate()
  try {
      const userStatus = JSON.parse(sessionStorage.getItem("userStatus"))
      const config = {
          headers: {
              Authorization: "Bearer " + userStatus.access
          }
      }
      const response = await axios.get(url, config)
      if (response.status === 200)
      return response.data
  }
  catch(error) {
      if (error.response.status === 401) {
          const userStatus = JSON.parse(sessionStorage.getItem("userStatus"))
          if (userStatus && userStatus.refresh) {
              try {
                  const response = axios.post("http://127.0.0.1:8000/token-refresh/", {refresh: userStatus.refresh})
                  if (response.status === 200) {
                      userStatus.access = response.data.access
                      sessionStorage.setItem("userStatus", JSON.stringify(userStatus))
                      const config = {
                          headers: {
                              Authorization: "Bearer " + response.data.access
                          }
                      }
                      try {
                          const response = await axios.get(url, config)
                          if (response.status === 200) {
                              return response.data
                          }
                          else {
                              throw new Error("could not authenticate")
                          }
                      }
                      catch(error) {
                          throw new Error("something went wrong")
                      }
                  }
              }
              catch(error) {
                  //navigateToLogin("log-in")
                  throw new Error("could not refresh access token")
              }
          }
      }
      else {
          throw new Error("something went wrong")
      }
  }

}


const postMutationFunc = async (url, data) => {
  try {
    console.log(data)
      console.log("tried")
      const userStatus = JSON.parse(sessionStorage.getItem("userStatus"))
      const config = {
          headers: {
              Authorization: "Bearer " + userStatus.access
          }
      }
      console.log("this is the point")
      const response = await axios.post(url, data, config)
      if (response.status === 200 || response.status === 201)
      return response.data
  }
  catch(error) {
      if (error?.response?.status === 401) {
          const userStatus = JSON.parse(sessionStorage.getItem("userStatus"))
          if (userStatus && userStatus.refresh) {
              try {
                  const response = axios.post("http://127.0.0.1:8000/token-refresh/", {refresh: userStatus.refresh})
                  if (response.status === 200) {
                      userStatus.access = response.data.access
                      sessionStorage.setItem("userStatus", JSON.stringify(userStatus))
                      const config = {
                          headers: {
                              Authorization: "Bearer " + response.data.access
                          }
                      }
                      try {
                          const response = await axios.get(url, data,  config)
                          if (response.status === 200) {
                              return response.data
                          }
                          else {
                              throw new Error("could not authenticate")
                          }
                      }
                      catch(error) {
                          throw new Error("something went wrong")
                      }
                  }
              }
              catch(error) {
                  throw new Error("could not refresh access token")
              }
          }
      }
      else {
          console.log(error)
          throw new Error("something went wrong")
      }
  }

}

const UploadPage = () => {
  const imageRef = useRef(null)
  const navigateToHome = useNavigate()
  const [post, setPost] = useState({
    postImage: "",
    postTitle: "",
    postText: "",
  })

  const handleUploadImage = () => {
    const file = document.getElementById('file')
    file.click()
  }

  const setPrevImage = (e) => {
    if (e.target.files[0]) {
      const reader = new FileReader()
      reader.onload = (e) => {
        const prevImage = document.getElementById("prevImage")
        prevImage.classList.remove("hidden")
        prevImage.src = e.target.result
        setPost({...post, postImage: e.target.result})
      }
      reader.readAsDataURL(e.target.files[0])
    }
  }

  

  const createPost = useMutation({
    mutationFn: async () => {
      const response = await postMutationFunc("http://127.0.0.1:8000/posts/create_post/", post)
      return response.data
    },

    onSuccess: (data) => {
      navigateToHome("/home")
    },

    onError: (error) => {
      console.log(error)
    }
  })
  
  useEffect(() => {
    const userStatus = JSON.parse(sessionStorage.getItem("userStatus"))
    if (imageRef.current) {
      imageRef.current.src = userStatus.profile_image ? userStatus.profile_image : placeholder
    }
  }, [])

  return (
    <div className='w-[100%] h-[100%] tab-container  overflow-y-scroll rounded-md'>
      <div className='w-[100%] rounded-md h-[120%] '>
        <div className='w-[95%] mt-2 mx-auto h-[50px]  flex justify-end items-center'>
          <img ref={imageRef} className='w-[50px] object-contain h-[50px] rounded-full' src="" alt="" />
        </div>
        <input onChange={(e) => setPrevImage(e)} id='file' className='hidden' type="file" />
        <img id='prevImage' src='' className='w-[300px] object-fill hidden  bg-cover mt-10 rounded-md h-[300px] border-1px mx-auto'/>
        <button onClick={() => {handleUploadImage()}} className='w-[120px] bg-gray-500 ml-[2.5%] mt-4 h-[35px]  dark:bg-gray-600 dark:text-gray-300 rounded-md text-gray-100 capitalize'>
          upload image
        </button>
        <input value={post.postTitle} onChange={(e) => setPost({...post, postTitle: e.target.value})} className='w-[95%] mx-auto mt-8 focus:outline-none dark:bg-gray-700 dark:text-gray-300 rounded-md border-gray-700 pl-4 h-[45px] capitalize block border-1px' type="text" placeholder='Add title here ...' />
        <textarea value={post.postText} onChange={(e) => setPost({...post, postText: e.target.value})} className='w-[95%] tab-container h-[250px] border-1px block mx-auto mt-5 focus:outline-none dark:bg-gray-700 dark:text-gray-300 rounded-md pl-4 pt-2 border-gray-700 resize-none' placeholder='Add Description Here ...' name="" id=""></textarea>
        <button onClick={() => createPost.mutate()} className='w-[100px] h-[40px]  ml-[2.5%] mt-5 mb-5 rounded-md bg-blue-700 dark:bg-blue-800 text-gray-100 capitalize'>
          {createPost.isPending ? "posting ..." : "post"}
        </button>
      </div>
    </div>
  )
}

export default UploadPage; 