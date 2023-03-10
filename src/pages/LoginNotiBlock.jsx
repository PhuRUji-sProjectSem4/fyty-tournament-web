import React from 'react'
import { useNavigate } from 'react-router-dom'
import { ClientRounteKey } from '../path/coverPath';
import "./css/unauth.css"

const LoginNotiBlock = () => {
    const navigate = useNavigate();

    function onUnAuthClick(){
        navigate(ClientRounteKey.home)
    }

  return (
    <div className="loginNotiBlockPage">
        <div className="unauth-noti">
            <h1>Please <span className='fytyColor'>Login</span>  Before Go to Another Page. :)</h1>
            <div className="homeBtn" onClick={onUnAuthClick} >Back to Home</div>
        </div>
    </div>
  )
}

export default LoginNotiBlock