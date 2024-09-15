import React, { useEffect, useState } from 'react'
import { useContext } from 'react'
import { theme } from '../../App'
import "../../styles/SignUp.css"
import UseRequest from '../customhooks/UseRequest'
import Loader from './Loader'
import placeholder from  "../../assets/images/imageplaceholder.png"
const NotificationPage = () => {
  const {setIsScrollTop} = useContext(theme)
  const [profile_image, setProfile_image] = useState("")

  const notifications = UseRequest("http://127.0.0.1:8000/users/get_notifications/", "get", null, "notifications") 
  useEffect(() => {
    setIsScrollTop(true)
    const userStatus = JSON.parse(sessionStorage.getItem("userStatus"))
    setIsScrollTop(userStatus.profile_image)

    const websocket = new WebSocket("ws://127.0.0.1:8000/ws/broadcast/")

    websocket.onopen = (e) => {
      console.log("connected")

    }

    websocket.onmessage = (e) => {
      const data = JSON.parse(e.data)
      console.log(data)
    }

    websocket.onclose = () => {
      console.log("disconnected")
    } 

    return () => {
      websocket.close()
    }
      
  }, [])
  return ( notifications.isPending ? <Loader/> :
    <div className='w-[100%] h-[100%] tab-container  overflow-y-scroll '>
      <div className='w-[100%] flex flex-col'>
        {
          notifications.isSuccess ? notifications.data.map(notification => 
        <div key={notification.notificationId} className='w-[100%] px-1 border-1px rounded-none md:border-b-0 md:dark:border-1px relative md:mt-3 lg:mt-2 mt-1  justify-evenly flex flex-col items-center h-[120px] md:shadow-md dark:shadow-none md:rounded-md'>
          <div className='w-[100%]  mt-4 md:mt-0 h-[40px] mb-3 flex justify-between items-center mr-1'>
            {
            <img className='w-[40px] ml-1 h-[40px]  mr-[2px] rounded-full ' src={notification.user.image ? notification.user.image : placeholder} alt="" />
            }
            <div className='md:w-[450px] w-[100%] space-x-1 md:space-x-1 h-[100%] flex justify-start items-center'>
              <h1 className='text-gray-600  md:tracking-normal tracking-tight text-[13px] md:text-[15px] font-semibold border-red-400 md:w-[110px] dark:text-gray-400 w-[90px] truncate '>{notification.user.username}</h1><h1 className='text-gray-500   text-[11px] dark:text-gray-300 md:tracking-tight font-semibold tracking-tighter md:text-[12px] '>
                {
                  notification.notificationType === "Comment"  && notification.postTitle ? "commented on your post" : null
                }
                {
                  notification.notificationType === "Reply" && notification.commentText  ? "replied your comment" : null
                }
                {
                  notification.notificationType === "Follow" ? "followed you" : null
                }
                {
                  notification.notificationType === "Unfollow" ? "unfollows you" : null
                }
                {
                  notification.notificationType === "Unlike" && notification.commentText ? "unlikes your comment" : null
                }
                {
                  notification.notificationType === "Like" && notification.commentText ? "likes your comment" : null
                }
                {
                  notification.notificationType === "Like" && notification.postText ? "likes your post" : null
                }
                {
                  notification.notificationType === "Unlike" && notification.postText ? "unlikes your post" : null
                }
                </h1>
                { notification.notificationType === "Follow" || notification.notificationType == "Unfollow" || notification.notificationType === "Like" && notification.commentText || notification.notificationType === "Unlike" && notification.commentText ? null :
              <div className='md:w-[6px] md:h-[6px] w-[4px] h-[4px] dark:bg-gray-400 rounded-full bg-gray-800'></div> 
                }

              { notification.postTitle ?
                <h1 className='text-gray-500  capitalize truncate md:w-[130px]  dark:text-gray-300 md:text-[16.px] text-[15px] w-[80px]'>{notification.postTitle}</h1> : null
              }
            </div>
            <div  className='md:w-[85px]   top-0  md:static absolute md:h-[100%] right-0   flex justify-start items-center  tracking-tight space-x-1'>
              { notification.createdAt ? 
                <div className='text-gray-500 font-semibold w-[100%]     text-[13px] dark:text-gray-400'>
                  {notification.createdAt}
                </div> : null
              }
            </div>
          </div>
          { notification.postImage && notification.postText || notification.commentText && notification.notificationType === "Unlike" || notification.notificationType === "Like" && notification.commentText ?
          <div className='w-[100%] flex justify-center items-center md:h-[65px] h-[50px]  -mt-2'>
          { 
          notification.postImage ?
          <img className='w-[60px] h-[100%]' src={notification.postImage} alt="" /> : null
          }
          { notification.postText || notification.commentText ?
          <h1 className='w-[485px] truncate text-gray-600 text-wrap text-justify text-[13px] h-[100%] dark:text-gray-400 md:leading-none  leading-tight  tracking-tighter md:tracking-tight px-1'>
            {notification.postText}
            {notification.commentText}
          </h1> : null
          }

        </div> :null
          }

        </div>) : <div className='w-[100%] h-[120px] border-1px rounded-md flex justify-center items-center text-[60px] text-gray-400 font-semibold capitalize'>no notification</div>
        }

      </div>
      
    </div>
  )
}

export default NotificationPage
