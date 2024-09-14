import { FaThumbsUp } from "react-icons/fa";
import React, { useEffect, useRef, useState } from 'react'
import Reply from './Reply'
import { useMutation, useQuery } from '@tanstack/react-query';
import axios from "axios";
import "../../styles/SignUp.css"
import { LuSendHorizonal } from "react-icons/lu";
import { BsEmojiSmile } from "react-icons/bs";
import placeholder from "../../assets/images/imageplaceholder.png"
import UseRequest from '../customhooks/UseRequest';
const getMutationFunc = async (url) => {
  // const navigateToLogin = useNavigate()
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
  //const navigateToLogin = useNavigate()
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
                  //navigateToLogin("log-in")
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



const Comment = ({comment}) => {
  const replyBoxRef = useRef(null)
  const [isShowSendIcon, setIsShowSendIcon] = useState(false)
  const sendContainerRef = useRef(null)
  const sendingRef = useRef(null)
  const [isRender, setIsRender] = useState(false)
  const [isLike, setIsLike] = useState(false)
  const [likeCount, setLikeCount] = useState(0)
  const [replyCount, setReplyCount]  = useState(0)
  const commentInputRef = useRef(null)
  const [isShowSomethingWentWrong, setIsShowSomethingWentWrong] = useState(false)
  const prevImage = useRef(null)

  const [reply , setReply] = useState({
    "commentText": "",
  })

  const likeRef = useRef(null)
  const imageRef = useRef(null)
  const fetchReply = UseRequest("http://127.0.0.1:8000/comments/" + comment.commentId + "/get_replies/", "get", null, "replies/"+comment.commentId, false)
  
  const postLikeOnComment = useMutation({
    mutationFn: (() => getMutationFunc("http://127.0.0.1:8000/comments/" + comment.commentId +"/like_comment/")),
    onMutate: () => {
      setIsLike(true)
      comment.likes +=1
      likeRef.current.classList.remove("dark:text-gray-300")
      likeRef.current.classList.remove("text-gray-700")
      likeRef.current.classList.add("text-blue-700")
      likeRef.current.classList.add("dark:text-blue-500")
      setLikeCount(prev => prev + 1)
    },


    onError: (error) => {
      comment.likes -= 1
      likeRef.current.classList.add("dark:text-gray-300")
      likeRef.current.classList.add("text-gray-700")
      likeRef.current.classList.remove("text-blue-700")
      likeRef.current.classList.remove("dark:text-blue-500")
      setIsLike(false)
      setLikeCount(prev => prev - 1)
    }
  })

  const postUnlikeComment = useMutation({
    mutationFn: (() => getMutationFunc("http://127.0.0.1:8000/comments/" + comment.commentId +"/unlike_comment/")),

    onMutate: () => {
      setIsLike(false)
      setLikeCount(prev => prev - 1)
      comment.likes -= 1
      likeRef.current.classList.add("dark:text-gray-300")
      likeRef.current.classList.add("text-gray-700")
      likeRef.current.classList.remove("text-blue-700")
      likeRef.current.classList.remove("dark:text-blue-500")
    },

    onError: (error) => {
      comment.likes += 1
      setIsLike(true)
      likeRef.current.classList.remove("dark:text-gray-300")
      likeRef.current.classList.remove("text-gray-700")
      likeRef.current.classList.add("text-blue-700")
      likeRef.current.classList.add("dark:text-blue-500")
      setLikeCount(prev => prev + 1)
    }
  })



  const handleLikeComment = () => {
    if (isLike === false) {
      postLikeOnComment.mutate()
    }
    else {
      postUnlikeComment.mutate()
    }
  }

  const expandReplyContainer = (e) => {
    if (e.key === "Enter") {
      console.log("is enter")
      e.preventDefault()
      if (commentInputRef.current.value !== "") {
        postReply.mutate()
      }
    }

    if (e.target.scrollHeight < 250) {
      console.log("this container height before scroll", e.target.style.height)
      e.target.style.height = "auto"
      e.target.style.height = e.target.scrollHeight + "px"
      console.log("this is container height after scroll", e.target.style.height)
      setIsRender(!isRender)
    }
  }

  const postReply = useMutation({
    mutationFn: (() => postMutationFunc("http://127.0.0.1:8000/comments/" + comment.commentId +"/post_reply/", reply)),
    onMutate: () => {
      //sendContainerRef.current.disable = true
      commentInputRef.current.classList.remove("bg-gray-600")
      commentInputRef.current.classList.add("bg-gray-500")
      sendContainerRef.current.classList.add("hidden")
      sendContainerRef.current.classList.remove("flex")
      sendingRef.current.classList.add("flex")
      sendingRef.current.classList.remove("hidden")

    },

    onSuccess: () => {
      
      sendContainerRef.current.disable = false
      commentInputRef.current.classList.add("bg-gray-600")
      commentInputRef.current.classList.remove("bg-gray-400")
      sendContainerRef.current.classList.remove("hidden")
      sendContainerRef.current.classList.add("flex")
      sendingRef.current.classList.remove("flex")
      sendingRef.current.classList.add("hidden")
      setReply({...reply, commentText: ""})

    },

    onError: (error) =>  {
      setIsShowSomethingWentWrong(true)
      sendContainerRef.current.disable = false
      commentInputRef.current.classList.add("bg-gray-600")
      commentInputRef.current.classList.remove("bg-gray-400")
      sendContainerRef.current.classList.remove("hidden")
      sendContainerRef.current.classList.add("flex")
      sendingRef.current.classList.remove("flex")
      sendingRef.current.classList.add("hidden")
    }
  })

  const displaySendIcon = () => {
    
    if (isShowSendIcon === false && commentInputRef.current.value !== "") {
        sendContainerRef.current.classList.remove("translate-x-[50px]")
        sendContainerRef.current.classList.add("sendAnimate")
    }

    else if (commentInputRef.current.value === "") {
        sendContainerRef.current.classList.remove("sendAnimate")
        sendContainerRef.current.classList.add("translate-x-[50px]")
    }
}
  const displayReplyBox = () => {
    console.log(" is display box")
    replyBoxRef.current.classList.remove("hidden")
    commentInputRef.current.focus()
  }

  useEffect(() => {
  const textArea = document.querySelector("textarea")
  textArea.style.height = "56px"
  if (prevImage.current) {
    const userStatus = JSON.parse(sessionStorage.getItem("userStatus"))
    prevImage.current.src = userStatus.profile_image ? userStatus.profile_image : placeholder
  }

  if (imageRef.current) {
    const userStatus = JSON.parse(sessionStorage.getItem("userStatus"))
    if (userStatus) {
      imageRef.current.src = userStatus.profile_image ? userStatus.profile_image : placeholder
    }
  }

  }, [])
  return (
    <div className='w-[100%]   rounded-md  flex flex-wrap  flex-col relative'>
      <div className='w-[100%]  h-[50px]   flex justify-between items-center'>
        <img className='w-[50px] h-[50px]  rounded-full md:shadow-md' src={comment.user?.image ? comment.user.image : placeholder} alt="" />
        <div className='md:w-[480px] w-[80%]  h-[100%]  flex justify-between items-center'>
          <div className='flex justify-center items-start  h-[100%] flex-col  w-[250px]'>
            <h1 className='dark:text-gray-400 text-gray-800  md:text-[18px]'>{comment?.user.username}</h1>
            <h1 className='w-[100%] text-gray-500 truncate -mt-1 tracking-tight dark:text-gray-300 text-[14px] '>{comment?.user.bio}</h1>
          </div>
          <div className='w-[100px] h-[100%]   flex justify-center items-start'>
            <h1 className='text-gray-400 tracking-wide'>{comment?.createdAt}</h1>
          </div>
        </div>
      </div>
      <h1 className='md:w-[480px] w-[100%]  border-1px md:ml-[68px] mt-2 rounded-[6px] right-0 top-[50px] flex pt-4 md:shadow-md text-gray-600 dark:text-gray-300 md:p-4 '>
        {comment?.commentText}
      </h1>
      <div className='w-[170px] mb-4 m-4 flex justify-between items-center h-[30px] md:ml-[380px]'>
        <div className='w-[90px] flex justify-center items-center h-[100%] '>
          <button ref={likeRef} onClick={() => {handleLikeComment()}} className='dark:text-gray-300 cursor-pointer text-gray-700 capitalize text-[14px]'>like</button>
          <div className='w-[5px] h-[5px] ml-1 bg-gray-700 dark:bg-gray-300 rounded-full'></div>
          <h1 className='dark:text-gray-400 text-gray-800 ml-1 mr-1 text-[14px] font-semibold proportional-nums'>{comment.likes > 0 ? comment.likes : null}</h1>
          {
            <div className="w-[15px] h-[15px] -mt-[3px]  flex justify-center items-center">
            <FaThumbsUp className=" text-[13px] text-blue-600" />
            </div>
          }
        </div>
        <div className='w-[80px] flex justify-center items-center h-[100%]'>
        <button onClick={() => {
          fetchReply.refetch()
          displayReplyBox()
          }} className='dark:text-gray-300 text-gray-700 capitalize text-[14px]'>reply</button>
        { comment?.replyCount > 0 ?
        <h1 className='dark:text-gray-400 text-gray-800 ml-1 text-[14px] font-semibold proportional-nums'>{comment?.replyCount > 0 ? comment.replyCount : null}</h1> : null
        }
        </div>
      </div>
      <div ref={replyBoxRef} className="md:w-[480px] w-[100%]  hidden overflow-x-hidden md:ml-[68px] ">
        <div className="w-[100%] relative justify-between  flex ">
          <img ref={imageRef} className="w-[50px] h-[50px] border-1px  rounded-full" src="" alt="" />
          <textarea  ref={commentInputRef} value={reply.commentText} onChange={(e) => {
            setIsShowSomethingWentWrong(false)
            displaySendIcon()
            setReply({...reply, commentText: e.target.value})
            }} onKeyDown={(e) => expandReplyContainer(e)} className="md:w-[380px] w-[85%] overflow-y-hidden resize-none bg-gray-600 dark:text-gray-300 pl-4 h-[50px] pt-2  text-gray-400 focus:outline-none rounded-md pb-4 " name=""  id="" placeholder="Add reply here ..."></textarea>
        </div>
        { postReply.isError && isShowSomethingWentWrong ? 
        <small className="absolute w-[260px] ml-[100px] mt-4 flex justify-center items-center border-1px text-red-600">
        something went wrong please try again...
      </small> : null
        }

        <div ref={sendContainerRef} className='w-[100px]    rounded-md h-[35px] flex justify-between items-center  mt-2  top-[50px] right-0 ml-[75%]  md:ml-[380px] translate-x-[50px] transform '>
        <div className='h-[100%] relative  w-[50px] flex justify-center items-center '>
        <BsEmojiSmile className='text-gray-700 font-bold cursor-pointer dark:text-gray-300 text-[25px]' />
        </div>
        <div onClick={() => postReply.mutate()} className='h-[100%] w-[50px]  flex justify-center cursor-pointer items-center'>
        <LuSendHorizonal className='text-gray-700 font-semibold dark:text-gray-300 text-[25px]' />
        </div>
        </div>
        <div ref={sendingRef} className='w-[100px]    rounded-md h-[35px] hidden justify-center items-center  mt-2  top-[50px] right-0  border-1px ml-[380px] text-gray-500 dark:text-gray-400 '>
          sending ...
        </div>
        <div className="w-[100%] flex flex-col   mt-2">
          { 
          
          fetchReply?.isSuccess ? fetchReply?.data?.map(reply => <Reply key={reply.commentId} reply={reply}/>) : null
          
          }

        </div>
      </div>
    </div>
  )
}

export default Comment
