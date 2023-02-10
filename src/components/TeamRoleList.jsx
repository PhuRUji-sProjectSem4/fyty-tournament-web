import React from 'react'
import { generatePath, useNavigate } from 'react-router-dom';
import { ClientRounteKey } from '../path/coverPath';

import "./css/MemberList.css"

const TeamRoleList = (props) => {

    const navigate = useNavigate();

    function onMemberClick(){
        navigate(generatePath(ClientRounteKey.getTeamEach, {id: props.team.id}))
    }

  return (
    <div className="member-list-wrape" onClick={onMemberClick}>
      <img src={props.team.logoUrl} alt="" />
      <div className='username'>{props.team.teamName}</div>
      <div className={ props.team.ownerId === props.userId  ? "team-owner": "member-role"}> { props.team.ownerId === props.userId  ? <>Owner</> : props.role}</div>
    </div>
  )
}

export default TeamRoleList