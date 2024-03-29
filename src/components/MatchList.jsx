import React, { useContext, useState } from 'react'
import { useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import { generatePath, useNavigate } from 'react-router-dom'
import { createMatchScore } from '../apis/tournament/tournament-querie';
import { UserContext } from '../App';
import LoadingPage from '../pages/LoadingPage';
import { ClientRounteKey } from '../path/coverPath';
import { createScoreSuc, createScoreSucFail, wrongScore } from '../toasts/tournament-toasts/toast';

import "./css/MatchList.css"
import DeleteMatch from './DeleteMatch';

const MatchList = (props) => {
    const navigate = useNavigate();
    const [user, setUset] = useContext(UserContext);
    const [scoreInput, setScoreInput] = useState(false);
    const [showDelMatch, setShowDelMatch] = useState(false);

    const {isLoading: isCreateScoreLoading, mutateAsync: mutateAsyncCreateScore} = useMutation(
        createMatchScore,
        {
            onError(err){
                createScoreSucFail(err);
            },
            onSuccess(){
                createScoreSuc();
                props.refetchMatch();
                setScoreInput(false);
            }
        }
    )

    const {
        register,
        handleSubmit,
        formState: {error}
    } = useForm(
        {
            defaultValues:{
                matchId: props.id,
                teamHomeScore: null,
                teamAwayScore: null
            }
        }
    )

    function onTeamClick(id){
        return () => navigate(generatePath(ClientRounteKey.getTeamEach, {id}))
    }

    function onConfirm(data){
        data.teamAwayScore = Number(data.teamAwayScore);
        data.teamHomeScore = Number(data.teamHomeScore);
        if(data.teamHomeScore !== data.teamAwayScore &&(data.teamHomeScore + data.teamAwayScore <= 3 || data.teamHomeScore + data.teamAwayScore >= 2)){
            mutateAsyncCreateScore(data)
        }
        else{
            wrongScore()
        }
    }

    if(isCreateScoreLoading) return( <LoadingPage/> )


  return (
        <form className="matchList" onSubmit={handleSubmit(onConfirm)}>
              <div className="pair">Pair: {props.pair}</div>
              <div className="matchDetail">
                  <div className="teamAndScore">
                    <div className="homeTeamName" onClick={onTeamClick(props.homeTeamData.id)}>{props.homeTeamData.teamName}</div> 
                    {scoreInput ? 
                        <div className="inputMatchWrape">
                            <select {...register("teamHomeScore", {required: "select one option"})}>
                                <option value="" selected disabled>score</option>
                                <option value="0">0</option>
                                <option value="1">1</option>
                                <option value="2">2</option>
                            </select>
                        </div> 
                        : 
                        <div className="score"> {props.matchResult === null ? "" : props.matchResult.teamHomeScore} </div>} 
                  </div>
                  <div className="vs">vs</div>
                  <div className="teamAndScore">
                    {scoreInput ? 
                        <div className="inputMatchWrape">
                            <select {...register("teamAwayScore", {required: "select one option"})}>
                                <option value="" selected disabled>score</option>
                                <option value="0">0</option>
                                <option value="1">1</option>
                                <option value="2">2</option>
                            </select>
                        </div> 
                        : 
                        <div className="score"> {props.matchResult === null ? "" : props.matchResult.teamAwayScore} </div>}
                    <div className="awayTeamName" onClick={onTeamClick(props.awayTeamData.id)}>{props.awayTeamData.teamName}</div>
                  </div>
              </div>
              
              <div className="playTime"> Date: {(props.date).slice(0,10)}  Time: {(props.date).slice(11,16)}</div>

              {user.id === props.tournamentDetail.ownerId && props.matchResult === null && !!!scoreInput && props.tournamentDetail.status !== "ENDED" ? 
                <div className="editMatch">
                    <div className="trashMatch" onClick={() => setShowDelMatch(true)}><img src="/asset/trash.svg" alt=""  /></div>
                    <div className='editScoreBtn' onClick={() => setScoreInput(true)}><img src="/asset/edit.png" alt="edit" /></div> 
                </div>
                : <></>}
                {showDelMatch ? <DeleteMatch re={props.refetchMatch} setShowPopup={setShowDelMatch} matchId={props.id} /> : <></>}

                {scoreInput ?<div className='accCan'>
                    <div className="canScoreMatch" onClick={() => setScoreInput(false)}>Cancel</div>
                    <input className="conScoreMatch" type="submit" value="Confirm" />
                </div> : <></>}
        </form>
    )
}

export default MatchList