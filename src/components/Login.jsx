import React, { useState } from 'react'
import { useContext } from 'react';
import { useForm } from 'react-hook-form'
import { localLogin } from '../apis/auth/login';
import { UserContext } from '../App';

import './css/Login.css'

const Login = (props) => {
  const [passwordShow, setPasswordShow] = useState(false);
  const [user, setUser] = useContext(UserContext);

  const {
    register,
    handleSubmit,
  } = useForm(
    {
      defaultValues:{
        username: "",
        password: ""
      }
    }
  );

  async function onSubmit(data){
    const user = await localLogin(data);
    setUser(user);
    localStorage.setItem("token", user.accessToken);
    props.setLoginTrigger(prev => prev=false)
  };

  function togglePasswordShow (){
    return setPasswordShow(prev => !prev)
  };
  
  function switchToReg(){
    props.setLoginTrigger(prev => prev=false)
    props.setRegTrigger(prev => prev=true) 
  };

  return (props.loginTrigger)?(
    <div className="loginPop">
        <div className="loginPop-inner">
            <div className='close' onClick={() => props.setLoginTrigger(prev => prev=false)} >x</div>
            <div className="headbox">
                <h1>Login Fy<span className='fytyColor'>Ty</span></h1>
            </div>
            <form className="loginForm" onSubmit={handleSubmit(onSubmit)}>
              <div className="usernameWrape">
                <input className='textInput' type="text" placeholder='Username' {...register("username")}/>
              </div>
              <div className='passwordWrape'>
                <input className='textInput' type={passwordShow ? "text" : "password"} placeholder='Password' {...register("password")}/>
                <span className='passwordToggle'><img src={passwordShow ? "/asset/hide.svg" : "/asset/show.svg"} alt="icon" height="23px" width="23Px" onClick={togglePasswordShow}/></span>
              </div>
              <div className='forgetPassword'><div>forget password?</div><div onClick={switchToReg}>register</div></div>
              <input className='submit' type="submit" value="Login" />
            </form>
            <div className="separate">
              <div className="line"></div>
              <p>Or</p>
              <div className="line"></div>
            </div>
            <div className="oauth">
              <div className="googleWrapper">
                <div className="icon">
                  <img src="/asset/google.png" alt="googleIcon" width="30" height="30" />
                </div>
                <span className='Text'>Sign in with Google</span>
              </div>
              <div className="facebookWrapper">
                <div className="icon">
                  <img src="/asset/facebook.svg" alt="facebookIcon" width="30" height="30" />
                </div>
                <span className='Text'>Sign in with Facebook</span>
              </div>
              <div className="discordWrapper">
                <div className="icon">
                  <img src="/asset/discord.png" alt="discordIcon" width="30" height="30" />
                </div>
                <span className='Text'>Sign in with Discord</span>
              </div>
            </div>
        </div>
    </div>
  ) : "";
}

export default Login