import React, { useState } from 'react';
import { useContext } from 'react';
import { generatePath, Navigate, NavLink, useNavigate } from "react-router-dom";
import { Login, Register } from ".";
import { UserContext } from '../App';
import { ClientRounteKey } from '../path/coverPath';

import "./css/Navbar.css"
import NavPopup from './NavPopup';

const Navbar = () => {
  let searchInput = "";
  let path = "/asset/caret_down.svg"
  const navigate = useNavigate();

  const [loginPopup, setLoginPopup] = useState(() => false)
  const [regPopup, setRegPopup] = useState(() => false)

  const [navPopup, setNavPopup] = useState(() => false)

  const [user, setUser] = useContext(UserContext);

  function handleSearchChange(event){
    searchInput = event.target.value;
    console.log(searchInput);
  }

  function togglePopup(){
    setNavPopup(() => !navPopup)
  }

  return (
    <div className='navbarBox'>
      <div className="logo">
        <img src="/asset/FyTy_Logo.svg" alt="Logo" width="70px" height="70px" />
        <div className="appNameContrainer">
          <div className="appName"><div>Fy<span className='fytyColor'>Ty</span></div></div>
          <div className="appName">Tournament</div>
        </div>
      </div>
        <div className="navbarLinkWrape">
          <div className="link"><NavLink to="/home">Home</NavLink></div>
          <div className="link"><NavLink to="/team">Teams</NavLink></div>
          <div className="link"><NavLink to="/tournament">Tournaments</NavLink></div>
          <div className="link"><NavLink to="/createTournament">Create</NavLink></div>
          <div className="link"><a href="https://www.facebook.com/FyTyEsport" target="_blank" >Contarct</a></div>
        </div>
        {user ? (
          <div className="userInfo">
            <img className='profileIcon' src={user?.protraitUrl} alt="profilePic"/>
            {user?.username}
            <img className='iconlog' src={navPopup ? "/asset/caret_up.svg" : "/asset/caret_down.svg"} alt=">" onClick={togglePopup} />
            {navPopup ? <NavPopup toggleNavPopup = {setNavPopup}/>: <></>}
          </div>
        ): (
          <div className="login-box">
          <div className="login" onClick={() => setLoginPopup(prevLoginState => prevLoginState = true)}>Login</div>
          <Login loginTrigger={loginPopup} setLoginTrigger={setLoginPopup} setRegTrigger={setRegPopup}/>
          <div className="singUp"><div className="reg" onClick={() => setRegPopup(prevRegState => prevRegState = true)}>Join</div></div>
          <Register regTrigger={regPopup} setRegTrigger={setRegPopup} setLoginTrigger={setLoginPopup}/>
          </div>
        ) }
      </div>
  )
}

export default Navbar