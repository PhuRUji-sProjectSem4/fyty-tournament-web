import React, { useContext } from 'react'
import { useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { leaveTeam } from '../apis/team/team-queries';
import LoadingPage from '../pages/LoadingPage'
import { TeamContext } from '../pages/TeamEach';
import { ClientRounteKey } from '../path/coverPath';
import "./css/ConfrimPopup.css"

const LeaveConfirm = (props) => {
    const team = useContext(TeamContext);
    const navigate = useNavigate();

    const reqSuc = () => {
        toast.success("you left a team", {
            autoClose : 5000,
            position : "top-right"
        })
    };

    const reqFail = () => {
        toast.error("Request Fail, Somthing went wrong", {
            autoClose : 5000,
            position : "top-right"
        })
    };

    const {isLoading: isLeaveTeamLoading, mutateAsync: mutateAsyncLeaveTeam} = useMutation(
        leaveTeam,
        {
            onError(){
                reqFail()
            },
            onSuccess(){
                reqSuc()
                navigate(ClientRounteKey.getTeams)
            }
        }
    )

    function confim(){
        mutateAsyncLeaveTeam(team.id)
        props.popStatus(prev => prev = false);
    }

    function cancel(){
        props.popStatus(prev => prev = false);
    }

  return (
    <div className="con-outer">
        {
        isLeaveTeamLoading ? <div className='loginLoad'><LoadingPage /></div> :
        
            <div className="con-inner">
                <div className="message">
                  Do you want to leave <span className='teamNameCon'>{props.message}</span> team ?
                </div>
                <div className="acc-del">
                    <div className="cancel" onClick={cancel}>
                        No, Cancel It.
                    </div>
                    <div className="accept-leave" onClick={confim}>
                        Yes, Leave.
                    </div>
                </div>
            </div>
        }
    </div>
  )
}

export default LeaveConfirm