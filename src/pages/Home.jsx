import React from 'react'
import { NavLink } from "react-router-dom";

import './css/Home.css'


const Home = () => {

  function onAdsClick(){
    window.open("https://web.facebook.com/FyTyEsport?_rdc=1&_rdr")
  }

  return (
    <div>
      <div className="ads" onClick={onAdsClick}>
        <img src="/asset/slidebar.jpg" alt="slide" />
      </div>

      <div className="vdoWrapper">
        <div className="vdo">
          <iframe width="500" height="350" title='youtubu'
            src="https://youtube.com/embed/S83hNE_X28Y?playlist=S83hNE_X28Y&loop=1&autoplay=1&mute=1&controls=0">
          </iframe>
        </div>
        <div className="fytyDetail">
          <h1>Fy<span className='fytyColor'>Ty</span> Tournament</h1>
          <div className='detail-home'>
            <p>Welcome to FyTy Tournament, the ultimate platform for esports players and organizers!
              Whether you're a pro gamer or just starting out, our platform offers you the opportunity to
              showcase your skills and compete with the best in the world.</p>
          </div>
          <NavLink className='lightBtn' to="/tournament">Join Tournament</NavLink>
        </div>
      </div>
    </div>
  )
}

export default Home

