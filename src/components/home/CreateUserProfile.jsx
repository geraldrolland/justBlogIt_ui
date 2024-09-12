import React, { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import "../../styles/SignUp.css"
import { LiaSignInAltSolid } from "react-icons/lia";
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import "../../styles/SignUp.css"
const CreateUserProfile = () => {
    const hide = useRef(null)
    const view = useRef(null)
    const inputRef = useRef(null) 
    const emailRef = useRef(null)
    const navigateToLogIn = useNavigate()
    const navigateToSignUp = useNavigate()
    const ButtonRef = useRef(null)
    const [isDisable, setisDisable] = useState(true)
    const bioRef = useRef()
    const FirstNameRef = useRef()
    const lastNameRef = useRef()

    const [createUserInput, setCreateuserInput] = useState({
        profile_image: "",
        first_name: "",
        last_name:  "",
        bio:  ""
    })

    const createUserProfile = async () => {
        if (checkInvalidInput()) {
            const userProfileInfo = JSON.parse(sessionStorage.getItem("userProfileInfo"))
            const formData = {
                "email": userProfileInfo.email,
                "username": userProfileInfo.username,
                "password": userProfileInfo.password,
                "first_name": createUserInput.first_name,
                "last_name": createUserInput.last_name,
                "bio": createUserInput.bio,
                "profile_image": createUserInput.profile_image
            }
            axios.post("http://127.0.0.1:8000/users/create_user/", formData)
            .then((response) => {
                setisDisable(false)
                navigateToLogIn("/log-in/")
            })
            .catch(error => {
                setisDisable(false)
                console.log(error)
            })
        }
    }

    const checkInvalidInput = () => {
        if (FirstNameRef.current.value && lastNameRef.current.value && bioRef.current.value && createUserInput.profile_image) {
            setisDisable(false)
            ButtonRef.current.classList.add("bg-blue-800")
            ButtonRef.current.classList.remove("bg-blue-400")
            console.log("true")
            return true
        }
        setisDisable(true)
        console.log("false")
        return false
    }

    const handleUploadImage = () => {
        const file = document.getElementById("file")
        file.click()
    }

    const uploadImage = (e) => {
        const prevImage = document.getElementById("prevImage")
        if (e.target.files[0]) {
            const reader = new FileReader()
            reader.onload = (e) => {
                prevImage.src = e.target.result
                console.log(e.target.result)
                setCreateuserInput({...createUserInput, profile_image: e.target.result})
            }
            
            reader.readAsDataURL(e.target.files[0])
        }
    }


    useEffect(() => {
        try {
            const userInfoProfile = sessionStorage.getItem("userProfileInfo")
            if (userInfoProfile) {
                FirstNameRef.current.focus()
                checkInvalidInput()
            }

            else {
                navigateToSignUp("/sign-up")
            }
        }

        catch(error) {
            navigateToSignUp("/sign-up")
        }

    }, [])
  return (
    <div className='w-[100%] h-[640px]  flex  items-center justify-center'>
    <div className='lg:w-[360px] relative md:w-[400px] md:dark:border-1px  dark:border-gray-400 md:shadow-md  rounded-md h-[640px]  flex justify-center item items-center'>
        <div className='md:w-[90%] relative md:h-[95%] h-[95%] w-[95%] '>
            <div className='w-[100px] h-[50px] overflow-x-hidden box-shadow bg-red-500 rounded-md dark:border-2px dark:border-gray-500   flex flex-wrap text-gray-200 dark:text-red-500 shadow-lg overflow-y-hidden items-center dark:bg-transparent   text-[20px]'><motion.span
            animate={{
                translateX: ["-50px", "0px", "0px", "25px"],
                translateY: ["0", "0", "-15px", "-15px"]
            }}

            transition={{
                duration: 3,
                ease: "easeInOut",

            }}
             className=' w-[50%] justify-center text-shadow mt-3 text-[16px] font-semibold tracking-wider  flex font-mono '>just</motion.span>
            <motion.span
            animate={{
                translateX: ["50px", "0", "0", "-25px",],
                translateY: ["0", "0", "15px", "15px"]
            }} 

            transition={{
                duration: 3,
                ease: "easeInOut",

            }}
            className='w-[50%] -mt-3 flex justify-center text-shadow items-center font-semibold font-mono tracking-wider'>BlogIt</motion.span></div>
            <h1 className='w-[100px] flex flex-wrap text-gray-800 text-[25px] capitalize dark:text-gray-200 font-semibold'>hello,</h1>
            <h1 className='w-[300px] flex flex-wrap text-gray-800 text-[25px] capitalize dark:text-gray-200 font-semibold '>create your profile.</h1>
            <img id='prevImage' className='w-[100px] object-cover h-[100px] block mx-auto rounded-full' src="" alt="" />
            <button id='btn' onClick={() => handleUploadImage()} className='w-[90px] rounded-md right-[25px] top-[200px] h-[30px] border-1px tracking-tight absolute text-gray-500 capitalize text-[12px]'>upload image</button>
            <input id='file' onChange={(e) => {
                uploadImage(e)
                checkInvalidInput()
                }} className='hidden' type="file" />
            <input ref={FirstNameRef}   maxLength={30} className='w-[100%] h-[45px] rounded-md border-1px dark:border-none border-gray-800 focus:outline-none pl-4 dark:border-gray-400 mt-4 dark:text-gray-800 text-[18px] text-gray-800' onChange={(e) => {
                setCreateuserInput({...createUserInput, first_name: e.target.value})
                checkInvalidInput()
                }} type="text" value={createUserInput.email} placeholder='First Name'/>
                <input ref={lastNameRef}  maxLength={30} className='w-[100%] h-[45px] rounded-md border-1px dark:border-none border-gray-800 focus:outline-none pl-4 dark:border-gray-400 mt-4 dark:text-gray-800 text-[18px] text-gray-800' onChange={(e) => {
                setCreateuserInput({...createUserInput, last_name: e.target.value})
                checkInvalidInput()
                }} type="text" value={createUserInput.email} placeholder='Last Name'/>
                <textarea ref={bioRef} onChange={(e) => {setCreateuserInput({...createUserInput, bio: e.target.value})
                checkInvalidInput()
                }}
                value={createUserInput.bio}
                 placeholder='Bio' className='w-[100%] rounded-md tab-container resize-none text-[18px] mt-4 border-gray-800 text-gray-800 focus:outline-none pl-4 pt-2 h-[200px] border-1px' name="" id=""></textarea>
            <button ref={ButtonRef} disabled={isDisable} onClick={() => createUserProfile()} className='w-[180px] h-[45px] dark:text-gray-300 font-semibold cursor-pointer  transition-all duration-200 mx-auto flex justify-center items-center mt-2 text-gray-200  rounded-full space-x-2 capitalize bg-blue-400 '>
                <h1>create profile </h1><LiaSignInAltSolid className='text-[25px]' />
            </button>
        </div>
    </div>
    </div>
  )
}

export default CreateUserProfile
