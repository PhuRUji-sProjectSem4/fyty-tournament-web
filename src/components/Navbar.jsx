import React, { useState } from 'react';
import { Link, NavLink } from "react-router-dom";
import { Login, Register } from ".";

import "./css/Navbar.css"

const Navbar = () => {

  const [loginPopup, setLoginPopup] = useState(() => false)
  const [regPopup, setRegPopup] = useState(() => false)
  return (
    <div className='navbarBox'>
      <div className="logo">
        <img src="/asset/FyTy_Logo.svg" alt="Logo" width="70px" height="70px" />
        <div className="appNameContrainer">
          <div className="appName"><div>Fy<span className='fytyColor'>Ty</span></div></div>
          <div className="appName">Tournament</div>
        </div>
      </div>
      <div className="navContent">
        <div className="link"><NavLink to="/Home">หน้าแรก</NavLink></div>
        <div className="link"><NavLink to="/Team">ทีม</NavLink></div>
        <div className="link"><NavLink to="/Tournament">ทัวร์นาเมนต์</NavLink></div>
        <div className="link"><NavLink to="/CreateTournament">สร้างทัวร์</NavLink></div>
        <div className="link"><a href="https://www.facebook.com/FyTyEsport" target="_blank" >ติดต่อเรา</a></div>
        <div className="navSearch"><input type="search" name="navSearch" placeholder='ค้นหาเพื่อน, ทีม และทัวร์นาเมนต์'/></div>
        <div className="langBox">
          <div className="changeLang"></div><span>TH</span>
        </div>
        <div className="login" onClick={() => setLoginPopup(prevLoginState => prevLoginState = true)}>ล็อกอิน</div>
        <Login loginTrigger={loginPopup} setLoginTrigger={setLoginPopup} setRegTrigger={setRegPopup}/>
        <div className="singUp"><div className="reg" onClick={() => setRegPopup(prevRegState => prevRegState = true)}>สมัคร</div></div>
        <Register regTrigger={regPopup} setRegTrigger={setRegPopup} setLoginTrigger={setLoginPopup}/>
      </div>
      
    </div>
  )
}

export default Navbar