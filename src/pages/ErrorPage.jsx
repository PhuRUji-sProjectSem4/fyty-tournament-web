import React from 'react'
import { useNavigate } from 'react-router-dom'
import { ClientRounteKey } from '../path/coverPath';
import "./css/ErrorPage.css"

const ErrorPage = () => {
  const navigate = useNavigate();

  function onErrorPage(){
    navigate(ClientRounteKey.home)
  }

  return (
    <div className='error-page'>
        <h1>Sorry, Something Went Wrong.</h1>
        <h1>Please Go Back To Home Page.</h1>
        <div className="homeBtn" onClick={onErrorPage} >Back to Home</div>
    </div>
  )
}

export default ErrorPage