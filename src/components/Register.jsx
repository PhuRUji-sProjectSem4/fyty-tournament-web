import React from 'react'
import "./css/Register.css"

const Register = (props) => {
  return (props.regTrigger)?(
    <div className="regPop">
        <div className="regPop-inner">
            <div className='close' onClick={() => props.setRegTrigger(prev => prev=false)} >x</div>
            { props.children }
            <div className="headbox">
                <h1>สมัครบัญชี Fy<span className='fytyColor'>Ty</span></h1>
            </div>
        </div>
    </div>
  ) : "";
}

export default Register