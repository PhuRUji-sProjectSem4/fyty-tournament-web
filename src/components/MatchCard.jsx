import React from 'react'
import { generatePath, useNavigate } from 'react-router-dom'
import { ClientRounteKey } from '../path/coverPath';


import "./css/MatchCard.css"
const MatchCard = (props) => {
    const navigate = useNavigate();

    const date = props.date.slice(0,10)
    const time = props.date.slice(11,16)

    function onCardClick(){
        navigate(generatePath(ClientRounteKey.tournamentEach, {id: props.tourId}))
    }
  return (
    <div className="card-wrape" onClick={onCardClick}>
        <div className="round">Round {props.round}</div>
        <div className="teamOpponent">{props.homeTeamName} vs {props.awayTeamName} </div>
        <div className="playDate"><span className='dateLabel'>match start:</span>{date} <span className='time'>{time}</span> </div>
    </div>
  )
}

export default MatchCard