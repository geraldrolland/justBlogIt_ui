import { createContext, useEffect, useState } from 'react'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import {QueryClient, QueryClientProvider} from "@tanstack/react-query"
import SignUp from "../src/components/account/SignUp"
import LogIn from './components/account/LogIn'
import "./styles/SignUp.css"
const queryClient = new QueryClient()
export const theme = createContext()
function App() {

  const [isDarkMode, setIsDarkMode] = useState(true)

  useEffect(() => {
    const body = document.querySelector(".body")
    if (isDarkMode === true) {
      body.classList.add("bg-gray-800")
      body.classList.add("dark")
      body.classList.remove("body-color")
    } else {
      body.classList.add("body-color")
      body.classList.remove("dark")
      body.classList.remove("bg-gray-800")
    }

    
  }, [isDarkMode])
  return (
    <>
    <theme.Provider
    value={{
      setIsDarkMode
    }} 
     >
    <div className='body'>
    <QueryClientProvider client={queryClient}>
      <Routes>
        <Route path='sign-up' element={<SignUp/>} />
        <Route path='log-in' element={<LogIn/>} />
      </Routes>
      </QueryClientProvider>
      </div>
      </theme.Provider>
    </>
  )
}

export default App
