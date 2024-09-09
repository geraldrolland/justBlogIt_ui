import { createContext, useEffect, useState } from 'react'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import {QueryClient, QueryClientProvider} from "@tanstack/react-query"
import SignUp from "../src/components/account/SignUp"
import LogIn from './components/account/LogIn'
import "./styles/SignUp.css"
import BlogItemsPage from './components/home/BlogItemsPage'
import PostList from './components/home/PostList'
import UploadPage from './components/home/UploadPage'
import NotificationPage from './components/home/NotificationPage'
import UserProfile from './components/home/UserProfile'
import EditUserProfile from './components/home/EditUserProfile'
import CreateUserProfile from './components/home/CreateUserProfile'
export const queryClient = new QueryClient()
export const theme = createContext()
function App() {

  const [isDarkMode, setIsDarkMode] = useState(false)
  const [isScrollTop, setIsScrollTop] = useState(false)

  useEffect(() => {
    if (isDarkMode === true) {
      document.body.classList.add("bg-gray-800")
      document.body.classList.add("dark")
      document.body.classList.remove("body-color")
    } else {
      document.body.classList.add("body-color")
      document.body.classList.remove("dark")
      document.body.classList.remove("bg-gray-800")
    }

    
  }, [isDarkMode])
  return (
    <>
    <theme.Provider
    value={{
      setIsDarkMode,
      isDarkMode,
      setIsScrollTop,
      isScrollTop,
    }} 
     >
    
    <QueryClientProvider client={queryClient}>
    <div className='body w-[100%] h-[100%]'>
      <Routes>
        <Route path='/' element={<BlogItemsPage/>}>
        <Route index element={<PostList/>} />
        <Route path='post-list/' element={<PostList/>} />
        <Route path="notification" element={<NotificationPage/>} />    
        <Route path="upload-post" element={<UploadPage/>} />
        <Route path='/user-profile' element={<UserProfile/>} />
        <Route path='/edit-userprofile' element={<EditUserProfile/>} />
        </Route>
        <Route path='create-userprofile' element={<CreateUserProfile/>} />
        <Route path='sign-up' element={<SignUp/>} />
        <Route path='log-in' element={<LogIn/>} />
      </Routes>
      </div>
      </QueryClientProvider>
      </theme.Provider>
    </>
  )
}

export default App
