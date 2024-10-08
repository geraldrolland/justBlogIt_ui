import React, { useEffect, useRef, useState } from 'react'
import { CiSearch } from "react-icons/ci";
import { FaHome } from "react-icons/fa";
import { LuSend } from "react-icons/lu";
import { FaBell } from "react-icons/fa";
import { IoIosArrowDown } from "react-icons/io";
import { json, NavLink, Outlet } from 'react-router-dom';
import { useContext } from 'react';
import { theme } from '../../App';
import { motion } from 'framer-motion';
import { createPortal } from 'react-dom'
import axios from 'axios';
import { queryClient } from '../../App';
import { useQuery } from '@tanstack/react-query';
import poster from "../../assets/images/poster.jpg"
import { FaPeopleGroup } from "react-icons/fa6";
import { IoPeople } from "react-icons/io5";
import { IoHomeOutline } from "react-icons/io5";
import { FaRegBell } from "react-icons/fa6";
import { BsSend } from "react-icons/bs";
import useStore from '../customhooks/UseStore';
import "../../styles/SignUp.css"
import placeholder from "../../assets/images/imageplaceholder.png"
import UseRequest from '../customhooks/UseRequest';
import { useNavigate } from 'react-router-dom';
const BlogItemsPage = () => {
    const navigateToLogin = useNavigate()
    const postListRef = useStore(state => state.postListRef) 
    const {isScrollTop} = useContext(theme)
    const followingRef = useRef(null)
    const followerRef = useRef(null)
    const searchInputRef = useRef(null)
    const containerRef = useRef(null)
    const {data, isPending, isError, refetch, isSuccess} = UseRequest("http://127.0.0.1:8000/posts/get_posts/", "get", null, "posts", false)
    const navigateToPostList = useNavigate()
    const fetchUserProfile = UseRequest("http://127.0.0.1:8000/users/get_userprofile/", "get", null, "userprofile");
    const searchPost = () => {

        if (isSuccess) {
            if (data) {
                console.log(data)
                const posts = data
            if (containerRef.current) {
                containerRef.current.style.display = "flex"
                containerRef.current.innerHTML = ""
            }

            if (posts) {
                posts.forEach(post => {
                    console.log(post.postTitle)
                    if (post.postTitle.startsWith(searchInputRef.current.value)) {
                        console.log("error1")
                        const div = document.createElement("div")
                        const h1 = document.createElement("h1")
                        const image = document.createElement("img")
                        const span1 = document.createElement("span")
                        const span2 = document.createElement("span")
                        const name = document.createElement("h1")
                        name.className = "dark:text-blue-300 truncate  text-blue-400 truncate w-[65px]"
                        name.innerHTML = post.user.username 
                        span1.className = "text-[18px] text-blue-500 capitalize tracking-wide"
                        span1.innerHTML = "Title - "
                        span2.className = "text-[16px]  inline-block ml-1 dark:text-gray-300 text-gray-600 truncate tracking-tight"
                        span2.innerHTML = post.postTitle
                        div.className = "w-[100%] dark:shadow-2xl backdrop-filter backdrop-blur-lg shadow-md cursor-pointer hover:border-blue-500 transition-all duration-300 border-1px h-[50px] rounded-md flex justify-between dark:border-none mt-1 items-center"
                        h1.className="h-[100%] pl-2  flex items-center w-[60%] tracking-tight font-semibold text-gray-70 dark:text-gray-300 truncate"
                        h1.appendChild(span1)
                        h1.appendChild(span2)
                        div.id = post.postId
                        h1.id = post.postId
                        span1.id = post.postId
                        span2.id = post.postId
                        image.id = post.postId
                        
                        div.addEventListener("click", (event) => {
                            
                            let posts = postListRef.children;
                            posts = Array.from(posts);
                            console.log("fuction called")
                            console.log(typeof(event.target.id))
                            console.log("e id", event.target.id)
                            for (let post of posts) {
                                console.log("this from posts", post.id)
                                console.log(typeof(post.id))
                                if (post.id === event.target.id) {
                                    post.scrollIntoView({ behavior: "smooth", block: "start" });

                                    const observer = new IntersectionObserver(entries => {
                                        entries.forEach(entry => {
                                            if (entry.isIntersecting) {
                                                entry.target.classList.add("animatePost")
                                                
                                            } else {
                                                entry.target.classList.remove("animatePost")
                                            }
                                        })
                                    }, {
                                        threshold: 0.5,
                                    })

                                    observer.observe(post)
                                }
                            }
                        });
                        image.className ="bg-cover shadow-md mr-2 rounded-full h-[35px] w-[35px]"
                        image.alt = post.title
                        image.src = post.user.image 
                        div.appendChild(h1)
                        div.appendChild(name)
                        div.appendChild(image)
                        if (containerRef.current)
                        containerRef.current.appendChild(div)
                    }

                });}

                if (containerRef.current.innerHTML === "") {
                    console.log("f")
                    containerRef.current.innerHTML = ""
                    const div = document.createElement("div")
                    
                    const h1 = document.createElement("h1")
                    h1.className = "dark:text-gray-300"
                    div.className = "w-[100%] backdrop-filter backdrop-blur-lg shadow-md h-[50px] pl-2  flex  items-center"
                    h1.innerHTML = "No Result Found"
                    div.appendChild(h1)
                    containerRef.current.appendChild(div)
                }
            }
        }
    }

    const logOutuser = () => {
        const userStatus = JSON.parse(sessionStorage.getItem("userStatus"))
        axios.post("http://127.0.0.1:8000/token-blacklist/", {refresh: userStatus.refresh})
        .then(response => {
            if (response.status === 200) {
                console.log("log out")
                sessionStorage.removeItem("userStatus")
                navigateToLogin("/log-in/")
            }
        })
        .catch(error => {
            console.log(error)
        })
    }



    const [isShowProfile, setIshowProfile] = useState(false)
    const {
        setIsDarkMode,
        isDarkMode
    } = useContext(theme)
    const activeClass = ({isActive}) => {
        return {
            borderColor: isActive ? isDarkMode ? "white" : "gray" : "transparent",
            
        }

    }

    const hideDisplaySearchResult = () => {
        searchInputRef.current.value = ""
        containerRef.current.style.display = "none"
    }


    const handleSearchInput = () => {
        if (searchInputRef.current.value === "") {
            containerRef.current.style.display = "none"
        }
        else {
            searchPost()
        }  
    }

    useEffect(() => {
        const userStatus = JSON.parse(sessionStorage.getItem("userStatus"))
        if (!userStatus || userStatus.isUserLoggedIn !== true)
        {
            navigateToLogin("/log-in/")
        }
        if (followerRef.current && followerRef.current) {
            const websocket = new WebSocket("ws://127.0.0.1:8000/ws/broadcast/")
            websocket.onopen = (e) => {
              console.log("connected")
            }
            websocket.onmessage = (e) => {
              let data = JSON.parse(e.data)
              data = data.message
              const userStatus = JSON.parse(sessionStorage.getItem("userStatus"))
              console.log(e)
              if (userStatus && userStatus.id) {
                if (userStatus.id === data.user.id && data.NotificationType === "Follow") {
                    followingRef.current.innerHTML = parseInt(followerRef.current.innerHTML) + 1
                }
                else if (userStatus.id === data.receipient && data.NotificationType === "Follow") {
                    followerRef.current.innerHTML = parseInt(followerRef.current.innerHTML) + 1
                }
                else if (userStatus.id === data.user.id && data.NotificationType === "Unfollow") {
                    followingRef.current.innerHTML = parseInt(followingRef.current.innerHTML) - 1
                }
                else if (userStatus.id === receipient && data.NotificationType === "Unfollow") {
                    followerRef.current.innerHTML = parseInt(followerRef.current.innerHTML) - 1
                }
              }
            }
        
            websocket.onclose = () => {
              console.log("disconnected")
            } 
        }
       navigateToPostList("/home/post-list")

    }, [])

  return (
    <>
    <div className='w-full h-full'>
      <div onClick={() => hideDisplaySearchResult()} className='w-[100%] mb-[1%]  md:mb-0  relative items-center  h-[10%] lg:h-[60px]  flex justify-between lg:justify-center lg:space-x-40'>
        <div className='lg:w-[500px] md:ml-1 md:w-[50%]  flex justify-between items-center  w-[100%]  h-[45px] '>
            <div className='md:w-[100px] h-[100%]  flex flex-col md:shadow-md justify-center md:dark:border-1px  dark:border-red-500 w-[25%] rounded-sm md:rounded-md  dark:bg-transparent bg-red-500 items-center'>
                <span className=' md:tracking-wider  text-gray-100 font-mono text-[18px] dark:text-red-500  justify-center text-shadow items-center flex font-semibold'>just</span>
                <span className='flex justify-center text-shadow items-center font-semibold font-mono md:tracking-wider  text-[20px] text-gray-100 dark:text-red-500 -mt-3'>BlogIt</span>
            </div>
            <div className='lg:w-[350px] w-[70%] md:w-[320px] border-1px dark:border-none rounded-[4px] border-gray-600 relative h-[100%]  justify-center flex items-center'>
                <div className='w-[50px] absolute left-0 h-[100%]  flex justify-center items-center'>
                    <CiSearch className='text-[30px] text-gray-600' />
                </div>
                <input onChange={() => {
                    handleSearchInput()
                }} ref={searchInputRef} onFocus={() => refetch()} className='w-[100%] h-[100%] border-gray-800  text-[18px] pl-[45px] md:pl-[60px]  dark:bg-gray-300 md:dark:bg-gray-100 rounded-[3px] dark:text-gray-500  focus:outline-none' type="text" placeholder='search post by title ....' />

            </div>
        </div>
        <div className='lg:w-[600px] w-[47%]   hidden md:flex h-[60px]  justify-between  items-center '>
            <NavLink onClick={() => hideDisplaySearchResult() } to={"/home/post-list"} style={activeClass} className='w-[70px] flex flex-col justify-center border-b-3px border-transparent items-center h-[60px]  '>
                <div className='w-[30px] flex  justify-center items-center relative h-[30px]'>
                    <div className='w-[12px] h-[12px]  absolute top-0 right-0 bg-red-600 rounded-full'></div>
                <FaHome className='text-[30px]  dark:text-gray-300   text-gray-700' />
                </div>
                <h1 className='dark:text-gray-300 -mt-1 capitalize'>
                    Home
                </h1>
            </NavLink>
            <NavLink onClick={() => hideDisplaySearchResult()} to={"/home/upload-post"} style={activeClass} className='w-[70px] flex flex-col justify-center items-center h-[60px]   border-transparent   border-b-3px'>
                <div className='w-[30px] flex  justify-center items-center relative h-[30px]'>
                <LuSend className='text-[30px]  dark:text-gray-300   text-gray-700' />
                </div>
                <h1 className='dark:text-gray-300 -mt-1 capitalize'>
                    post
                </h1>
            </NavLink>
            <NavLink onClick={() => hideDisplaySearchResult()} to={"/home/notification"} style={activeClass} className='w-[120px] flex flex-col justify-center border-transparent border-b-3px items-center h-[60px]  '>
                <motion.div
                animate={{
                    rotate: ["-15deg", "15deg", "-10deg", "10deg", "-5deg", "5deg", "0"]
                }} 

                transition={{
                    duration: 0.5,
                    ease: "easeInOut",
                    
                }}
                className='w-[30px] flex  justify-center items-center relative h-[30px]'>
                    <div className='w-[12px] h-[12px]  absolute top-0 right-0 bg-red-600 rounded-full'></div>
                <FaBell className='text-[30px]  dark:text-gray-300   text-gray-700' />
                </motion.div>
                <h1 className='dark:text-gray-300  capitalize'>
                    Notifications
                </h1>
            </NavLink>
            <NavLink to={"/home/user-profile"} className='w-[70px] hidden  md:flex flex-col justify-center items-center h-[60px]  '>
                <img  src={fetchUserProfile.isSuccess && fetchUserProfile?.data?.profile_image !== "" ? fetchUserProfile.data.profile_image : placeholder} className='lg:w-[30px] img flex md:border-2px md:border-green-400  justify-center items-center rounded-full relative  bg-cover h-[40px] w-[40px] lg:h-[30px]' />
                <button  onClick={() => {
                    hideDisplaySearchResult()
                    setIshowProfile(!isShowProfile)

                }} className='w-[100%] h-[20px] hidden lg:flex justify-center items-center   space-x-[1px]'>
                    <h1 className='dark:text-gray-300 -mt-1'>Me</h1>
                    <IoIosArrowDown className='dark:text-gray-300' />
                </button>
            </NavLink>
            <div onClick={() => setIsDarkMode(!isDarkMode)} className='w-[70px]  flex shadow-lg -inset-2 dark:bg-gray-950 cursor-pointer transition-all duration-300  dark:border-none bg-gray-400 justify-center items-center h-[35px] rounded-full lg:mr-0 md:mr-1'>
                <div className='w-[27px] transition-all duration-300 h-[27px] transform translate-x-[-50%] dark:translate-x-[50%] dark:bg-gray-300 bg-gray-800  rounded-full'></div>
            </div>
        </div>
        { isShowProfile ?
            createPortal(<motion.div
                animate={{
                    scale: [0.8, 0.8, 1.0]
                }}
                transition={{
                    duration: 0.3,
                    ease: "easeInOut"
                }}
                className='fixed z-10 top-[80px] hidden lg:block right-[75px]  rounded-md  h-[250px] w-[250px]'>
                    <div className='w-[100%] h-[100px]  flex justify-between items-center'>
                        <img id='profile_image' className='w-[90px] h-[90px] rounded-full shadow-lg  bg-cover ' src={fetchUserProfile.isSuccess && fetchUserProfile?.data?.profile_image !== "" ? fetchUserProfile.data.profile_image : placeholder} alt="" />
                        <div className='w-[140px] h-[90px] border-1px rounded-lg dark:text-gray-400  shadow-md  leading-tight text-[14px] p-1 text-wrap truncate tracking-tight'>
                            {fetchUserProfile.data.bio} 
                        </div>
                    </div>
                    <div className='h-[130px] shadow-md mt-[20px] rounded-lg w-[100%] border-1px'>
                        <NavLink to={"/home/user-profile"} className='w-[150px] h-[35px] flex justify-center items-center  mt-4 text-blue-500 hover:border-none hover:bg-gray-400 hover:text-blue-800 transition-all duration-200  mx-auto border-2px dark:border-none border-gray-500 rounded-full  dark:bg-gray-900'>
                            View Profile
                        </NavLink>
                        <button onClick={() => logOutuser()} className='w-[90px] h-[30px] border-2px mx-auto block mt-2 rounded-lg text-red-500  font-semibold border-blue-300 capitalize hover:shadow-md active:shadow-none transition-all transform hover:scale-105'>
                            log out
                        </button>
                    </div>
                </motion.div>, document.getElementById("profile-root")) : null
        }

        { 
            createPortal( 
                <div ref={containerRef} className='md:w-[330px] w-[100%] fixed md:top-[60px] shadow-md md:ml-[125px] border-1px lg:ml-[200px] top-[50px]  dark:bg-gray-900 transition-all duration-300 rounded-md flex flex-col flex-wrap backdrop-filter backdrop-blur-md justify-between items-center '>
                </div>, document.getElementById("search-root")) 
        }
        </div>
        <div onClick={() => hideDisplaySearchResult()} className='w-[100%]  fixed h-[95%] lg:h-[89%]  g:h-[565px]  justify-center items-center flex lg:mt-[20px] rounded-md shadow-md '>
            <div className='md:w-[550px] w-[100%] h-[100%] overflow-hidden'> 
                <Outlet/>
            </div>
        </div>
        {
            createPortal(
            <motion.div
            animate={isScrollTop ? {
                translateY: "0px"
            } : {
                translateY: "100px"
            }} 

            transition={{
                duration: 0.2,
                ease: "easeInOut"
            }}
            className='md:hidden backdrop-filter  backdrop-blur-lg shadow-md rounded-l-[20px] rounded-r-[20px] w-[100%] fixed z-10 bottom-0 right-0 h-[50px] dark:border-1px flex justify-evenly items-center'>
                <NavLink to={"/home/post-list"} style={activeClass} className='w-[50px] relative flex justify-center text-gray-700  dark:text-gray-300 border-b-3px rounded-md items-center text-[30px] h-[100%] '>
                    <div className='absolute 
                    rounded-full bg-red-600 right-[7px] top-2
                    h-[12px] w-[12px] '></div>
                <IoHomeOutline />  
                </NavLink>
                <NavLink to={"/home/notification"} style={activeClass}  className='w-[50px] rounded-md border-b-3px  h-[100%]'>
                <motion.div
                animate={{
                    rotate: ["-15deg", "15deg", "-10deg", "10deg", "-5deg", "5deg", "0"]
                }} 

                transition={{
                    duration: 0.5,
                    ease: "easeInOut",
                    
                }}
                className='w-[50px] relative flex justify-center items-center dark:text-gray-300 text-gray-700 text-[30px] h-[100%] '>
                <div className='absolute 
                    rounded-full  bg-red-600 right-[7px] top-2
                    h-[12px] w-[12px] '></div>
                <FaRegBell />  
                </motion.div>
                </NavLink>
                <NavLink to={"/home/upload-post"} style={activeClass}  className='w-[65px] border-b-3px shadow-md bg-gray-200 flex justify-center items-center -mt-[28px] rounded-full text-[30px] h-[65px] text-gray-900 '>
                <BsSend  />  
                </NavLink>
                <NavLink to={"/home/user-profile"} className='w-[50px] flex justify-center items-center text-[30px] h-[100%] '>
                <img className='w-[45px] h-[45px] border-2px border-green-600 object-contain img rounded-full' src={poster} alt="" />  
                </NavLink>
                <div 
                className='w-[70px]  flex justify-center bg-gray-400 dark:bg-gray-950 items-center rounded-full transition-all duration-300   h-[40px] ' onClick={() => setIsDarkMode(!isDarkMode)}>
                  <div className='w-[30px] transform transition-all duration-300 dark:bg-gray-100 shadow-lg translate-x-[-50%] dark:translate-x-[50%] bg-gray-800 h-[30px] rounded-full '></div>
                </div>
            </motion.div>, document.getElementById("menu-root"))
        }
        </div>
    </>
  )
}

export default BlogItemsPage