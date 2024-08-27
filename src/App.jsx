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
      setIsDarkMode
    }} 
     >
    
    <QueryClientProvider client={queryClient}>
    <div className='body w-[100%] h-[697px]'>
      <Routes>
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
