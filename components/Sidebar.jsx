import { ArrowLeftRight, BriefcaseBusiness, ListOrdered, Medal, Star, User } from 'lucide-react'
import React, { useState } from 'react'
import { NavLink } from 'react-router'

function Sidebar({investor}) {
    return (
        <div className='sidebar'>
            <div>
                <img src="../src/assets/duckk3.png" alt="" />
                <h3>DuckVest </h3>
            </div>
            <div className='menu'>
                <h4>Menu</h4>
                <nav>
                    <NavLink to={`/Portfolio/${investor.username}`}>
                        <div>
                            <BriefcaseBusiness size={22} color='rgba(255, 255, 255,.4)' />
                            <p>Portfolio</p>    
                        </div>
                    </NavLink>
                    <NavLink to={`/Account/${investor.username}`} >
                        <div>
                            <User size={22} color='rgba(255, 255, 255,.4)' />
                            <p>Account</p>
                        </div>
                    </NavLink>
                    <NavLink to={"/Orders"}>
                        <div>
                            <ListOrdered size={22} color='rgba(255, 255, 255,.4)' />
                            <p>Orders</p>
                        </div>
                    </NavLink>
                    <NavLink to={`/Watchlist/${investor.username}`}>
                        <div>
                            <Star size={22} color='rgba(255, 255, 255,.4)'/>
                            <p>Watchlist</p>
                        </div>
                    </NavLink>
                    <NavLink to={"/Achievements"}>
                        <div>
                            <Medal size={22} color='rgba(255, 255, 255,.4)' />
                            <p>Achievements</p>
                        </div>
                    </NavLink>
                    <NavLink to={"/Trade"}>
                        <div>
                            <ArrowLeftRight size={22} color='rgba(255, 255, 255,.4)' />
                            <p>Trade</p>
                        </div>
                    </NavLink>
                </nav>
            </div>
        </div>
    )
}

export default Sidebar