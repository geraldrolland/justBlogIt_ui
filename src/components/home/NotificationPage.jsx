import React, { useEffect } from 'react'
import { useContext } from 'react'
import { theme } from '../../App'
const NotificationPage = () => {
  const {setIsScrollTop} = useContext(theme)
  useEffect(() => {
    setIsScrollTop(true)
  }, [])
  return (
    <div>

    </div>
  )
}

export default NotificationPage
