import React, { useEffect, useRef, useState } from 'react'
import Post from './Post'
import "../../styles/SignUp.css"
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { useContext } from 'react'
import { theme } from '../../App'
import useStore from '../customhooks/UseStore'
import UseRequest from '../customhooks/UseRequest'
import Loader from './Loader'
const PostList = () => {
  const setPostListRef = useStore(state => state.setPostListRef)
  const postListRef = useRef(null)
  const [scrollDiff, setScrollDiff] = useState(0)
  const {setIsScrollTop} = useContext(theme)


  const {data, isError, isPending, isSuccess} = UseRequest("http://127.0.0.1:8000/posts/get_posts/", "get", null, "posts")
  const checkIsScrollTop = (e) => {
    if (e.target.scrollTop > scrollDiff) {
      setIsScrollTop(false)
      setScrollDiff(e.target.scrollTop)
    } else {
      setIsScrollTop(true)
      setScrollDiff(e.target.scrollTop)
    }

  }


  useEffect(() => {
    setPostListRef(postListRef.current)
    setIsScrollTop(true)
    /*const websocket = new WebSocket("ws://127.0.0.1:8000/ws/broadcast/")
    websocket.onopen = () => {

    }

    websocket.onmessage = () => {

    }

    websocket.onclose = () => {

    }*/
  }, [])

  return ( isPending ? <Loader/> :
    <div onScroll={(e) => {checkIsScrollTop(e)}} className='w-[100%]  scroll-smooth tab-container h-[100%]  overflow-y-scroll  '>
        <div id='THIS IS POST LIST' ref={postListRef} className='w-[100%]  flex flex-col flex-wrap'>
          {
            isSuccess ? data?.map(post => <Post key={post.id} post={post} />) 
            : null
          }
        </div>
        { 
            isError ? <div className='w-[100%] h-[100%] bg-gray-100 dark:bg-gray-700 flex justify-center items-center text-gray-400 rounded-md capitalize text-[130px] text-wrap'>
            No Post
          </div> : null
        }
    </div>
  )
}

export default PostList
