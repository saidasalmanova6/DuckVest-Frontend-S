import React, { useState } from 'react'
import { useEffect } from 'react';

// let i = 0

// let result = [0]    
function Card({ title, value }) {
    return (
        <div className='card'>
            <p>{title}</p>
            <h3>{value}</h3>
        </div>
    )
}

export default Card