import React, { useContext, useState } from 'react'
import { GoGoal } from "react-icons/go";
import { DataContext } from '../DataContext/Context';
function AchieveCard({ item }) {
  let { portfolio } = useContext(DataContext)
  let [hovered, letHovered] = useState(false)
  function enter(name) {
    if (portfolio.badgesList.badges.find(item2 => item2.badgeName == name)) {
      console.log('hovered')
      letHovered(true)
    }
  }
  function leave() {
    letHovered(false)
  }
  return (
    <div className="flipper" onMouseEnter={() => enter(item.badgeName)} onMouseLeave={(e) => leave(e)}>
      <div className='achCard' style={{ filter: !portfolio.badgesList.badges.find(item2 => item2.badgeName == item.badgeName) ? 'opacity(0.3)' : 'opacity(1)', transform: hovered ? 'rotateY(180deg)' : 'initial' }} >
        <div>
          <img src="src/assets/medal.png" alt="" />
          <h2>{item.badgeName}</h2>
        </div>
        <p>Achievement</p>
        <h4>{item.badgeDescription.slice(0, 40)}...</h4>
        <div>
          <p>{item.badgeCriteria}</p>
        </div>
      </div>
      <div className="achCardBack" style={{ transform: !hovered ? 'rotateY(180deg)' : 'initial' }} >
        <p>{item.badgeDescription}</p>
      </div>
    </div>
  )
}

export default AchieveCard