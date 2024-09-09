import React, { useEffect } from 'react'
import { FaGlobeAfrica } from "react-icons/fa";
import { BiLike } from "react-icons/bi";
import { BiMessageRounded } from "react-icons/bi";
import { useState } from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useRef } from 'react';
import axios from 'axios';
import { LuSendHorizonal } from "react-icons/lu";
import { BsEmojiSmile } from "react-icons/bs";
import { BiRepost } from "react-icons/bi";
import "../../styles/SignUp.css"
import Comment from "./Comment"


const Post = ({post}) => {
    const unlikeContainerRef = useRef(null)
    const likeContainerRef = useRef(null)
    const [commentList, setCommentList] = useState([])
    const sendingRef = useRef(null)
    const [isShowSendIcon, setIsShowSendIcon] = useState(false)
    const sendContainerRef = useRef(null)
    const userCommentBoxRef = useRef(null)
    const [heigthAmount, setHeightAmount] = useState(50) 
    const commentContainerRef = useRef(null)
    const commentInputRef = useRef(null)
    const [isClickTextBox, setIsClickedTextBox] = useState(true)
    const commentBoxRef = useRef(null)
    const textBoxRef = useRef(null)
    const followRef = useRef(null)

    const [isOnce, setIsOnce] = useState(false)
    
    const [isEnableInternetConnection, setIsEnableInternetConnection] = useState(false)
    const [isFollow, setIsFollow] = useState(false)
    const [initialScrollHeight, setInitialScrollHeight] = useState(72)
    const showMoreRef = useRef(null)
    const unFollowUser = useMutation({
        mutationFn: async () => {
                const response = await axios.post("")
                return response.data
        },

        onMutate: () => {
            setIsFollow(false)
            followRef.current.innerHTML = "+ Follow"
            followRef.current.className = "h-[100%] tracking-wide text-blue-400 font-semibold w-[100px]"
        },

        onError: (error) => {
        setIsFollow(true)
        followRef.current.innerHTML = "Following"
        followRef.current.className = "h-[100%] tracking-wide text-gray-100 font-semibold w-[100px] bg-gray-600 rounded-full"
        }
    })


    const expandTextBox = () => {
        if (isClickTextBox === true) {
            textBoxRef.current.classList.remove("h-[100px]")
            showMoreRef.current.classList.add("hidden")
            setIsClickedTextBox(false)
        } 
        if (isClickTextBox === false) 
        {
            textBoxRef.current.classList.add("h-[100px]")
            showMoreRef.current.classList.remove("hidden")
            setIsClickedTextBox(true)
        }
    }


    const followUser = useMutation({
        mutationFn: async () => {
                const response = await axios.post("")
                return response.data
        },

        onMutate: () => {
            setIsFollow(true)
            followRef.current.innerHTML = "Following"
            followRef.current.className = "h-[100%] tracking-wide text-gray-100 font-semibold w-[100px] bg-gray-600 rounded-full"
        },

        onError: (error) => {
            setIsFollow(false)
            followRef.current.innerHTML = "+ Follow"
            followRef.current.className = "h-[100%] tracking-wide text-blue-400 font-semibold w-[100px]"
        }
    })

    const fetchAllUserComments = async () => {
            const response = await axios.get("")
            return response.data
    }

    const {data: comments, isPending, isError, refetch, isSuccess} = useQuery({
        queryKey: ["comments", ],
        queryFn: fetchAllUserComments,
        enabled: false,
    })

    if (isSuccess) {
        setCommentList(data)
    }



    
    const handleFollow = () => {

        if (isFollow === false) {
            console.log("this is", isFollow)
            followUser.mutate()
        }  
        else {
            console.log("error")
            unFollowUser.mutate()
        }
        console.log(isFollow)
    }


    
    const expandCommentBox = (e) => {
        if (e.key === "Enter") {
            console.log("is enter")
            e.preventDefault()
          }
      
          if (e.target.scrollHeight < 250) {
            console.log("this container height before scroll", e.target.style.height)
            e.target.style.height = "auto"
            e.target.style.height = e.target.scrollHeight + "px"
            console.log("this is container height after scroll", e.target.style.height)
          }
    }

    const showCommentBox = () => {
        commentBoxRef.current.classList.remove("hidden")
        commentBoxRef.current.classList.add("flex")
        commentInputRef.current.focus()

    }



    const postCommentFunc = async () => {
            const response = await axios.post("")
            return response.data
    }

    const postUserComment = useMutation({
        mutationFn: postCommentFunc,
        onSuccess: (data) => {
            setCommentList([data, ...comments])
            commentInputRef.current.classList.disable = false
            sendContainerRef.current.classList.add("flex")
            sendContainerRef.current.classList.remove("hidden")
            sendingRef.current.classList.remove('flex')
            sendingRef.current.classList.add("absolute")
            commentInputRef.current.value = ""
            commentInputRef.current.style.height = "50px"
            
        },

        onError: (error) => {
            commentInputRef.current.classList.disable = false
            sendContainerRef.current.classList.add("flex")
            sendContainerRef.current.classList.remove("hidden")
            sendingRef.current.classList.remove('flex')
            sendingRef.current.classList.add("hidden")
            sendingRef.current.classList.add("absolute") 
        }
    })

    const postComment = () => {
        commentInputRef.current.disable = true
        sendContainerRef.current.classList.remove("flex")
        sendContainerRef.current.classList.add("hidden")
        sendingRef.current.classList.remove("hidden")
        sendingRef.current.classList.add("flex")
        sendingRef.current.classList.remove("absolute")
        postUserComment.mutate()

    }

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

    const like = (node) => {
        if (isOnce === false) {
            setIsOnce(true)
            unlikeContainerRef.current.classList.add("hidden")

        }
        likeContainerRef.current.innerHTML = ""
        console.log("like")
        console.log(node)
        setIsOnce(true)
        const elem = document.getElementById(node)
        const elemClone = elem.cloneNode(true)
        elemClone.classList.remove(node)
        elemClone.classList.remove("hover:-translate-y-3")
        elemClone.classList.remove("hover:scale-125")
        likeContainerRef.current.appendChild(elemClone)

    }


    const unlike = () => {
        console.log("unlike")
        likeContainerRef.current.innerHTML = ""
        unlikeContainerRef.current.classList.add("flex")
        unlikeContainerRef.current.classList.remove("hidden")
        setIsOnce(false)
    }


    useEffect(() => {
        if (textBoxRef.current) {
            const str = textBoxRef.current.innerHTML
            if (str.length > 318) {
                setIsClickedTextBox(true)
                textBoxRef.current.classList.add("h-[100px]")
                showMoreRef.current.classList.remove("hidden")
            } else {
                setIsClickedTextBox(null)
            }
        }
        
        commentInputRef.current.style.height = "50px"
        console.log("container height ",  commentInputRef.current.style.height)
    }, [])

  return (
    <div id={post.id} className='w-[100%] transition-all duration-300 flex flex-col flex-wrap border-b-1px mb-4 rounded-lg'>
        <div  className='w-[100%]  md:h-[80px] flex justify-between h-[60px] items-center  rounded-md md:shadow-md '>
            <img className='md:w-[80px] w-[60px] h-[60px] md:h-[80px] border-1px rounded-full bg-cover' src="" alt="" />
            <div className='w-[420px] h-[100%]  px-2 rounded-md'>
                <div className='w-[100%] mt-1 justify-between items-center h-[18px] md:h-[26px]  flex text-gray-200'>
                   <h1 className='w-[200px] dark:text-gray-300  text-gray-600 font-semibold truncate'>
                   Onyeka Ujowundu Gerald
                    </h1>
                        <button ref={followRef} onClick={() => handleFollow()} className='h-[100%]  dark:rounded-lg md:tracking-wide text-blue-400 font-semibold w-[100px] '>
                        + Follow
                        </button> 
                </div>
                <h1 className='w-[100%] -mt-1 h-[18px] md:h-[26px] md:text-[16px] text-[15px]  text-gray-500 truncate tracking-tight'>
                    i love to code and play games
                </h1>
                <div className='w-[100%] h-[18px] md:h-[26px]  text-gray-200 flex justify-start items-center space-x-1'>
                    <h1 className='dark:text-gray-200 text-gray-500'>2h.</h1>
                    <div className='md:w-[15px] h-[12px] w-[12px] md:-mt-0 -mt-[3px] md:h-[15px] dark:text-gray-200 text-gray-500 '>
                        <FaGlobeAfrica/>
                    </div>
                </div>
            </div>
        </div>
        <div className='w-[100%]  mt-2 h-[30px] flex justify-start space-x-1 items-center'>
        <h1 className='text-gray-600 dark:text-gray-400 text-[18px] md:text-[20px] tracking-wide'>Title</h1>
        <div className='md:w-[10px] w-[6px] h-[6px] bg-gray-400 dark:bg-gray-600 md:h-[10px] rounded-full'></div>
        <h1 className='text-gray-500 dark:text-gray-400 tracking-tight md:tracking-wide capitalize w-[80%] truncate'>{post.title}</h1>
        </div>
        <h1 ref={textBoxRef}className='w-[100%] mt-2  whitespace-break-spaces flex flex-wrap overflow-y-hidden rounded-[4px] tracking-tight border-1px text-gray-800 dark:text-gray-300 p-1 text-[15px]'>{post.body} 
        </h1>
        <h1 ref={showMoreRef}  onClick={() => expandTextBox()}  className='text-blue-500
          hidden  ml-[80%] cursor-pointer tracking-wide  jus dark:text-blue-700 md:ml-[470px]'>... more</h1>
        <img className='w-[100%]  rounded-[4px] border-1px mt-4 h-[500px]' src="" alt="" />
        <div className='w-[95%] h-[40px] dark:border-transparent border-gray-500 flex space-x-1 justify-start items-center border-b-1px mx-auto mt-2'>
                    <span className='proportional-nums dark:text-gray-400 text-[14px] font-semibold text-gray-600 '>{post.reactions.likes}</span>
                <span className='text-blue-700 text-[14px]  dark:text-blue-500 block font-semibold'>{post.reactions.likes === 1 ? "Like" : "Likes"}</span>

            <div className='w-[6px] h-[6px] rounded-full dark:bg-gray-600 bg-gray-500'></div>

            <span className='proportional-nums font-semibold dark:text-gray-400  text-gray-600 text-[14px] '>{post.reactions.likes}</span>
            <span className='text-blue-600 text-[14px] font-semibold  dark:text-blue-400 block'>{post.reactions.likes === 1 ? "Comment" : "Comments"}</span>
        </div>
        <div className='md:w-[80%] w-[100%]  h-[35px] flex md:justify-start mb-4 items-center justify-evenly md:space-x-6 mx-auto mt-4'>
            <div className='md:w-[100px] w-[80px]  h-[100%]  relative cursor-pointer group  rounded-full'>
                <div className='absolute animateBox group-hover:flex z-10 shadow-md hidden hover:flex justify-center md:space-x-4 space-x-2 rounded-[6px] dark:bg-gray-900  items-center w-[100px] md:w-[160px] h-[45px] -bottom-[-35px] backdrop-filter  border-blue-800  backdrop-blur-md md:-left-[30px] -left-[10px]'>
                    <span onClick={() => like("span1")}
                    id='span1' 
                    className='inline-block span1 hover:scale-125 text-[25px]  md:text-[30px] transform hover:-translate-y-3 transition-all duration-200'>&#128079;</span>
                    <span onClick={() => like("span2")} id='span2' className='inline-block span2 md:text-[30px] text-[25px] text-red-600 transform duration-300 hover:-translate-y-3 hover:scale-125  '>  &#10084;</span>
                    <span onClick={() => like("span3")} id='span3' className='inline-block transform hover:-translate-y-3  duration-300 hover:scale-125   span3 text-[25px] md:text-[30px]'>&#128077;</span>
                    </div>
                    <div ref={likeContainerRef} onClick={() => {unlike()}} className='absolute top-0 right-0 bg-gray-300 pt-1 dark:bg-transparent dark:border-1px  border-1px h-[100%]  w-[100%] flex pb-1 justify-center items-center text-[30px] rounded-full'></div>
                    <div ref={unlikeContainerRef} className='w-[100%] dark:bg-transparent relative bg-gray-500 dark:border-1px rounded-full h-[100%] flex justify-center items-center md:space-x-2 space-x-1'>
                    <BiLike className='text-gray-200 text-[25px] md:text-[30px]' />
                    <h1 className='text-gray-200 '><h1 className='flex justify-center items-center  tracking-wide'>Like</h1></h1>
                    </div>

            </div>
            <div onClick={() => {
                //refetch()
                showCommentBox()
                }} className='md:w-[150px] w-[130px] bg-gray-500 dark:bg-transparent cursor-pointer space-x-1 md:space-x-2 h-[100%] dark:border-1px flex justify-center rounded-full items-center'>
                <BiMessageRounded className='text-gray-300 md:text-[30px] text-[25px]' />
                <h1 className='Capitalise tracking-wide text-gray-200'>
                    Comments
                </h1>
            </div>
            <button className='h-[100%] rounded-full flex justify-center dark:bg-transparent dark:border-1px items-center w-[110px]  bg-gray-500'>
                <BiRepost className='text-gray-200 text-[30px]' />
                <h1 className=' text-gray-200 capitalize'>repost</h1>
            </button>
        </div>
        <div ref={commentBoxRef} className='w-[100%] hidden   flex-col mt-2 flex-wrap '>
            <div className='relative  flex justify-between items-center w-[100%]'>
                <img className='w-[50px] border-1px absolute top-0 h-[50px] rounded-full' src="" alt="" />
                <div ref={userCommentBoxRef} className='w-[432px]    ml-[60px]  md:ml-[100px] flex flex-col  flex-wrap  overflow-hidden'>
                    <textarea onKeyDown={(e) => {expandCommentBox(e)}} ref={commentInputRef} onChange={(e) => {
                        displaySendIcon()
                         }} className='w-[100%] pt-2 border-1px flex  break-words focus:outline-none overflow-y-hidden pr-4 text-gray-400 pb-4   flex-wrap flex-col  resize-none    rounded-md pl-4 bg-gray-600' type="text" placeholder='Add comment here ...' />
                        <div ref={sendContainerRef} className='w-[100px]    rounded-md h-[35px] flex justify-between items-center  mt-2  top-[50px] right-0 ml-[70%] md:ml-[332px] transform translate-x-[50px] '>
                            <div className='h-[100%] relative  w-[50px] flex justify-center items-center '>
                                <BsEmojiSmile className='text-gray-700 font-bold cursor-pointer dark:text-gray-300 text-[25px]' />
                            </div>
                            <div onClick={() => postComment()} className='h-[100%] w-[50px]  flex justify-center cursor-pointer items-center'>
                                <LuSendHorizonal className='text-gray-700 font-semibold dark:text-gray-300 text-[25px]' />
                            </div>
                        </div>
                        <div ref={sendingRef} className='w-[100px] absolute  border-1px hidden  rounded-md h-[35px]   mt-2  top-[50px] right-0  justify-center items-center ml-[332px] font-sembold text-[18px] text-gray-400 '>
                            Sending ...
                        </div>
                        { postUserComment.isError ?
                            <small className='text-red-600 w-[250px]  h-[35px] flex justify-center items-center -mt-[35px]  '>
                                some went wrong please try again ...
                            </small> : null
                        }
                </div>
            </div>
            <div ref={commentContainerRef} className='w-[100%]  mb-4 mt-2  flex items-center flex-col flex-wrap justify-center'>
                { /*isSuccess ?
                comments.map(comment => <Comment key={comment.commentId} comment={comment} />) : null*/
                }
                <Comment/>
            </div>
        </div>
    </div>
  )
}
export default Post