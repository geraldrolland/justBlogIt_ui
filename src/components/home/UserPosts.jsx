import React, { useRef } from 'react'
import placeholder from "../../assets/images/imageplaceholder.png"
import UseRequest from '../customhooks/UseRequest';
const UserPosts = ({userpost}) => {
    const deleteUserPost = UseRequest("http://127.0.0.1:8000/posts/"+ userpost?.postId + "/delete_post/", "delete", null, true, null);

    const buttonRef  = useRef(null)
  return (
    <div style={{
        display: deleteUserPost?.isSuccess ? "none" : "block"
    }} className='relative w-[100%] hover:mb-14 group hover:h-[210px] transition-all duration-300  h-[170px] mt-2'>
     <button onClick={() => {
        deleteUserPost.mutate()
        }}  className='absolute w-[100px] border-2px dark:border-none dark:bg-red-500 dark:text-gray-300 right-0 group-hover:translate-y-[0px] transition-all duration-300 bottom-0 h-[30px] capitalize text-red-700 text-[15px] tracking-wide border-red-400 rounded-[4px] transform -translate-y-[40px] group-hover:z-10 '>
            {deleteUserPost.isPending ? "deleting" : "delete"}
     </button>
        <div className='w-[100%] relative z-10 top-0 right-0  mx-auto  rounded-md h-[170px]  dark:bg-gray-800 bg-gray-300 md:shadow-md md:dark:shadow-lg'>
    <div className='w-[300px]   space-x-2 flex justify-start items-center h-[30px] '><h1 className='dark:text-gray-400 text-gray-700 truncate font-semibold text-[14px] md:tracking-normal tracking-tight'>{userpost?.user.username}</h1>
    <h1 className='dark:text-gray-400 text-gray-500 w-[80px] text-[12px]'>posted this</h1>
    <div className='w-[6px] h-[6px] bg-gray-600 rounded-full '></div>
    <h1 className='dark:text-gray-300 text-[14px] proportional-nums w-[100px] text-gray-600'>{userpost?.createdAt}</h1>
    </div>
    <div className='w-[450px] h-[30px] flex justify-start items-center md:space-x-2 space-x-1'>
        <h1 className='dark:text-gray-400 text-gray-700 font-semibold tracking-wider'>
            Title
        </h1>
        <div className='w-[30px] rounded-full dark:bg-gray-700 bg-gray-400 h-[10px]'></div>
        <h1 className='dark:text-gray-200 capitalize md:tracking-wide tracking-tighter text-gray-600 md:w-[350px] truncate font-semibold'>
            {userpost?.postTitle}
        </h1>
    </div>
    <div className='w-[100%] h-[80px]  mt-1 flex justify-start items-center'>
        { userpost?.postImage ?
        <img className='w-[100px] rounded-md h-[100%] border-1px' src={userpost?.postImage} alt="" /> : null
        }
        <h1 className='dark:text-gray-300 text-gray-600 overflow-hidden w-[400px] truncate  h-[100%] flex flex-wrap text-wrap text-[13px] p-1  tracking-tight'>
            {userpost?.postText}
        </h1>
    </div>
    <div className='w-[100%] h-[20px] flex justify-between relative items-center mt-[3px]'>
        { userpost?.likes > 0 ?
        <div className='h-[100%] ml-1 space-x-1 flex justify-start left-0 top-0 absolute items-center  w-[70px]'><h1 className="text-[14px]">&#128077;</h1><h1 className='text-blue-700  mt-1 proportional-nums text-[14px]'>
        {userpost?.likes}
        </h1></div> : null
        }
        { userpost?.commentCount ?
        <div className='h-[100%] absolute right-0 top-0 mr-1 space-x-1 flex justify-end items-center  w-[150px]'>
            <h1 className='text-[14px] dark:text-gray-500 text-gray-700'>{
                userpost?.commentCount === 1 ? "comment" : 'comments'
                }</h1>
            <div className='w-[5px] h-[5px] rounded-full bg-gray-400'></div>
            <h1 className='dark:text-gray-400 proportional-nums text-gray-600 text-[12px]'>{userpost?.commentCount}</h1>
        </div> : null
        }

    </div>
</div> </div>
  )
}
export default UserPosts