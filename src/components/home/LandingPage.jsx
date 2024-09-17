import React from 'react'
import loginpic from "../../assets/images/log_in_pic.png"
import create_user from "../../assets/images/create_user_pic.png"
import comment_pic from "../../assets/images/comment_pic.png"
import edit_pic from "../../assets/images/edit_profile_pic.png"
import home_pic from "../../assets/images/home_pic.png"
import not_pic from "../../assets/images/notification_pics.png"
import search_pic from "../../assets/images/search_pic.png"
import profile_pic from "../../assets/images/user_profile_pic.png"
import signup_pic from "../../assets/images/sign_up_pic.png"
import { BiLogoFacebook } from "react-icons/bi";
import { RiFacebookLine } from "react-icons/ri";
import { CiTwitter } from "react-icons/ci";
import { CiInstagram } from "react-icons/ci";
import { RiLinkedinLine } from "react-icons/ri";
import "../../styles/signUp.css"
import { motion } from 'framer-motion';
import { NavLink, useNavigate } from 'react-router-dom'
const LandingPage = () => {
  
  return (
    <>
    <div className='w-[100%] h-[620px]'>
    <div className='w-[100%] h-[10%] z-20 sticky background-filter backdrop-blur-md top-0 flex justify-between items-center right-0'>
      <div className='w-[130px] h-[100%]'>
      <div className='w-[100%] h-[100%] overflow-x-hidden box-shadow bg-red-500  dark:border-2px dark:border-gray-500   flex flex-wrap text-gray-200 dark:text-red-500 shadow-lg overflow-y-hidden items-center dark:bg-transparent   text-[20px]'><motion.span
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
      </div>
      <div className='w-[250px] h-[50px]  flex justify-between items-center mr-4'>
        <NavLink to={"/sign-up"} className='w-[130px] h-[100%] hover:bg-blue-500 transition-all duration-300 border-blue-400 shadow-sm flex justify-center items-center hover:border-none border-2px text-amber-500 hover:text-amber-300  rounded-md capitalize font-mono  text-[20px] tracking-wide font-semibold'>
          sign up
        </NavLink>
        <NavLink to={"/log-in"} className='w-[110px] h-[100%] flex justify-center items-center hover:bg-blue-500 transition-all duration-300 border-blue-400 shadow-sm hover:border-none border-2px text-amber-500 hover:text-amber-300  rounded-md font-mono capitalize  text-[20px] tracking-wide font-semibold'>
          login
        </NavLink>
      </div>
    </div>
    <div className='w-[100%] h-[90%] flex justify-between items-center overflow-hidden'>
      <div className='w-[60%] overflow-hidden h-[100%]'>
        <div className='w-[500px] rounded-md h-[150px] mt-24 mb-10 ml-14 p-4 text-[22px] bg-gradient-to-r from-orange-600 to-amber-400 bg-clip-text text-transparent shadow-md'>
          Share your thoughts, connect with others, and engage through comments. Post easily, comment effortlessly, and join a growing community of bloggers
        </div>
        <div className='w-[650px] space-x-2 overflow-hidden ml-14 flex justify-start items-center h-[150px]'>
          <h1 className='text-[85px] letterJ  text-red-300 font-extrabold h-[100%] flex justify-center items-center '>j</h1>
          <h1 className='text-[85px] letterU text-red-300   font-extrabold h-[100%] flex  justify-center items-center '>u</h1>
          <h1 className='text-[85px]  text-red-300  font-extrabold h-[100%] flex justify-center items-center'>s</h1>
          <h1 className='text-[85px]  text-red-300  font-extrabold h-[100%] flex justify-center  items-center'>t</h1>
          <h1 className='text-[85px] text-red-300 font-extrabold h-[100%] flex justify-center items-center'>B</h1>
          <h1 className='text-[85px] text-red-300 font-extrabold h-[100%] flex justify-center items-center'>l</h1>
          <h1 className='text-[85px] text-red-300 font-extrabold h-[100%] flex justify-center items-center  '>o</h1>
          <h1 className='text-[85px] text-red-300 font-extrabold h-[100%]  flex justify-center items-center'>g</h1>
          <h1 className='text-[85px] letterI text-red-300 font-extrabold h-[100%] flex justify-center items-center'>I</h1>
          <h1 className='text-[85px]  text-red-300 font-extrabold h-[100%] flex justify-center items-center'>t</h1>
        </div>
        <NavLink to={"/sign-up"} className='w-[180px] h-[55px] flex justify-center items-center shadow-md mt-10 ml-14 font-semibold rounded-md transition-all duration-300 hover:bg-amber-500 font-mono   bg-amber-600 text-gray-200 tracking-tighter hover:tracking-normal text-[25px] capitalize'>
          get started
        </NavLink>
      </div>
      <div className='w-[35%] h-[100%] overflow-y-hidden rounded-md mr-2'>
        <motion.div
        animate={{
          translateY: ["-10%", "-10%", "-10%", "-10%", "-20%", "-20%", "-20%", "-20%", "-30%", "-30%", "-30%", "-30%", "-40%", "-40%", "-40%", "-40%", "-50%", "-50%", "-50%", "-50%", "-60%", "-60%", "-60%", "-60%", "-70%", "-70%", "-70%", "-70%", "-80%", "-80%", "-80%", "-80%", "-90%", "-90%", "-90%", "-90%"]
        }}
        transition={{
          duration: 20,
          ease: "easeInOut",
          repeat: 180000000
        }}
        className='w-[100%] h-[1000%]'>
          <img className='w-[100%] object-cover h-[10%] border-1px' src={loginpic} alt="" />
          <img className='w-[100%] object-cover h-[10%] border-1px' src={create_user} alt="" />
          <img className='w-[100%] object-cover h-[10%] border-1px' src={signup_pic} alt="" />
          <img className='w-[100%] object-cover h-[10%] border-1px' src={home_pic} alt="" />
          <img className='w-[100%] object-cover h-[10%] border-1px' src={not_pic} alt="" />
          <img className='w-[100%] object-cover h-[10%] border-1px' src={comment_pic} alt="" />
          <img className='w-[100%] object-cover h-[10%] border-1px' src={search_pic} alt="" />
          <img className='w-[100%] object-cover h-[10%] border-1px' src={profile_pic} alt="" />
          <img className='w-[10
          0%] object-cover h-[10%] border-1px' src={edit_pic} alt="" />
          <img className='w-[100%] object-cover h-[10%] border-1px' src={loginpic} alt="" />
        </motion.div>
      </div>
    </div>
    </div>
    <div className='w-[100%] md:h-[400px] mt-24  lg:h-[350px] h-[1200px]  bg-black md:flex'>
        <div className='md:w-[23%] w-[100%] h-[15%] border-b-1px pb-4 border-gray-600 md:pb-0 md:border-0 '>
            <div className='capitalize lg:ml-14 text-white text-2xl   mx-auto tracking-wider pt-4 mt-10'>justBlogIt</div>
            <div className='capitalize lg:ml-14 text-gray-300 md:text-lg mx-auto tracking-wider mt-3'>subscribe</div>
            <div className='  text-md lg:ml-14 tracking-wide mt-4 text-gray-300 md:tracking-tight'>Get 10% off your first order</div>
            <div className='lg:w-[70%] md:w-[90%] h-[40px] border-1px lg:ml-14 mt-2 rounded-[4px] relative w-[75%]'>
                <img className='absolute right-2 top-2' src='' alt="" />
                <input className='w-[100%] h-[100%] bg-transparent pl-2 text-gray-500 placeholder:text-gray-500' maxLength={20} type="text" placeholder='Enter your email' />
            </div>
        </div>
        <div className='md:h-[100%] h-[15%] md:w-[20%] lg:w-[25%] border-b-1px border-gray-600 pb-4 md:pb-0 md:border-0'>
            <div className='text-white text-2xl lg:ml-14 mt-14 capitalize tracking-wider'>support</div>
            <div className='text-md text-gray-300 w-[55%] tracking-wide flex-wrap flex capitalize lg:ml-14 mt-4'>111 Bjay sarani, Dhaka, DH 1515, Bangladesh.</div>
            <div className='text-md lg:ml-14 mt-3 text-gray-300 tracking-wide'>justBlogIt@gmail.com</div>
            <div className='text-gray-300 text-md tracking-wider proportional-nums lg:ml-14 mt-3 '>+88015-88888-9999</div>
        </div>
        <div className='lg:w-[25%] md:w-[24%] w-[100%] md:h-[100%] h-[25%] border-1px  flex justify-center items-center border-b-1px md:border-0 border-gray-600 pb-4 md:pb-0'>
            <div className='w-[50%] h-[100%] '>
                <div className='text-md text-white text-2xl mt-14 tracking-wider'>Account</div>
                <div className='mt-4 text-gray-300 text-md capitalize tracking-wide'>sign up</div>
                <div className='text-gray-300 text-md  mt-4 tracking-wider capitalize'>login</div>
            </div>
            <div className='w-[50%] h-[100%] '>
                <div className='text-2xl text-white mt-14 tracking-wider capitalize'>quick link</div>
                <div className='text-md mt-4 tracking-wider text-gray-200 capitalize'>privacy policy</div>
                <div className='text-gray-300 mt-4 capitalize text-md tracking-wider'>terms of use</div>
                <div className='text-gray-300 text-md capitalize tracking-widest mt-4 '>FAQ</div>
                <div className='text-md text-gray-300 capitalize tracking-widest mt-4'>contact</div>
            </div>
        </div>
        <div className='md:w-[27%] w-[100%] h-[25%] md:h-[100%] md:pb-0 pb-2 flex justify-center items-end'>
            <div className='md:w-[80%] h-[40px]   flex place-content-between place-items-center mt-14 md:mt-4 mx-auto md:mx-0  w-[55%]'>
                <div className='w-[20%] cursor-pointer  h-[100%]  flex justify-center items-center relative overflow-y-hidden'>
                <RiFacebookLine className='text-white w-[24px] h-[32px] transition-all duration-150 hover:text-blue-800 ' />
                </div>
                <div className='w-[20%] h-[100%]  flex cursor-pointer justify-center items-center'>
                <CiTwitter className='text-white transition-all duration-150 ease-in-out hover:text-blue-400 w-[24px] h-[32px]' />
                </div>
                <div className='w-[20%] cursor-pointer h-[100%]  flex justify-center items-center'>
                <CiInstagram className='text-white transition-all duration-150 ease-in-out hover:text-amber-700 w-[24px] h-[32px]' />
                </div>
                <div className='w-[20%] cursor-pointer h-[100%]  flex justify-center items-center'>
                <RiLinkedinLine className='text-white w-[24px] h-[32px] transition-all duration-150 hover:text-blue-600' />
                </div>
            </div>
        </div>
    </div>
    <div className='w-[100%] lg:h-[70px] md:h-[40px] h-[50px]  bg-black flex justify-center items-center border-t-1px border-gray-600 text-gray-700 md:tracking-widest'><span className='text-[25px] inline-block mr-2'>&#169;</span> Copyright Rimel 2022. All right reserved</div>
    </>
  )
}

export  default LandingPage