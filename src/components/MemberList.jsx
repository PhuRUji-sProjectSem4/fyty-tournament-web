import React from 'react'
import { useContext } from 'react'
import { generatePath, useNavigate } from 'react-router-dom';
import { UserContext } from '../App';
import { TeamContext } from '../pages/TeamEach';
import { ClientRounteKey } from '../path/coverPath';

import "./css/MemberList.css"

const MemberList = (props) => {

  const team = useContext(TeamContext);
  const user = useContext(UserContext);

  const navigate = useNavigate();

  function onMemberClick(){
    navigate(generatePath(ClientRounteKey.getUserEach, {id: props.userData.id}))
  }

  return (
    <div className="member-list-wrape" onClick={onMemberClick}>
      <img src={props.userData.protraitUrl} alt="" />
      <div className={team.ownerId === props.userData.id ? "team-owner" :'username'}>{props.userData.username}</div>
      <div className="member-role">{props.role}</div>
      {user[0].id === team.ownerId ? <div className="configteam">x</div> : ""}
    </div>
  )
}

export default MemberList