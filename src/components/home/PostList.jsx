import React, { useEffect, useRef, useState } from 'react'
import Post from './Post'
import "../../styles/SignUp.css"
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { useContext } from 'react'
import { theme } from '../../App'
import useStore from '../customhooks/UseStore'
const PostList = () => {
  const setPostListRef = useStore(state => state.setPostListRef)
  const postListRef = useRef(null)
  const [scrollDiff, setScrollDiff] = useState(0)
  const {setIsScrollTop} = useContext(theme)
  const fetchAllPosts = async () => {
      const response = await axios.get("https://dummyjson.com/posts")
      return response.data
  }

  const {data, isError, isPending, isSuccess} = useQuery({
    queryKey: ["posts"],
    queryFn: fetchAllPosts
  })

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
    const websocket = new WebSocket("")
    websocket.onopen = () => {

    }

    websocket.onmessage = () => {

    }

    websocket.onclose = () => {

    }
  }, [])

  return (
    <div onScroll={(e) => {checkIsScrollTop(e)}} className='w-[100%]  scroll-smooth tab-container h-[100%]  overflow-y-scroll  '>
        <div ref={postListRef} className='w-[100%]  flex flex-col flex-wrap'>
          {
            isSuccess ? data.posts.map(post => <Post key={post.id} post={post} />) : null

          }
        </div>
    </div>
  )
}

export default PostList
