import React, { useContext } from 'react'
import { useForm } from 'react-hook-form';
import { useMutation} from 'react-query';
import { joinTournament } from '../apis/tournament/tournament-querie';
import { UserContext } from '../App';
import LoadingPage from '../pages/LoadingPage';
import { joinTourFail, joinTourSuc } from '../toasts/tournament-toasts/toast';

import "./css/JoinTournamentPopup.css"

const JoinTournamentPopup = (props) => {
    const [user, setUser] = useContext(UserContext);

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
            props.reTourDetail();
            props.setClosePopup(false);
          }
        }
    );

    const {
      register,
      handleSubmit,
      formState: {error}
    } = useForm(
      {
        defaultValues:{
          teamId: null,
          tourId: props.tourDetail.id
        }
      }
    )

    function joinTournamentSubmit(data){
      mutateAsyncJoinTour(data)
    }
      
      
    const teamListOption = props.userTeam
      .filter((team) => team.team.ownerId === user.id && team.team.currentMember >= 5 && team.team.gameId === props.tourDetail.gameId)
      .map((team) =>
        <option value={team.team.id}>{team.team.teamName}</option>
      );

      if(isJoinTourLoading) return(<LoadingPage/>)

  return (
    <div className="joinTourOuter">
        <div className="joinTourInner">
            <div className="closeAddMatchPopup" onClick={() => props.setClosePopup(false)}>x</div>
            <div className="joinTourPopHead">
                <h1>Join <span className="fytyColor">Tournament</span></h1>
            </div>
            <form className='formWrape' onSubmit={handleSubmit(joinTournamentSubmit)}>
              <select name="userTeamOwner" id="userTeamOwner" {...register("teamId", {required: "select one option"})}>
                <option value="" selected disabled>Select Team to Join</option>
                {teamListOption}
              </select>
              <input className='submit' type="submit" value="Join Tournament" />
              <div className="des">
                Your teams must have more than or equal 5 members and correct game and you must be and team owner.
              </div>
            </form>
        </div>
    </div>
  )
}

export default JoinTournamentPopup