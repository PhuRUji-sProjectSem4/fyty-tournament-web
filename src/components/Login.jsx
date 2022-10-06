import React from 'react'

import './css/Login.css'

const Login = (props) => {
  return (props.loginTrigger)?(
    <div className="loginPop">
        <div className="loginPop-inner">
            <div className='close' onClick={() => props.setLoginTrigger(prev => prev=false)} >x</div>
            { props.children }
            <div className="headbox">
                <h1>ล็อกอิน Fy<span className='fytyColor'>Ty</span></h1>
            </div>
        </div>
    </div>
  ) : "";
}

export default Login