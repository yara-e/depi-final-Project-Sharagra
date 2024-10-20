import React from 'react'
import { Outlet } from 'react-router-dom'
import styleLayout from './LayoutUser.module.css'
import Adminsidebar from './AdminProfile/Adminsidebar'

export default function LayoutAdmin() {
    return (
        <>
            <div className={styleLayout.profilePage}>
                <div className={styleLayout.sidebar}>
                    <Adminsidebar/>
                </div>

                <Outlet />

            </div>
        </>
    )
}
