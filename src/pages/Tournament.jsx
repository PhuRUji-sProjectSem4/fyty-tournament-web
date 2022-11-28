import React, { useState } from 'react'
import { FliterCard } from '../components';

import "./css/Tournament.css"

const Tournament = () => {
  return (
    <div className='tournament'>
      <div className="tournamentHead">Find Your Tournament</div>
      <FliterCard/>
    </div>
  )
}

export default Tournament