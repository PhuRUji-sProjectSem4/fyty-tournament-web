import React from 'react'

import './css/Home.css'

const Home = () => {
  return (
    <div>
      <div>
      Home
      </div>
      <div className="enrollTime">
        <input type="datetime-local" className='dtl'/>
        <span>ถึง</span>
        <input type="datetime-local" className='dtl'/>
      </div>

    </div>
  )
}

export default Home