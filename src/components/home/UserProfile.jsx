import React, { useEffect, useRef, useState } from 'react'
import { BsSend } from "react-icons/bs";
import { FaPeopleGroup } from "react-icons/fa6";
import { IoPeople } from "react-icons/io5";
import "../../styles/SignUp.css"
import { NavLink} from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useContext } from 'react';
import { theme } from '../../App';
import placeholder from "../../assets/images/imageplaceholder.png"
import UseRequest from '../customhooks/UseRequest';
const UserProfile = () => {
    const userPostRef = useRef(null)
    const {setIsScrollTop} = useContext(theme)
    const {isError, isPending, isSuccess, data} =  UseRequest("http://127.0.0.1:8000/users/get_userprofile/", "get", null, "userprofile");
    const userPosts = UseRequest("http://127.0.0.1:8000/users/get_userposts/", "get", null, "usersposts");
    const deleteUserPost = UseRequest("http://127.0.0.1:8000/posts/"+ userPostRef.current?.id + "/delete_post/", "delete", null, true, null);
    const [isClicked, setIsClicked] = useState(false)
    useEffect(() => {
        setIsScrollTop(true)
        
    }, [])
  return (
    <div className='w-[100%] h-[100%] overflow-x-hidden tab-container overflow-y-scroll scroll-smooth'>
        <div className='w-[100%] flex  mx-auto'>
            <div className='w-[100%] rounded-lg dark:bg-gray-600 bg-gray-100 h-[300px] '>
                <div className='w-[100%] h-[70px]  flex justify-start space-x-2 items-center'>
                    <img id='profile_image' className='w-[70px] h-[70px] border-1px rounded-full' src={isSuccess ? data.profile_image : placeholder} alt="" />
                    <h1 className='text-gray-500 font-semibold capitalize -mt-5 dark:text-gray-300'>{isSuccess ? data.first_name + " " + data.last_name : null}</h1>
                </div>
                <div className='w-[80%] mx-auto h-[100px]  mt-4 space-x-4 items-center justify-center flex'>
                    <div className='w-[120px] h-[100%]  flex flex-col items-center'>
                        <h1 className=' capitalize text-gray-700 font-semibold dark:text-gray-300'>post</h1>
                        <div className='relative w-[35px] h-[35px] flex justify-center items-center '>
                            <BsSend className='text-[35px] text-gray-500 dark:text-gray-700' />
                        </div>
                        <h1 className='bg-blue-600 w-[50px] h-[30px] text-gray-300 flex justify-center items-center mt-2 proportional-nums rounded-md font-semibold'>{isSuccess ? data.post_count : null}</h1>
                    </div>
                    <div className='w-[120px] h-[100%]  flex flex-col items-center'>
                        <h1 className=' capitalize text-gray-700 font-semibold dark:text-gray-300'>followers</h1>
                        <div className='relative w-[35px] h-[35px] flex justify-center items-center '>
                            <FaPeopleGroup className='text-[35px] text-gray-500 dark:text-gray-700' />
                        </div>
                        <h1 className='bg-blue-600 w-[50px] h-[30px] text-gray-300 flex justify-center items-center mt-2 proportional-nums rounded-md font-semibold'>{isSuccess ? data.follower_count : null}</h1>
                    </div>
                    <div className='w-[120px] h-[100%] flex flex-col items-center'>
                        <h1 className=' capitalize text-gray-700 font-semibold dark:text-gray-300'>following</h1>
                        <div className='relative w-[35px] h-[35px] flex justify-center items-center '>
                            <IoPeople className='text-[35px] text-gray-500 dark:text-gray-700' />
                        </div>
                        <h1 className='bg-blue-600 w-[50px] h-[30px] text-gray-300 flex justify-center items-center mt-2 proportional-nums rounded-md font-semibold'>{isSuccess ? data.following_count : null}</h1>
                    </div>
                </div>
                <NavLink to={"/edit-userprofile"} className='w-[100px] h-[40px]  mx-auto  mt-4 rounded-lg capitalize tracking-wide text-gray-200 shadow-md flex justify-center items-center font-semibold bg-green-500'>edit</NavLink>
            </div>
        </div>
        { userPosts.isSuccess ?
        <h1 className='dark:text-gray-400 text-gray-700   mt-4 capitalize h-[30px] w-[70px] flex items-center font-semibold justify-center rounded-full tracking-wide '>Posts</h1> : null
        }
        { userPosts.isSuccess ? userPosts.data.map(userpost => 
        <div style={{
            display: deleteUserPost?.isSuccess ? "none" : "block", 
        }} key={userpost.postId} ref={userPostRef} id={userpost.postId} className='relative w-[100%] group hover:h-[210px] transition-all duration-300  h-[170px] mt-2'>
         <button  onClick={() => {
            setIsClicked(true)
            deleteUserPost.mutate()
            }} className='absolute w-[100px] border-2px dark:border-none dark:bg-red-500 dark:text-gray-300 right-0 group-hover:translate-y-[0px] transition-all duration-300 bottom-0 h-[30px] capitalize text-red-700 text-[15px] tracking-wide border-red-400 rounded-[4px] transform -translate-y-[40px] group-hover:z-10 '>
            {deleteUserPost?.isPending ? "deleting .." : "delete"}
         </button>
            <div className='w-[100%] relative z-10 top-0 right-0  mx-auto  rounded-md h-[170px]  dark:bg-gray-800 bg-gray-300 md:shadow-md md:dark:shadow-lg'>
        <div className='w-[300px]   space-x-2 flex justify-start items-center h-[30px] '><h1 className='dark:text-gray-400 text-gray-700 truncate font-semibold text-[14px] md:tracking-normal tracking-tight'>{userpost.user.username}</h1>
        <h1 className='dark:text-gray-400 text-gray-500 w-[80px] text-[12px]'>posted this</h1>
        <div className='w-[6px] h-[6px] bg-gray-600 rounded-full '></div>
        <h1 className='dark:text-gray-300 text-[14px] proportional-nums w-[100px] text-gray-600'>{userpost.createdAt}</h1>
        </div>
        <div className='w-[450px] h-[30px] flex justify-start items-center md:space-x-2 space-x-1'>
            <h1 className='dark:text-gray-400 text-gray-700 font-semibold tracking-wider'>
                Title
            </h1>
            <div className='w-[30px] rounded-full dark:bg-gray-700 bg-gray-400 h-[10px]'></div>
            <h1 className='dark:text-gray-200 capitalize md:tracking-wide tracking-tighter text-gray-600 md:w-[350px] truncate font-semibold'>
                {userpost.postTitle}
            </h1>
        </div>
        <div className='w-[100%] h-[80px]  mt-1 flex justify-start items-center'>
            { userpost.postImage ?
            <img className='w-[100px] rounded-md h-[100%] border-1px' src={userpost.postImage} alt="" /> : null
            }
            <h1 className='dark:text-gray-300 text-gray-600 overflow-hidden w-[400px] truncate  h-[100%] flex flex-wrap text-wrap text-[13px] p-1  tracking-tight'>
                {userpost.postText}
            </h1>
        </div>
        <div className='w-[100%] h-[20px] flex justify-between relative items-center mt-[3px]'>
            { userpost.likes > 0 ?
            <div className='h-[100%] ml-1 space-x-1 flex justify-start left-0 top-0 absolute items-center  w-[70px]'><h1 className="text-[14px]">&#128077;</h1><h1 className='text-blue-700  mt-1 proportional-nums text-[14px]'>
            {userpost.likes}
            </h1></div> : null
            }
            { userpost.commentCount ?
            <div className='h-[100%] absolute right-0 top-0 mr-1 space-x-1 flex justify-end items-center  w-[150px]'>
                <h1 className='text-[14px] dark:text-gray-500 text-gray-700'>{
                    userpost.commentCount === 1 ? "comment" : 'comments'
                    }</h1>
                <div className='w-[5px] h-[5px] rounded-full bg-gray-400'></div>
                <h1 className='dark:text-gray-400 proportional-nums text-gray-600 text-[12px]'>{userpost.commentCount}</h1>
            </div> : null
            }

        </div>
    </div> </div>
        ) : null
        }

       
    </div>
  )
}

export default UserProfile