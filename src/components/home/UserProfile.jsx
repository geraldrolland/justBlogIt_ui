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
import UserPosts from './UserPosts';
const UserProfile = () => {
    const userPostRef = useRef(null)
    const {setIsScrollTop} = useContext(theme)
    const [isRender, setIsRender] = useState(false)
    const {isError, isPending, isSuccess, data} =  UseRequest("http://127.0.0.1:8000/users/get_userprofile/", "get", null, "userprofile");
    const userPosts = UseRequest("http://127.0.0.1:8000/users/get_userposts/", "get", null, "usersposts");
    const deleteUserPost = UseRequest("http://127.0.0.1:8000/posts/"+ userPostRef.current?.id + "/delete_post/", "delete", null, true, null);
    const [isClicked, setIsClicked] = useState(false)
    const handleDeleteUserPost = () => {
        if (userPostRef.current) {
            if (userPostRef.current.id) {
                deleteUserPost.mutate()
                setIsRender(!isRender)
            }

            
        }
    }
    useEffect(() => {
        setIsScrollTop(true)
        
    }, [])
  return (
    <div className='w-[100%] h-[100%] overflow-x-hidden tab-container overflow-y-scroll scroll-smooth'>
        <div className='w-[100%] flex   mx-auto'>
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
                <NavLink to={"/home/edit-userprofile"} className='w-[100px] h-[40px]  mx-auto  mt-4 rounded-lg capitalize tracking-wide text-gray-200 shadow-md flex justify-center items-center font-semibold bg-green-500'>edit</NavLink>
            </div>
        </div>
        { userPosts.isSuccess ?
        <h1 className='dark:text-gray-400 text-gray-700   mt-4 capitalize h-[30px] w-[70px] flex items-center font-semibold justify-center rounded-full tracking-wide '>Posts</h1> : null
        }
        { userPosts.isSuccess ? userPosts.data.map(userpost => <UserPosts key={userpost.id} userpost={userpost} />
        ) : null
        }

       
    </div>
  )
}

export default UserProfile