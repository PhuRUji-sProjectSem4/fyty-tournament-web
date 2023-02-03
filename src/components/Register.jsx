import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useMutation } from 'react-query';
import { registerFyTy } from '../apis/user/register-queries';
import LoadingPage from '../pages/LoadingPage';

import "./css/Register.css"

const Register = (props) => {
  const [passwordShow, setPasswordShow] = useState(false);
  const [regError, setRegError] = useState("");
  const { 
    register, 
    handleSubmit,
    formState: { errors} 
  } = useForm(
    {
      defaultValues: {
        username: "",
        email: "",
        password: ""
      }
    }
  );

  const { isLoading: isRegLoading, mutateAsync: mutateAsyncReg} = useMutation(
    registerFyTy,
    {
      onSuccess(){
        console.log("reg success");
      },
      onError() {
        setRegError("Username or Email is Duplicate");
      }
    }
  )

  async function onSubmit(data){
    await mutateAsyncReg(data);
    props.setRegTrigger(prev => prev =false)
  };

  function togglePasswordShow (){
    return setPasswordShow(prev => !prev)
  };

  function switchToLogin(){
    props.setLoginTrigger(prev => prev=true)
    props.setRegTrigger(prev => prev=false) 
  };


  return (props.regTrigger)?(
    <div className="regPop">
      <div className="regPop-inner">
        {isRegLoading ? <div className='loginLoad'><LoadingPage /></div>: 
        <>
          <div className='close' onClick={() => props.setRegTrigger(prev => prev=false)} >x</div>
            <div className="headbox">
                <h1>Register Fy<span className='fytyColor'>Ty</span></h1>
                <form className="regForm" onSubmit={handleSubmit(onSubmit)}>
                  <div className="usernameWrape">
                    <input className='textInput' type="text" placeholder='Username' {...register("username", {require: true, minLength:8, maxLength: 32, pattern: /^[A-Za-z0-9]+$/i })}/>
                    {errors.username && <p className='errors' role="alret">Between 8 and 32 characters a-z, A-Z, 0-9</p> }
                  </div>
                  <div className="emailWrape">
                    <input className='textInput' type="email" placeholder='Email' {...register("email", {required: true}) }/>
                    {errors.email && <p className='errors' role="alret">Email is required</p> }
                  </div>
                  <div className='passwordWrape'>
                    <input className='textInput' type={passwordShow ? "text" : "password"} placeholder='Password' {...register("password", {required: true, minLength:8, maxLength: 32, pattern: /^[A-Za-z0-9]+$/i }) }/>
                    <span className='passwordToggle'><img src={passwordShow ? "/asset/hide.svg" : "/asset/show.svg"} alt="icon" height="23px" width="23Px" onClick={togglePasswordShow}/></span>
                    {errors.password && <p className='errors' role="alret">Between 8 and 32 characters a-z, A-Z, 0-9</p> }
                  </div>
                  {regError === "" ? <></> : <div className='regError'>{regError}</div> }
                  <div className="switchLogin" onClick={switchToLogin}>have an accout?</div>
                  <input className='submit' type="submit" value="Register" />
                </form>
                <div className="separate">
                  <div className="line"></div>
                  <p>or</p>
                  <div className="line"></div>
                </div>
                <div className="oauth">
                  <div className="googleWrapper">
                    <div className="icon">
                      <img src="/asset/google.png" alt="googleIcon" width="30" height="30" />
                    </div>
                    <span className='Text'>Sign up with Google</span>
                  </div>
                    <div className="facebookWrapper">
                      <div className="icon">
                        <img src="/asset/facebook.svg" alt="facebookIcon" width="30" height="30" />
                      </div>
                      <span className='Text'>Sign up with Facebook</span>
                    </div>
                  <div className="discordWrapper">
                    <div className="icon">
                      <img src="/asset/discord.png" alt="discordIcon" width="30" height="30" />
                    </div>
                    <span className='Text'>Sign up with Discord</span>
                  </div>
                </div>
                <div className="separate">
                  <div className="longLine"></div>
                </div>
                <div className="policyDetail">
                  I accept FyTy's &nbsp; <span> Tearms of use</span>&nbsp;and&nbsp;<span> Privacy Notice.</span> 
                </div>
          </div>
        </>
        }  
          
        </div>
    </div>
  ) : "";
}

export default Register