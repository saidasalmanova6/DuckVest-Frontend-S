import React from 'react'
import { useEffect } from 'react'
import { Link } from 'react-router'

function Register({ setInp1,setInp2, login ,error}) {
    return (
        <div className='login-page'>
            <div className="login-panel">
                <h2>Log in</h2>
                <div style={{gap: error ? '3px' : '10px'}} >
                    <input type="text" placeholder='Username' onChange={(e) => setInp1(e.target.value)} />
                    <p style={{margin:0,textAlign:'start',color:'#9c2828',display: error ? 'block' : 'none' }}>Username is wrong</p>
                    <input type="password" placeholder='Password' onChange={(e) => setInp2(e.target.value)} />
                    <p style={{margin:0,textAlign:'start',color:'#9c2828',display: error ? 'block' : 'none' }}>Password is wrong</p>
                </div>
                <p>Forgot password?</p>
                <div onClick={() => login()} >
                    <h4> Log in</h4>
                </div>
            </div>
        </div>
    )
}

export default Register