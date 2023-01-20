import React from 'react'
import { generatePath, useNavigate } from 'react-router-dom'
import { ClientRounteKey } from '../path/coverPath'

import "./css/TeamCard.css"

const TeamCard = (props) => {
  const navigate = useNavigate();

  function handleClick(){
    navigate(generatePath(ClientRounteKey.getTeamEach, {id: props.id}))
  }

  return (
    <div className="teamCard" onClick={handleClick}>
        <img src={props.coverUrl} alt="cover" height="250" width="430"/>
        <div className="iconTeam">
            <img src={props.logoUrl} alt="icon" height="90" width="90"/>
        </div>
        <div className="detailContrainer">
            <div className="detail">
                <div className="teamName">{props.teamName}</div>
                <div className="currentTeam"> {props.currentMember} <span> People</span></div>
                <div className="slogan">{props.slogan}</div>
            </div>
        </div>
    </div>
  )
}

export default TeamCard
        