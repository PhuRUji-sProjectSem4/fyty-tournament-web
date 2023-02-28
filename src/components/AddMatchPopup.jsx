import React from 'react'
import { useForm } from 'react-hook-form'
import { useMutation } from 'react-query'
import { createMatch } from '../apis/tournament/tournament-querie'
import LoadingPage from '../pages/LoadingPage'
import { createMatchFail, createMatchSuc } from '../toasts/tournament-toasts/toast'

import "./css/AddMatchPopup.css"

const AddMatchPopup = (props) => {

  const {isLoading: isCreateMatchLoading, mutateAsync: mutateAsyncCreateMatch} = useMutation(
    createMatch,
    {
      onError(err){
        createMatchFail(err);
      },
      onSuccess(){
        props.refetchMatch();
        createMatchSuc();
      }
    }
  );

  const {
    register,
    handleSubmit,
    formState: {errors}
  } = useForm(
    {
      defaultValues:{
        tourId: props.tournamentDetail.id,
        bracket: null,
        round: null,
        pair: null,
        teamHomeId: null,
        teamAwayId: null,
        date: null
      }
    }
  )

  async function createMatchClient(data) {
    await mutateAsyncCreateMatch(data);
    props.setOpenPopup(prev => prev =false);
  }

  const teamList = props.teams.map((team) =>
    <option key={team.teamJoin.id} value={team.teamJoin.id}>{team.teamJoin.teamName}</option>
  );

  if(isCreateMatchLoading) return(<LoadingPage/>)

  return (
    <div className="addMatchPopupOuter">
        <div className="addMatchPopupInner">
          <div className="closeAddMatchPopup" onClick={() => props.setOpenPopup(false)}>x</div>
          <div className="addMatchHead">
            <h1>Create <span className="fytyColor">Match</span></h1>
          </div>
            <div className="formWrape">
              <form  onSubmit={handleSubmit(createMatchClient)}>
                <select name="bracketSelect" id="bracketSelect" {...register("bracket", {required: "select one option"})}>
                  <option value="" selected disabled>Select Bracket</option>
                  <option value="UPPER">Upper Bracket</option>
                  <option value="LOWWER">Lower Bracket</option>
                </select>

                <select name="roundSelect" id="RoundSelect" {...register("round", {required: "select one option"})}>
                  <option value="" selected disabled>Select Round</option>
                  <option value="1">Round 1</option>
                  <option value="2">Round 2</option>
                  <option value="3">Round 3</option>
                  <option value="4">Round 4</option>
                </select>

                <select name="pairSelect" id="PairSelect" {...register("pair", {required: "select one option"})}>
                  <option value="" selected disabled>Select pair</option>
                  <option value="1">pair 1</option>
                  <option value="2">pair 2</option>
                  <option value="3">pair 3</option>
                  <option value="4">pair 4</option>
                </select>

                <select name="homeTeam" id="homeTeam" {...register("teamHomeId", {required: "select one option"})}>
                  <option value="" selected disabled>Select Home Team</option>
                  {teamList}
                </select>

                <select name="awayTeam" id="awayTeam" {...register("teamAwayId", {required: "select one option"})}>
                  <option value="" selected disabled>Select Away Team</option>
                  {teamList}
                </select>

                <input className='dateInput' type="datetime-local" name="" id="" {...register("date", {required: true})}/>

                <input className='submit' type="submit" value="Create Match" />
              </form>
            </div>
        </div>
    </div>

  )
}

export default AddMatchPopup