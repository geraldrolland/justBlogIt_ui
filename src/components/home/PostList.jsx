import React from 'react'
import Post from './Post'
import "../../styles/SignUp.css"
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
const PostList = () => {
  const fetchAllPosts = async () => {
    try {
      const response = await axios.get("")
      return response.data
    } catch (error) {
      return error
    }
  }
  const {data: posts, isError, isPending, isSuccess} = useQuery({
    queryKey: ["posts"],
    queryFn: fetchAllPosts
  })


  return (
    <div className='w-[100%] scroll-smooth tab-container h-[100%]  overflow-y-scroll  '>
        <div className='w-[100%] flex flex-col flex-wrap'>
          {
            /*isSuccess ? posts.map(post => <Post key={post.id} post={post} />) : null*/

          }
            <Post/>
            <Post/>
            <Post/>
            <Post/>
            <Post/>
            <Post/>
            <Post/>
            <Post/>
        </div>
    </div>
  )
}

export default PostList
