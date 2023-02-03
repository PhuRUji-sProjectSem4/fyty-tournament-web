import React from 'react'
import { useContext } from 'react'
import { TeamContext } from '../pages/TeamEach';

import "./css/MemberList.css"

const MemberList = (props) => {

  const team = useContext(TeamContext);

  return (
    <div className="member-list-wrape">
      <img src={props.userData.protraitUrl} alt="" />
      <div className={team.ownerId === props.userData.id ? "team-owner" :'username'}>{props.userData.username}</div>
      <div className="member-role">{props.role}</div>
    </div>
  )
}

export default MemberList