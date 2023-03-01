import React from 'react'
import { useMutation } from 'react-query';
import { joinTournament } from '../apis/tournament/tournament-querie';
import { joinTourFail, joinTourSuc } from '../toasts/tournament-toasts/toast';

import "./css/JoinTournamentPopup.css"

const JoinTournamentPopup = (props) => {

    const { isLoading: isJoinTourLoading, mutateAsync: mutateAsyncJoinTour} = useMutation(
        joinTournament,
        {
          onError(err){
            joinTourFail(err);
            props.setClosePopup(false);
          },
          onSuccess(){
            joinTourSuc();
            props.refetchJoin();
            props.setClosePopup(false);
          }
        }
      );

  return (
    <div className="joinTourOuter">
        <div className="joinTourInner">
            <div className="closeAddMatchPopup" onClick={() => props.setClosePopup(false)}>x</div>
            <div className="joinTourPopHead">
                <h1>Join <span className="fytyColor">Tournament</span></h1>
            </div>
        </div>
    </div>
  )
}

export default JoinTournamentPopup