import React, { useState } from 'react'
import "../../styles/SignUp.css"
import { useMutation} from '@tanstack/react-query';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { IoIosArrowBack } from "react-icons/io";
const EditUserProfile = () => {
    const navigateToUserProfile = useNavigate()
    const navigateToHome = useNavigate()
    const [somethingWentWrong, setSomethingWentWrong] = useState(false)

    const [updateProfileDate, setUpdateProfileData] = useState({
        first_name: "",
        last_name: "",
        username: "",
        email: "",
        bio: "",
        image: ""
    })
    const UpdateUserprofile = useMutation({
        mutationFn: async () => {
            const response = await axios.post("", updateProfileDate)
            response.data
        },

        onMutate: () => {
            setSomethingWentWrong(false)
        },

        onSuccess: (data) => {
            navigateToHome("/")
        },

        onError: (error) => {
            setSomethingWentWrong(true)            
        }
    })
    const uploadImage = () => {
        const file = document.getElementById("file")
        file.click()
    }

    const previewImage = (e) => {
        setUpdateProfileData({...updateProfileDate, image: e.target.files[0]})
        const prevImage = document.getElementById("prevImage")
        if (e.target.files.length > 0) {
            const reader = new FileReader()
            reader.onload = (e) => {
                prevImage.src = e.target.result
                console.log(e.target.result)

            }

            reader.readAsDataURL(file.files[0])
        }
    }
  return (
    <div className='w-[100%] scroll-smooth tab-container h-[100%] overflow-y-scroll'>
        <div className='md:w-[90%] relative w-[100%] flex flex-col mx-auto'>
            <div onClick={() => navigateToUserProfile("/user-profile")} className='absolute md:top-4 lg:hidden w-[30px] rounded-full bg-gray-200 h-[30px] border-1px top-0 left-2 flex justify-center md:h-[40px] md:w-[40px] items-center'>
                <IoIosArrowBack className='text-gray-700 text-[18px]' />
            </div>
            <img id='prevImage' className='w-[150px] block mx-auto  mt-4 h-[150px] object-cover rounded-full' src="" alt="" />
            <button onClick={() => {uploadImage()}} className='w-[150px] h-[40px] border-1px rounded-md block mx-auto mt-2 text-gray-400'>Upload Image</button>
            <input onChange={(e) => {previewImage(e)}} id='file' className='hidden' type="file" />
            <div className='w-[100%] md:h-[45px]  mx-auto mt-8 flex justify-between items-center h-[100px]  md:flex-row flex-col '>
                <input value={updateProfileDate.first_name} onChange={(e) => setUpdateProfileData({...updateProfileDate, first_name: e.target.value})} className='md:w-[47%] md:h-[100%] w-[100%] h-[45px] dark:text-gray-400 dark:bg-gray-600  rounded-[3px] pl-2 focus:outline-none tracking-wide text-gray-700 bg-gray-300' type="text" placeholder='First Name' />
                <input value={updateProfileDate.last_name} onChange={(e) => setUpdateProfileData({...updateProfileDate, last_name: e.target.value})} className='md:w-[47%] md:h-[100%] w-[100%] dark:text-gray-400 h-[45px] dark:bg-gray-600  rounded-[3px] pl-2 focus:outline-none tracking-wide text-gray-700 bg-gray-300' type="text" placeholder='Last Name' />
            </div>
            <input value={updateProfileDate.username} onChange={(e) => setUpdateProfileData({...updateProfileDate, username: e.target.value})} placeholder='Username' className='w-[100%] h-[45px]  mt-4 block tracking-wide mx-auto text-gray-700 dark:text-gray-400 dark:bg-gray-600 bg-gray-300 rounded-[3px] pl-2 focus:outline-none' type="text" />
            <input value={updateProfileDate.email} onChange={(e) => setUpdateProfileData({...updateProfileDate, email: e.target.value})} placeholder='Email' className='w-[100%] h-[45px]  mt-4 block dark:text-gray-400 tracking-wide mx-auto text-gray-700 dark:bg-gray-600 bg-gray-300 rounded-[3px] pl-2 focus:outline-none' type="text" />
            <textarea value={updateProfileDate.bio} onChange={(e) => setUpdateProfileData({...updateProfileDate, bio: e.target.value})} placeholder='Bio' className='w-[100%] h-[250px]  mt-4 block tracking-wide pt-4 mx-auto text-gray-700 dark:text-gray-400 bg-gray-300 dark:bg-gray-600 rounded-[3px] pl-2 focus:outline-none resize-none' type="text"></textarea>
            <div className='w-[100%] h-[40px]  flex justify-between items-center mt-2 mb-4'>
            <button onClick={() => UpdateUserprofile.mutate()} className='w-[120px] h-[40px]  rounded-lg bg-blue-700 text-gray-300 tracking-wide  capitalize shadow-md'>
                update
            </button>
            {
                somethingWentWrong ? <small className='text-red-600 md:tracking-wide tracking-tighter capitalize'>
                    something went wrong please try again ...
                </small> : null
            }
            </div>

        </div>
    </div>
  )
}

export default EditUserProfile