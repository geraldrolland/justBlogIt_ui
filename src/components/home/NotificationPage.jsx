import React, { useEffect } from 'react'
import { useContext } from 'react'
import { theme } from '../../App'
import "../../styles/SignUp.css"
const NotificationPage = () => {
  const {setIsScrollTop} = useContext(theme)
  useEffect(() => {

    setIsScrollTop(true)

    const websocket = new WebSocket("")

    websocket.onopen = () => {

    }

    websocket.onmessage = () => {

    }

    websocket.onclose = () => {

    }
    
  }, [])
  return (
    <div className='w-[100%] h-[100%] tab-container  overflow-y-scroll '>
      <div className='w-[100%] flex flex-col'>

        <div className='w-[100%] border-1px rounded-none md:border-b-0 md:dark:border-1px relative md:mt-3 lg:mt-2 mt-1  justify-evenly flex flex-col items-center h-[120px] md:shadow-md dark:shadow-none md:rounded-md'>
          <div className='w-[100%] mt-4 md:mt-0 h-[40px] mb-3 flex justify-between items-center mr-1'>
            <img className='w-[40px] ml-1 h-[40px] border-1px mr-[2px] rounded-full bg-cover' src="" alt="" />
            <div className='md:w-[450px] w-[100%] space-x-1 md:space-x-2 h-[100%] flex justify-start items-center'>
              <h1 className='text-gray-600 md:tracking-normal tracking-tight capitalize text-[13px] md:text-[15px] font-semibold md:w-[100px] dark:text-gray-400 w-[90px] truncate '>Micheal okoh</h1><h1 className='text-gray-800  w-[110px] md:w-[150px] text-[11px] dark:text-gray-300 md:tracking-normal tracking-tighter md:text-[13px]'>commented on your post</h1>
              <div className='md:w-[6px] md:h-[6px] w-[4px] h-[4px] dark:bg-gray-400 rounded-full bg-gray-800'></div>
              <h1 className='text-gray-500 capitalize truncate md:w-[170px] dark:text-gray-300 md:text-[16px] text-[15px] w-[90px]'>10 ways to become a software engineer</h1>
            </div>
            <div className='md:w-[50px] top-0  md:static absolute md:h-[100%] right-0   flex justify-start items-center mr-1 tracking-tight space-x-1'>
              <h1 className='text-gray-500  text-[15px]'>now</h1>
              <h1 className='text-gray-500 h-[3px] w-[3px] rounded-full bg-gray-500'></h1>
              <h1 className='text-gray-500 h-[3px] w-[3px] rounded-full bg-gray-500'></h1>
              <h1 className='text-gray-500 h-[3px] w-[3px] rounded-full bg-gray-500'></h1>
            </div>
          </div>
          <div className='w-[100%] flex justify-center items-center md:h-[65px] h-[50px]  -mt-2'>
            <img className='w-[60px] h-[100%]' src="" alt="" />
            <h1 className='w-[485px] truncate text-gray-600 text-wrap text-justify text-[13px] h-[100%] dark:text-gray-400 md:leading-none  leading-tight  tracking-tighter md:tracking-tight px-1'>
            It seems like you might be referring to something specific, but the term "elipsium" isn't widely recognized. Could you be thinking of elegy, epitome, epitaph, or something else? If you could provide a bit more context or clarify what you're looking for, I can definitely assist with that!
            It seems like you might be referring to something specific, but the term "elipsium" isn't widely recognized. Could you be thinking of elegy, epitome, epitaph, or something else? If you could provide a bit more context or clarify what you're looking for, I can definitely assist with that!
            </h1>
          </div>
        </div>



      </div>
      
    </div>
  )
}

export default NotificationPage
