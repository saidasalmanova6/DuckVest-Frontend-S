import React, { useContext } from 'react'
import { FaSearch } from 'react-icons/fa'
import AchieveCard from '../components/AchieveCard'
import { DataContext } from '../DataContext/Context'

function Achievements() {
    let { investor, allBadges } = useContext(DataContext)
    return (
        <>
            <div >
                <div className='portfolio-header'>
                    <h3>Achievements</h3>
                    <div className='person-info'>
                        <img src="../src/assets/react.svg" alt="" />
                        <div>
                            <h5>{investor.username}</h5>
                            <p>{investor.email}</p>
                        </div>
                    </div>
                </div>
                <div className='achi-content'>
                    <p>Unlock achievements as you grow your portfolio, make smart investments, and explore the market.
                        Every badge tells the story of your financial journey.</p>
                    <div className='all-ach' >
                        {allBadges.map((item,i) =>
                            <AchieveCard key={i} item={item} />
                        )}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Achievements