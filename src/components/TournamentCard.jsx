import React from 'react'
import { generatePath, useNavigate } from 'react-router-dom';
import { ClientRounteKey } from '../path/coverPath';

import "./css/TournamentCard.css"

const TournamentCard = (props) => {
  const navigate = useNavigate();

  const regStart = (props.regStartTime).slice(0,10);
  const regEnd = (props.regEndTime).slice(0,10)

  function onTourClick(){
    navigate(generatePath(ClientRounteKey.tournamentEach, {id: props.id}))
  }


  return (
    <div className="tourCard" onClick={onTourClick}>
        <img src={props.coverUrl} alt="cover" height="250" width="430"/>
        <div className="tourdetailContrainer">
            <div className="currentJoined"> {props.currentJoin} <span className='joined'> / {props.tourCap} </span>Teams</div>
            <div className="tourdetail">
                <div className="tourName">{props.tourName}</div>
                <div className="reg-label">Register {props.status === "REGISTER" || props.status === "CHECKING" ? "" : "(Close)"}</div>
                <div className= {props.status === "REGISTER" || props.status === "CHECKING" ? "register-time-open" : "register-time-close"}>{regStart} to {regEnd}</div>
            </div>
        </div>
    </div>
  )
}

export default TournamentCard