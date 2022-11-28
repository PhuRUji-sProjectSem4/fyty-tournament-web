import React, { useState } from 'react';
import { Link, NavLink } from "react-router-dom";
import { Login, Register, SearchBar } from ".";

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
        <div className="link"><NavLink to="/Home">Home</NavLink></div>
        <div className="link"><NavLink to="/Team">Teams</NavLink></div>
        <div className="link"><NavLink to="/Tournament">Tournaments</NavLink></div>
        <div className="link"><NavLink to="/CreateTournament">Create</NavLink></div>
        <div className="link"><a href="https://www.facebook.com/FyTyEsport" target="_blank" >Contarct</a></div>
        <div className="navSearch"><SearchBar placeholder="Find Your Friend, Team and Tournament"/></div>
        {/* <div className="navSearch"><input type="search" name="navSearch" placeholder='Search Friend, Tornament'/></div> */}
        <div className="login" onClick={() => setLoginPopup(prevLoginState => prevLoginState = true)}>Login</div>
        <Login loginTrigger={loginPopup} setLoginTrigger={setLoginPopup} setRegTrigger={setRegPopup}/>
        <div className="singUp"><div className="reg" onClick={() => setRegPopup(prevRegState => prevRegState = true)}>Join</div></div>
        <Register regTrigger={regPopup} setRegTrigger={setRegPopup} setLoginTrigger={setLoginPopup}/>
      </div>
      
    </div>
  )
}

export default Navbar