import React from 'react'
import { useMutation } from 'react-query';
import { generatePath, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { acceptRequest, declinedRequest } from '../apis/team/team-queries';
import { ClientRounteKey } from '../path/coverPath';

import "./css/TeamRequest.css"

const TeamRequest = (props) => {
    const navigate = useNavigate();

    const acceptedReq = () => {
        toast.success("Accepted Request", {
            autoClose : 5000,
            position : "top-right"
        })
    };

    const decliendReq = () => {
        toast.error("Declined Request", {
            autoClose : 5000,
            position : "top-right"
        })
    };

    const error = () => {
        toast.error("Something went wrong try refresh the page", {
            autoClose : 5000,
            position : "top-right"
        })
    };

    const {isLoading: acceptLoading, mutateAsync: mutateAsyncAccept} = useMutation(
        acceptRequest,
        {
            onError(){
                error()
                props.closeTeamReq(prev => prev=false);
            },
            onSuccess(){
                acceptedReq()
                props.reFMem();
                props.reFReq();
                props.closeTeamReq(prev => prev=false);
            }
        }
    )

    const {isLoading: declineLoading, mutateAsync: mutateAsyncDecline} = useMutation(
        declinedRequest,
        {
            onError(){
                error()
                props.closeTeamReq(prev => prev=false);
            },
            onSuccess(){
                decliendReq()
                props.reFMem();
                props.reFReq();
                props.closeTeamReq(prev => prev=false);
            }
        }
    )

    function onCloseClick(){
        props.closeTeamReq(prev => prev=false);
    }

    function userClick(userId){
       return () => navigate(generatePath(ClientRounteKey.getUserEach, {id: userId} ));
    }

    function accTeam(reqId){
        
        return () => mutateAsyncAccept(reqId)
    }

    function delTeam(reqId){
        
        return () => mutateAsyncDecline(reqId)
    }
    
    
    const ReqList = props.requests.map((req) =>
        <div key={req.userData.id} className="reqList">
            <div className="username" onClick={userClick(req.userData.id)}>
                {req.userData.username}
            </div>
            <div className="accTeam" onClick={accTeam(req.id)}>
                Accept
            </div>
            <div className="decline" onClick={delTeam(req.id)}>
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