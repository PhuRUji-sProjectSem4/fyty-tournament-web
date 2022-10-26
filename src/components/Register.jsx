import React, { useState } from 'react'
import "./css/Register.css"

const Register = (props) => {
  const [passwordShow, setPasswordShow] = useState(false)

  function togglePasswordShow (){
    return setPasswordShow(prev => !prev)
  }

  function switchToLogin(){
    
    props.setLoginTrigger(prev => prev=true)
    props.setRegTrigger(prev => prev=false) 
    console.log("wtf happend");
  }


  return (props.regTrigger)?(
    <div className="regPop">
      <div className="regPop-inner">
          <div className='close' onClick={() => props.setRegTrigger(prev => prev=false)} >x</div>
            { props.children }
            <div className="headbox">
                <h1>สมัครบัญชี Fy<span className='fytyColor'>Ty</span></h1>
                <form className="regForm">
                  <input className='textInput' type="text" placeholder='ชื่อผู้ใช้'/>
                  <input className='textInput' type="email" placeholder='อีเมล'/>
                  <div className='pass'>
                    <input className='textInput' type={passwordShow ? "text" : "password"} placeholder='รหัสผ่าน'/>
                    <span className='passwordToggle'><img src={passwordShow ? "/asset/hide.svg" : "/asset/show.svg"} alt="icon" height="23px" width="23Px" onClick={togglePasswordShow}/></span>
                  </div>
                  <div className="switchLogin" onClick={switchToLogin}>มีบัญชีแล้ว</div>
                  <input className='submit' type="submit" value="สมัครบัญชี" />
                  <div className="policyDetail">

                  </div>
                </form>
                <div className="separate">
                  <div className="line"></div>
                  <p>หรือ</p>
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
                  คุณยอมรับ <span>เงื่อนไขข้อตกลงการให้บริการ</span>  และ <span>นโยบายความเป็นส่วนตัว</span> 
                </div>
          </div>
          
        </div>
    </div>
  ) : "";
}

export default Register