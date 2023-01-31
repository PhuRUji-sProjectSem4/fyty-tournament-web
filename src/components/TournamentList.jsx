import React from 'react'
import { generatePath, useNavigate } from 'react-router-dom'
import { ClientRounteKey } from '../path/coverPath'

import "./css/TournamentList.css"

const TournamentList = (props) => {

  const navigate = useNavigate()

  function onCardClick(){
    navigate(generatePath(ClientRounteKey.tournamentEach, {id: props.id}))
  }
  return (
    <div className="tourList-card" onClick={onCardClick}>
        <div className="tourHead">Tournament</div>
        <div className="tour-name">{props.tourName}</div>
    </div>
  )
}

export default TournamentList