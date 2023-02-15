import React from 'react'
import { generatePath, useNavigate } from 'react-router-dom'
import { ClientRounteKey } from '../path/coverPath';

import "./css/TeamList.css"

const TeamList = (props) => {
    const navigate = useNavigate();

    function onTeamWrapeClick(){
        navigate(generatePath(ClientRounteKey.getTeamEach,{id: props.teamJoin.id}))
    }

  return (
    <div className="teamListWrape" onClick={onTeamWrapeClick}>
        <img src={props.teamJoin.logoUrl} alt="logo" />
        <div className="teamName">
            {props.teamJoin.teamName}
        </div>
    </div>
  )
}

export default TeamList