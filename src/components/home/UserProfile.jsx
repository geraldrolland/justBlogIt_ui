import React from 'react'
import { BsSend } from "react-icons/bs";
import { FaPeopleGroup } from "react-icons/fa6";
import { IoPeople } from "react-icons/io5";
import "../../styles/SignUp.css"
import { NavLink} from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
const UserProfile = () => {
    const {} = useQuery({
        queryKey: ["userprofile"],
        queryFn: async () => {
            const response = await axios.get("")
        }
    })
  return (
    <div className='w-[100%] h-[100%] tab-container overflow-y-scroll scroll-smooth'>
        <div className='w-[100%] flex  mx-auto'>
            <div className='w-[100%] rounded-lg dark:bg-gray-600 bg-gray-100 h-[300px] '>
                <div className='w-[100%] h-[70px]  flex justify-start space-x-2 items-center'>
                    <img className='w-[70px] h-[70px] border-1px rounded-full' src="" alt="" />
                    <h1 className='text-gray-500 font-semibold capitalize -mt-5 dark:text-gray-300'>Onyeka Gerald Ujowundu</h1>
                </div>
                <div className='w-[80%] mx-auto h-[100px]  mt-4 space-x-4 items-center justify-center flex'>
                    <div className='w-[120px] h-[100%]  flex flex-col items-center'>
                        <h1 className=' capitalize text-gray-700 font-semibold dark:text-gray-300'>post</h1>
                        <div className='relative w-[35px] h-[35px] flex justify-center items-center '>
                            <BsSend className='text-[35px] text-gray-500 dark:text-gray-700' />
                        </div>
                        <h1 className='bg-blue-600 w-[50px] h-[30px] text-gray-300 flex justify-center items-center mt-2 proportional-nums rounded-md font-semibold'>0</h1>
                    </div>
                    <div className='w-[120px] h-[100%]  flex flex-col items-center'>
                        <h1 className=' capitalize text-gray-700 font-semibold dark:text-gray-300'>followers</h1>
                        <div className='relative w-[35px] h-[35px] flex justify-center items-center '>
                            <FaPeopleGroup className='text-[35px] text-gray-500 dark:text-gray-700' />
                        </div>
                        <h1 className='bg-blue-600 w-[50px] h-[30px] text-gray-300 flex justify-center items-center mt-2 proportional-nums rounded-md font-semibold'>0</h1>
                    </div>
                    <div className='w-[120px] h-[100%] flex flex-col items-center'>
                        <h1 className=' capitalize text-gray-700 font-semibold dark:text-gray-300'>following</h1>
                        <div className='relative w-[35px] h-[35px] flex justify-center items-center '>
                            <IoPeople className='text-[35px] text-gray-500 dark:text-gray-700' />
                        </div>
                        <h1 className='bg-blue-600 w-[50px] h-[30px] text-gray-300 flex justify-center items-center mt-2 proportional-nums rounded-md font-semibold'>0</h1>
                    </div>
                </div>
                <NavLink to={"/edit-userprofile"} className='w-[100px] h-[40px]  mx-auto  mt-4 rounded-lg capitalize tracking-wide text-gray-200 shadow-md flex justify-center items-center font-semibold bg-green-500'>edit</NavLink>
            </div>
        </div>
        <h1 className='dark:text-gray-400 text-gray-700 border-1px  mt-4 capitalize h-[30px] w-[70px] flex items-center font-semibold justify-center rounded-full tracking-wide '>Posts</h1>

        <div className='w-[100%] mx-auto mt-2 rounded-md h-[170px]  shadow-md dark:shadow-lg'>
            <div className='w-[300px]  space-x-2 flex justify-start items-center h-[30px] '><h1 className='dark:text-gray-400 text-gray-700 font-semibold capitalize text-[14px]'>Onyeka Ujowundu Gerald</h1>
            <h1 className='dark:text-gray-400 text-gray-500 text-[12px]'>posted this</h1>
            <div className='w-[6px] h-[6px] bg-gray-600 rounded-full '></div>
            <h1 className='dark:text-gray-300 text-[14px] proportional-nums text-gray-600'>12h</h1>
            </div>
            <div className='w-[450px] h-[30px] flex justify-start items-center space-x-2'>
                <h1 className='dark:text-gray-400 text-gray-700 font-semibold tracking-wider'>
                    Title
                </h1>
                <div className='w-[30px] rounded-full dark:bg-gray-700 bg-gray-400 h-[10px]'></div>
                <h1 className='dark:text-gray-200 capitalize tracking-wide text-gray-600 w-[350px] truncate font-semibold'>
                    10 ways to become a software engineer
                </h1>
            </div>
            <div className='w-[100%] h-[80px]  mt-1 flex justify-start items-center'>
                <img className='w-[100px] rounded-md h-[100%] border-1px' src="" alt="" />
                <h1 className='dark:text-gray-300 text-gray-600 overflow-hidden w-[400px] truncate  h-[100%] flex flex-wrap text-wrap text-[13px] p-1  tracking-tight'>
                It seems like you might be referring to something specific, but the term "elipsium" isn't widely recognized. Could you be thinking of elegy, epitome, epitaph, or something else? If you could provide a bit more context or clarify what you're looking for, I can definitely assist with that!
                It seems like you might be referring to something specific, but the term "elipsium" isn't widely recognized. Could you be thinking of elegy, epitome, epitaph, or something else? If you could provide a bit more context or clarify what you're looking for, I can definitely assist with that!
                </h1>
            </div>
            <div className='w-[100%] h-[20px] flex justify-between items-center mt-[3px]'>
                <div className='h-[100%] ml-1 space-x-1 flex justify-start items-center  w-[70px]'><h1 className="text-[14px]">&#128077;</h1><h1 className='text-blue-700  mt-1 proportional-nums text-[14px]'>
                    6
                    </h1></div>
                    <div className='h-[100%] mr-1 space-x-1 flex justify-end items-center  w-[150px]'>
                        <h1 className='text-[14px] dark:text-gray-500 text-gray-700'>comments</h1>
                        <div className='w-[5px] h-[5px] rounded-full bg-gray-400'></div>
                        <h1 className='dark:text-gray-400 proportional-nums text-gray-600 text-[12px]'>215</h1>
                    </div>
            </div>
        </div>
       
    </div>
  )
}

export default UserProfile