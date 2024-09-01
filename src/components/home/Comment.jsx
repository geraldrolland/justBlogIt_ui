import { FaThumbsUp } from "react-icons/fa";
import React, { useEffect, useRef, useState } from 'react'
import Reply from './Reply'
import { useMutation, useQuery } from '@tanstack/react-query';
import axios from "axios";
import "../../styles/SignUp.css"
import { LuSendHorizonal } from "react-icons/lu";
import { BsEmojiSmile } from "react-icons/bs";
const Comment = () => {
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
  const postLikeOnComment = useMutation({
    mutationFn: async () => {
        const response = await axios.post("")
        return response.data
    },

    onMutate: () => {
      setIsLike(true)
     
      const like = document.getElementById("like")
      like.classList.remove("dark:text-gray-300")
      like.classList.remove("text-gray-700")
      like.classList.add("text-blue-700")
      like.classList.add("dark:text-blue-500")
      setLikeCount(prev => prev + 1)
    },

    onError: (error) => {
      console.log("like error")
      const like = document.getElementById("like")
      like.classList.add("dark:text-gray-300")
      like.classList.add("text-gray-700")
      like.classList.remove("text-blue-700")
      like.classList.remove("dark:text-blue-500")
      setIsLike(false)
      setLikeCount(prev => prev - 1)
    }
  })

  const postUnlikeComment = useMutation({
    mutationFn: async () => {
        const response = await axios.post("")
        return response.data
    },

    onMutate: () => {
      setIsLike(false)
      setLikeCount(prev => prev - 1)
      const like = document.getElementById("like")
      like.classList.add("dark:text-gray-300")
      like.classList.add("text-gray-700")
      like.classList.remove("text-blue-700")
      like.classList.remove("dark:text-blue-500")
    },

    onError: (error) => {
      setIsLike(true)
      console.log("unlike error")
      const like = document.getElementById("like")
      like.classList.remove("dark:text-gray-300")
      like.classList.remove("text-gray-700")
      like.classList.add("text-blue-700")
      like.classList.add("dark:text-blue-500")
      setLikeCount(prev => prev + 1)
    }
  })

  const {data: comments, isError, isPending, isSuccess, isFetching, refetch} = useQuery({
    queryKey: ["replies"],
    queryFn: async () => {
      const response = await axios.get("")
      return response
    },

    enabled: false,
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
    mutationFn: async () => {
      const response = await axios.post("")
      return response.data
    },

    onMutate: () => {
      sendContainerRef.current.disable = true
      commentInputRef.current.classList.remove("bg-gray-600")
      commentInputRef.current.classList.add("bg-gray-400")
      sendContainerRef.current.classList.add("hidden")
      sendContainerRef.current.classList.remove("flex")
      sendingRef.current.classList.add("flex")
      sendingRef.current.classList.remove("hidden")

    },

    onSuccess: () => {
      commentInputRef.current.value = ""
      sendContainerRef.current.disable = false
      commentInputRef.current.classList.add("bg-gray-600")
      commentInputRef.current.classList.remove("bg-gray-400")
      sendContainerRef.current.classList.remove("hidden")
      sendContainerRef.current.classList.add("flex")
      sendingRef.current.classList.remove("flex")
      sendingRef.current.classList.add("hidden")

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
  }, [])
  return (
    <div className='w-[100%] rounded-md bg-amber-50 flex flex-wrap  flex-col relative'>
      <div className='w-[100%] h-[50px]   flex justify-between items-center'>
        <img className='w-[50px] h-[50px] border-1px rounded-full md:shadow-md' src="" alt="" />
        <div className='md:w-[480px] w-[80%]  h-[100%]  flex justify-between items-center'>
          <div className='flex justify-center items-start  h-[100%] flex-col  w-[250px]'>
            <h1 className='dark:text-gray-400 text-gray-800  md:text-[18px]'>Onyeka Gerald Ujowundu</h1>
            <h1 className='w-[100%] text-gray-500 -mt-1 tracking-tight dark:text-gray-300 text-[14px] '>I love to code and play games</h1>
          </div>
          <div className='w-[100px] h-[100%]  flex justify-center items-start'>
            <h1 className='text-gray-400 tracking-wide'>now</h1>
            <h1 className='text-gray-400 flex justify-center items-end tracking-wide text-[19px] -ml-2  w-[40px] h-[18px]'>...</h1>
          </div>
        </div>
      </div>
      <h1 className='md:w-[480px] w-[100%]  border-1px md:ml-[68px] mt-2 rounded-[6px] right-0 top-[50px] flex pt-4 md:shadow-md text-gray-600 dark:text-gray-300 md:p-4 '>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.

Curabitur pretium tincidunt lacus. Nulla gravida orci a odio. Nullam varius, turpis et commodo pharetra, est eros bibendum elit, nec luctus magna felis sollicitudin mauris. Integer in mauris eu nibh euismod gravida. Duis ac tellus et risus vulputate vehicula. Donec lobortis risus a elit. Etiam tempor. Ut ullamcorper, ligula eu tempor congue, eros est euismod turpis, id tincidunt sapien risus a quam. Maecenas fermentum consequat mi. Donec fermentum. Pellentesque malesuada nulla a mi. Duis sapien sem, aliquet nec, commodo eget, consequat quis, neque. Aliquam faucibus, elit ut dictum aliquet, felis nisl adipiscing sapien, sed malesuada diam lacus eget erat. Cras mollis scelerisque nunc. Nullam arcu. Aliquam consequat.

Curabitur augue lorem, dapibus quis, laoreet et, pretium ac, nisi. Aenean magna nisl, mollis quis, molestie eu, feugiat in, orci. In hac habitasse platea dictumst. Fusce pharetra convallis urna. Quisque ut nisi. Mauris nulla. Donec quis dui at dolor tempor interdum. Pellentesque sagittis. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Proin ut est. Duis nec magna et ipsum vehicula tincidunt. Aenean placerat. Fusce ut velit ullamcorper, tincidunt ante sit amet, ultrices felis. Donec vitae tortor.

Nulla facilisi. Nulla libero. Vivamus pharetra posuere sapien. Nam consectetuer. Sed aliquam, nunc eget euismod ullamcorper, lectus nunc ullamcorper orci, fermentum bibendum enim nibh eget ipsum. Nulla lacinia porttitor diam. Sed diam ligula, vulputate at, ornare non, posuere vel, arcu. Curabitur venenatis, nisl in bibendum commodo, sapien justo cursus urna, eget elementum purus nulla et sapien. In ac felis quis tortor malesuada pretium. Maecenas ultricies, lacus ut convallis dapibus, libero neque scelerisque odio, id facilisis ligula eros at quam. Etiam vestibulum metus eget tellus. Phasellus suscipit, sapien aliquam aliquet convallis, libero pede aliquam nisi, vitae feugiat risus neque eu lectus.
      </h1>
      <div className='w-[170px] mb-4 m-4 flex justify-between items-center h-[30px] md:ml-[380px]'>
        <div className='w-[90px] flex justify-center items-center h-[100%] '>
          <button id="like" onClick={() => {handleLikeComment()}} className='dark:text-gray-300 cursor-pointer text-gray-700 capitalize text-[14px]'>like</button>
          <div className='w-[5px] h-[5px] ml-1 bg-gray-700 dark:bg-gray-300 rounded-full'></div>
          <h1 className='dark:text-gray-400 text-gray-800 ml-1 text-[14px] font-semibold proportional-nums'>{12 + likeCount}</h1>
          {
            <div className="w-[15px] h-[15px] -mt-[3px] ml-1 flex justify-center items-center">
            <FaThumbsUp className=" text-[13px] text-blue-600" />
            </div>
          }
        </div>
        <div className='w-[80px] flex justify-center items-center h-[100%]'>
        <button onClick={() => {displayReplyBox()}} className='dark:text-gray-300 text-gray-700 capitalize text-[14px]'>reply</button>
        <h1 className='dark:text-gray-400 text-gray-800 ml-1 text-[14px] font-semibold proportional-nums'>12</h1>
        </div>
      </div>
      <div ref={replyBoxRef} className="md:w-[480px] w-[100%]  hidden overflow-x-hidden md:ml-[68px] ">
        <div className="w-[100%] relative justify-between  flex ">
          <img className="w-[50px] h-[50px] border-1px  rounded-full" src="" alt="" />
          <textarea  ref={commentInputRef} onChange={() => {
            setIsShowSomethingWentWrong(false)
            displaySendIcon()
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
        <Reply/>
        </div>
      </div>
    </div>
  )
}

export default Comment
