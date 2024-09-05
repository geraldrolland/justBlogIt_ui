import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import "../../styles/SignUp.css"
import { LiaSignInAltSolid } from "react-icons/lia";
import { GoEye } from "react-icons/go";
import { GoEyeClosed } from "react-icons/go";
import { json, NavLink, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useRef } from 'react';
const SignUp = () => {
    const navigateToCreateUserProfile = useNavigate()
    const [signUpInput, setSignUpInput] = useState({
        username: "",
        email: "",
        password: ""
    })

    const [isDisable, setisDisable] = useState(false)
    const hide = useRef(null)
    const view = useRef(null)
    const inputRef = useRef(null) 
    const usernameRef = useRef(null)
    const buttonRef = useRef(null)
    const emailRef = useRef(null)
    const [isEmailAlreadyExists, setIsEmailAlreadyExist] = useState(false)



    const checkInvalidInput = () => {
        const passwordRegex = /^(?=.*[A-Z])(?=.*[\W_])[A-Za-z\d\W_]{8,}$/;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (usernameRef.current.value !=="" && passwordRegex.test(inputRef.current.value) === true && emailRegex.test(emailRef.current.value) === true) {
            setisDisable(false)
            buttonRef.current.classList.remove("bg-blue-400")
            buttonRef.current.classList.add("bg-blue-800")
            buttonRef.current.classList.add("hover:bg-blue-600")
            console.log("true")
            setisDisable(false)
            return true
        }
        buttonRef.current.classList.add("bg-blue-400")
        buttonRef.current.classList.remove("bg-blue-800")
        buttonRef.current.classList.remove("hover:bg-blue-600")
        console.log("false")
        return false
    }

    const handleSignUp = () => {
        if (checkInvalidInput()) {
            sessionStorage.setItem("userProfileInfo", JSON.stringify(signUpInput))
            navigateToCreateUserProfile("/create-userprofile")
                                    
        }
    }
    const viewPassword = () => {
        inputRef.current.type = "text"
        view.current.classList.add("-z-10")
        hide.current.classList.remove("-z-10")

    }

    const hidePassword = () => {
        inputRef.current.type = "password"
        view.current.classList.remove("-z-10")
        hide.current.classList.add("-z-10")

    }

    useEffect(() => {
        if (usernameRef.current) {
            usernameRef.current.focus()
        }
        checkInvalidInput()
    }, [])
  return (
    <div className='w-[100%]  h-[640px]  flex  items-center justify-center'>
    <div className='lg:w-[360px] md:w-[400px] md:dark:border-1px dark:border-gray-400 md:shadow-md rounded-md h-[550px]  flex justify-center item items-center'>
        <div className='md:w-[90%] relative h-[95%] w-[95%] md:h-[90%] '>
            <div className='w-[100px] h-[50px] overflow-x-hidden box-shadow bg-red-500 rounded-md dark:border-2px dark:border-gray-500   flex flex-wrap text-gray-200 dark:text-red-500 shadow-lg overflow-y-hidden items-center dark:bg-transparent   text-[20px]'><motion.span
            animate={{
                translateX: ["-50px", "0px", "0px", "25px"],
                translateY: ["0", "0", "-15px", "-15px"]
            }}

            transition={{
                duration: 3,
                ease: "easeInOut",

            }}
             className=' w-[50%] tracking-wider font-mono text-[16px] mt-3 justify-center text-shadow items-center flex font-semibold'>just</motion.span>
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
            <h1 className='w-[200px] flex flex-wrap text-gray-800 text-[25px] capitalize dark:text-gray-200 font-semibold '>signup now.</h1>
            <div className='w-[100%] h-[40px]  mt-2 flex justify-between items-center'>
                <small className='text-[14px] dark:text-gray-200'>Already have an account select</small>
                <NavLink to={"/log-in"} className=' w-[90px] h-[100%]  rounded-full flex justify-center items-center border-1px border-gray-800 capitalize font-semibold dark:border-gray-400 dark:text-gray-200 text-gray-700 '>login</NavLink>
            </div>
            {
                isEmailAlreadyExists ? <small className='absolute right-[15%] text-red-700 w-[70%] flex justify-center items-center'>Email already exists</small> : null
            }

            <input maxLength={30} onChange={(e) => {
                setIsEmailAlreadyExist(false)
                setSignUpInput({...signUpInput, username: e.target.value})
                checkInvalidInput()
                }} value={signUpInput.username} ref={usernameRef} className='w-[100%] h-[45px] rounded-md border-gray-800 border-1px dark:border-none focus:outline-none pl-4 dark:border-gray-400 mt-8  dark:text-gray-800 text-gray-800 text-[18px]' type="text" placeholder='Username' />

            <input maxLength={30} onChange={(e) => {
                setIsEmailAlreadyExist(false)
                setSignUpInput({...signUpInput, email: e.target.value})
                checkInvalidInput()
                }} value={signUpInput.email} ref={emailRef} className='w-[100%] h-[45px] rounded-md border-gray-800 focus:outline-none pl-4 dark:border-gray-400 mt-8  dark:text-gray-800 text-gray-800 border-1px dark:border-none text-[18px]' type="text" placeholder='Email' />

            <div className='w-[100%] h-[45px] relative mt-8'>
                <div className='absolute w-[45px] h-[100%] top-0 flex justify-center items-center right-0'>
                <div ref={view} onClick={() => viewPassword()} className='w-[30px] -z-10 h-[30px]  flex justify-center items-center'>
                    <GoEye  className='text-[20px] cursor-pointer  text-gray-900 ' />
                    </div>
                    <div onClick={() => hidePassword()} ref={hide} className='w-[30px] absolute h-[30px]  flex justify-center items-center'>
                    <GoEyeClosed className=' text-[20px] cursor-pointer text-gray-900' />
                    </div>
                </div>
            <input maxLength={20} onChange={(e) => {
                setIsEmailAlreadyExist(false)
                setSignUpInput({...signUpInput, password: e.target.value})
                checkInvalidInput()
                }} value={signUpInput.password} ref={inputRef} className='w-[100%] h-[100%] rounded-md border-gray-800 focus:outline-none border-1px dark:border-none pl-4 dark:border-gray-400 dark:text-gray-800 text-gray-800 text-[18px]' type="text" placeholder='Password' />
            </div>
            <small className='block mt-2 dark:text-gray-200 text-gray-600 tracking-tight'><sup>*</sup>must contain atleast 8 characters, 1 uppercase and 1 special character </small>
            <button ref={buttonRef} disabled={isDisable} onClick={() => {handleSignUp()}} className='w-[150px] h-[45px] dark:text-gray-300 font-semibold cursor-pointer  transition-all duration-200 mx-auto flex justify-center items-center mt-4 text-gray-200 rounded-full space-x-2 capitalize bg-blue-800 '>
                <h1>Sign Up </h1><LiaSignInAltSolid className='text-[25px]' />
            </button>
        </div>
    </div>
    </div>
  )
}

export default SignUp
