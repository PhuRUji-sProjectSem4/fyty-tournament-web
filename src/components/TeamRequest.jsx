import React from 'react'
import { generatePath, useNavigate } from 'react-router-dom';
import { ClientRounteKey } from '../path/coverPath';

import "./css/TeamRequest.css"

const TeamRequest = (props) => {
    const navigate = useNavigate();

    function onCloseClick(){
        props.closeTeamReq(prev => prev=false);
    }

    function userClick(userId){
        navigate(generatePath(ClientRounteKey.getUserEach, {id: userId} ));
    }

    function accTeam(){
        console.log("accTeam")
    }

    function delTeam(){
        console.log("delteam")
    }
    
    
    const ReqList = props.requests.map((req) =>
        <div key={req.userData.id} className="reqList">
            <div className="username" onClick={userClick(req.userData.id)}>
                {req.userData.username}
            </div>
            <div className="accTeam" onClick={accTeam}>
                Accept
            </div>
            <div className="decline" onClick={delTeam}>
                Decline
            </div>
        </div>
    );

  return (
    <div className="teamReq-outter">
        <div className="teamReq-inner">
            <div className="close" onClick={onCloseClick}>
                x
            </div>
            <div className="over-head">
                Someone Want to Join Your Team
            </div>
            <div className="reqHeader">
                Your Team Request List
            </div>
            <div className="reqListWrape">
                {ReqList}
            </div>
        </div>
    </div>
  )
}

export default TeamRequest