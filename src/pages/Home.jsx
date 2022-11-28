import React from 'react'
import { NavLink } from "react-router-dom";

import './css/Home.css'


const Home = () => {

  return (
    <div>
      <div className="ads">
       
      </div>
      <div className="vdoWrapper">
        <div className="vdo">
          <iframe width="500" height="350" title='youtubu'
            src="https://youtube.com/embed/S83hNE_X28Y?playlist=S83hNE_X28Y&loop=1&autoplay=1&mute=1&controls=0">
          </iframe>
        </div>
        <div className="fytyDetail">
          <h1>Fy<span className='fytyColor'>Ty</span> Tournament</h1>
          <p>fytyfytyfytyfytyfytyfytyfytyfytyfytyfytyfytyfytyfytyfytyfytyfytyfytyfytyfyty</p>
          <p>fytyfytyfytyfytyfytyfytyfytyfytyfytyfytyfytyfytyfytyfytyfytyfytyfytyfytyfyty</p>
          <p>fytyfytyfytyfytyfytyfytyfytyfytyfytyfytyfytyfytyfytyfytyfytyfytyfytyfytyfyty</p>
          <p>fytyfytyfytyfytyfytyfytyfytyfytyfytyfytyfytyfytyfytyfytyfytyfytyfytyfytyfyty</p>
          <NavLink className='lightBtn' to="/tournament">Join Tournament</NavLink>
        </div>
      </div>
    </div>
  )
}

export default Home

