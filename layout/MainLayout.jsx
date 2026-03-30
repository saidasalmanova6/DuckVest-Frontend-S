import React from 'react'
import { Outlet } from 'react-router'
import Sidebar from '../components/Sidebar'

function MainLayout({investor}) {
    return (
        <>
            <Sidebar investor={investor} />
            <main>
                <div className='container'>
                    <Outlet/>
                </div>
            </main>
        </>
    )
}

export default MainLayout