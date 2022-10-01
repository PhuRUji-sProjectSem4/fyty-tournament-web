import React from 'react';
import { Link, NavLink } from "react-router-dom";

import "./css/Navbar.css"

const Navbar = () => {
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
        <div className="link"><NavLink to="/Login">ล็อกอิน</NavLink></div>
        <div className="singUp"><NavLink to="/Register"><div className="reg">สมัคร</div></NavLink></div>
      </div>
    </div>
  )
}

export default Navbar