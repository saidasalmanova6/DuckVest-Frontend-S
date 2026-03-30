import { Loader, Search } from 'lucide-react'
import React, { useContext, useEffect, useState } from 'react'
import AllAssets from '../components/AllAssets'
import LikedAssets from '../components/LikedAssets'
import { DataContext } from '../DataContext/Context'
import axios from 'axios'

function Watchlist({ sell }) {
    const [stocks, setStocks] = useState([])
    const [stocksAPI, setStocksAPI] = useState([])
    let [jarr, letJarr] = useState([])
    let [inpWatch, setInpWatch] = useState('')
    let { id, investor } = useContext(DataContext)
    let [symbols,setSymbols] = useState([])
    
    useEffect(() => {
        axios(`http://localhost:4040/watchlist/get-wl=${id}`)
            .then(data => setStocks(data.data.stocks))
    }, [jarr])
    return (
        <div className='watchlist'>
            <div className='watchlist-header'>
                <h3>Watchlist</h3>
                <div className='person-info'>
                    <img src="../src/assets/react.svg" alt="" />
                    <div>
                        <h5>{investor.username}</h5>
                        <p>{investor.email}</p>
                    </div>
                </div>
            </div>
            <h4>Assets you're tracking. Click to buy or trade.</h4>
            <div className='input-box'>
                <Search />
                <input onChange={(e) => setInpWatch(e.target.value)} type="text" placeholder='Search or filter assets...' />
            </div>
            <div className='watch-tables'>
                <LikedAssets sell={sell} stocks={stocks} stocksAPI={stocksAPI} />
                <AllAssets inpWatch={inpWatch} stocks={stocks} letJarr={letJarr} />
            </div>
        </div>
    )
}

export default Watchlist