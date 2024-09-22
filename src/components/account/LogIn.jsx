import React, { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import "../../styles/SignUp.css"
import { LiaSignInAltSolid } from "react-icons/lia";
import { GoEye } from "react-icons/go";
import { GoEyeClosed } from "react-icons/go";
import { NavLink } from 'react-router-dom';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import LogInLoader from '../home/LogInLoader';
const LogIn = () => {
    const hide = useRef(null)
    const view = useRef(null)
    const inputRef = useRef(null) 
    const emailRef = useRef(null)
    const navigateToHome = useNavigate()
    const ButtonRef = useRef(null)
    const [isClicked, setIsClicked] = useState(false)
    const [isWrongEmailOrPassword, setIsWrongEmailOrPassword] = useState(false)
    const [isDisable, setisDisable] = useState(true)

    const [logInPut, setLogInput] = useState({
        email: "",
        password: ""
    })


    const hidePassword = () => {
        inputRef.current.type = "password"
        view.current.classList.remove("-z-10")
        hide.current.classList.add("-z-10")

    }

    const viewPassword = () => {
        inputRef.current.type = "text"
        view.current.classList.add("-z-10")
        hide.current.classList.remove("-z-10")

    }

    const LogInUser = async () => {
        setisDisable(true)
        setIsClicked(true)
        try {
            console.log(logInPut)
            const response = await axios.post("http://127.0.0.1:8000/users/login_user/", logInPut)
            if (response.status === 200) {
                setisDisable(false)
                const userStatus = {...response.data, isUserLoggedIn: true}
                console.log("navigat to home")
                sessionStorage.removeItem("userProfileInfo")
                sessionStorage.setItem("userStatus", JSON.stringify(userStatus))
                navigateToHome("/home")
            } 
    

        }
        catch(error) {
            if (error.response.status === 404 || error.response.status === 401) {
                setIsWrongEmailOrPassword(true)
                console.log("wrong email")
            }
            setisDisable(false)
            setIsClicked(false)
            console.log(error)
        }

    }

    const handleLogIn = () => {
        if (checkInvalidInput()) {
            LogInUser()
        }
    }


    const checkInvalidInput = () => {
        const passwordRegex = /^(?=.*[A-Z])(?=.*[\W_])[A-Za-z\d\W_]{8,}$/;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (emailRegex.test(emailRef.current.value) === true && passwordRegex.test(inputRef.current.value) === true) {
            setisDisable(false)
            ButtonRef.current.classList.add("bg-blue-800")
            ButtonRef.current.classList.add("hover:bg-600-blue")
            ButtonRef.current.classList.remove("bg-blue-400")
            return true
        }
        ButtonRef.current.classList.remove("bg-blue-800")
        ButtonRef.current.classList.remove("hover:bg-600-blue")
        ButtonRef.current.classList.add("bg-blue-400")
        return false
    }


    useEffect(() => {
        emailRef.current.focus()
        checkInvalidInput()
    }, [])

  return (
    <div className='w-[100%] h-[640px]  flex  items-center justify-center'>
    <div className='lg:w-[360px] md:w-[400px] md:dark:border-1px  dark:border-gray-400 md:shadow-md  rounded-md h-[530px]  flex justify-center item items-center'>
        <div className='md:w-[90%] relative md:h-[90%] h-[95%] w-[95%] '>
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
            <h1 className='w-[200px] flex flex-wrap text-gray-800 text-[25px] capitalize dark:text-gray-200 font-semibold '>login now.</h1>
            <div className='w-[100%] h-[40px]  mt-2 flex justify-start space-x-4 items-center'>
                <small className='text-[14px] dark:text-gray-200'>new user</small>
                <NavLink to={"/sign-up"} className=' w-[90px] h-[100%]  rounded-full flex justify-center items-center border-1px border-gray-800 capitalize font-semibold dark:border-gray-400 dark:text-gray-200 text-gray-700 '>sign up</NavLink>
            </div>
            { isWrongEmailOrPassword ?
            <small className='text-red-600 w-[70%] left-[15%] flex justify-center items-center mt-2 mx-auto absolute'>Wrong email or password</small> : null
            }
            <input ref={emailRef} maxLength={30} className='w-[100%] h-[45px] rounded-md border-1px dark:border-none border-gray-800 focus:outline-none pl-4 dark:border-gray-400 mt-8 dark:text-gray-800 text-[18px] text-gray-800' onChange={(e) => {
                setIsWrongEmailOrPassword(false)
                setLogInput({...logInPut, email: e.target.value})
                checkInvalidInput()
                }} type="text" value={logInPut.email} placeholder='Email' />

            <div className='w-[100%] h-[45px] relative mt-8'>
                <div className='absolute w-[45px] h-[100%] top-0 flex justify-center items-center right-0'>
                    <div ref={view} onClick={() => viewPassword()} className='w-[30px] -z-10 h-[30px]  flex justify-center items-center'>
                    <GoEye  className='text-[20px] cursor-pointer  text-gray-900 ' />
                    </div>
                    <div onClick={() => hidePassword()} ref={hide} className='w-[30px] absolute h-[30px]  flex justify-center items-center'>
                    <GoEyeClosed className=' text-[20px] cursor-pointer text-gray-900' />
                    </div>
                </div>
            <input maxLength={20} ref={inputRef} onChange={(e) => {
                setIsWrongEmailOrPassword(false)
                setLogInput({...logInPut, password: e.target.value})
                checkInvalidInput()
                }} className='w-[100%] h-[100%] rounded-md border-1px dark:border-none border-gray-800 focus:outline-none pl-4 dark:border-gray-400 dark:text-gray-800 text-gray-800 text-[18px]' type="text" placeholder='Password' />
            </div>
            <small className='block mt-2 dark:text-gray-200 text-gray-600'><sup>*</sup>must contain atleast 8 characters, 1 uppercase and 1 special character</small>
            <button ref={ButtonRef} disabled={isDisable} onClick={() => handleLogIn()} className='w-[150px] h-[45px] dark:text-gray-300 font-semibold cursor-pointer transition-all duration-200 mx-auto flex justify-center items-center mt-4 text-gray-200  rounded-full space-x-2 capitalize bg-blue-800 '>
                { isClicked ? <LogInLoader/> : 
                <><h1>login </h1><LiaSignInAltSolid className='text-[25px]' /></>
                }

            </button>
        </div>
    </div>
    </div>
  )
}

export default LogIn
