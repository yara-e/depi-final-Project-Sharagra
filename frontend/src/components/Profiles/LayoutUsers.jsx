import React from 'react'
import { Outlet } from 'react-router-dom'
import styleLayout from './LayoutUser.module.css'
import Usersidebar from './UsersProfiles/Usersidebar'

export default function LayoutUsers() {
  return (
    <>
      <div className={styleLayout.profilePage}>
        <div className={styleLayout.sidebar}>
          <Usersidebar/>
        </div>

        <Outlet />
        
      </div>
    </>
  )
}
