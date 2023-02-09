import React, { useContext } from 'react'
import { useMutation } from 'react-query';
import { toast } from 'react-toastify';
import { reqJoieTeam } from '../apis/team/team-queries';
import { UserContext } from '../App';
import LoadingPage from '../pages/LoadingPage';
import { TeamContext } from '../pages/TeamEach';
import "./css/ConfrimPopup.css"

const ConfrimPopup = (props) => {
    const [user, setUser] = useContext(UserContext);
    const team = useContext(TeamContext);

    const reqSuc = () => {
        toast.success("Request Success", {
            autoClose : 5000,
            position : "top-right"
        })
    };

    const reqFail = () => {
        toast.error("Request Fail, You Have Already Requested", {
            autoClose : 5000,
            position : "top-right"
        })
    };

    const {isLoading: isJoinTeamLoading, mutateAsync: mutateAsyncJoinTeam} = useMutation(
        reqJoieTeam,
        {
            onError(){
                reqFail()
            },
            onSuccess(){
                reqSuc()
                props.reFReq()
            }
        }
    )

    function confim(){
        mutateAsyncJoinTeam({userId: user.id, teamId: team.id });
        props.popStatus(prev => prev = false);
    }

    function cancel(){
        props.popStatus(prev => prev = false);
    }

  return (
        <div className="con-outer">
            {
            isJoinTeamLoading ? <div className='loginLoad'><LoadingPage /></div> :
            
                <div className="con-inner">
                    <div className="message">
                         Do you want to join <span className='teamNameCon'>{props.message}</span> team ?
                    </div>
                    <div className="acc-del">
                        <div className="cancel" onClick={cancel}>
                            No, Cancel It.
                        </div>
                    <div className="accept" onClick={confim}>
                        Yes, Do It.
                    </div>
                    </div>
                </div>
            }
        </div>
    )
}

export default ConfrimPopup