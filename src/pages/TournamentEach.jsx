import React, { useContext, useState } from 'react'
import { useMutation, useQuery } from 'react-query';
import { useParams } from 'react-router-dom'
import { endTournament, getTournamentEach, getTournamentJoined, getTournamentMatch, registerTournament, startTournament, updateTournamentDetail, updateTournamentRule } from '../apis/tournament/tournament-querie';
import LoadingPage from './LoadingPage'
import ErrorPage from './ErrorPage'
import { UserContext } from '../App';

import "./css/TournamentEach.css"
import TeamList from '../components/TeamList';
import MatchContrianer from '../components/MatchContrianer';
import TournamentStartPopup from '../components/TournamentStartPopup';
import TournamentRegisterPopup from '../components/TournamentRegisterPopup';
import TournamentEndedPopup from '../components/TournamentEndedPopup';
import { endTourFail, endtTourSuc, regTourFail, regTourSuc, startTourFail, startTourSuc, updateRuleFail, updateRuleSuc } from '../toasts/tournament-toasts/toast';
import JoinTournamentPopup from '../components/JoinTournamentPopup';
import { getUserTeam } from '../apis/user/user-queries';
import UploadPicturePopup from '../components/UploadPicturePopup';
import UploadPictureBtn from '../components/UploadPictureBtn';
import { updatePicFail, updatePicSuc } from '../toasts/user-toasts/toast';
import ConfirmDelete from '../components/ConfirmDelete';

const TournamentEach = () => {
    const { id } = useParams();
    const [user, setUser] = useContext(UserContext);
    const [ruleSel, setRuleSel] = useState(true);
    const [matchSel, setMatchSel] = useState(false);
    const [joinSel, setJoinSel] = useState(false);
    const [showInputRule, setShowInputRule] = useState(false);
    const [showJoinTourPopup, setShowJoinTourPopup] = useState(false);
    const [showChangCoverPopup, setShowChangeCoverPopup] = useState(false);
    const [showDelTour, setShowDelTour] = useState(false);

    const [showConfirmReg, setShowConfirmReg] = useState(false);
    const [showConfirmStart, setShowConfirStart] = useState(false);    
    const [showConfirmEnd, setShowConfirmEnd] = useState(false);
    

    const { data: TournamentDetail = [], isError: isTourError, isLoading:isTourLoading, refetch: tourDetailRefetch } = useQuery(
      "tourDetail",
      () => getTournamentEach(id)
    )

    const { data: joinsDetail = [], isError: isjoinError, isLoading:isjoinLoading, refetch: refetchJoinDetail } = useQuery(
      "tourJoined",
      () => getTournamentJoined(id)
    )

    const { data: matches = [], isError: isGetMatchError, isLoading: isGetMatchLoading, refetch: refetchMatch } = useQuery(
      "matches",
      () => getTournamentMatch(id)
    )

    const {data: userTeamData, isError: isUserTeamDataError, isLoading: isUserDataLoading} = useQuery(
      "userTeam",
      () => getUserTeam(user.id)
    )

    const { isLoading: isUpdateRuleLoading, mutateAsync: mutateAsyncUpdateRule } = useMutation(
      updateTournamentRule,
      {
        onError(){
          updateRuleFail();
        },
        onSuccess(){
          updateRuleSuc();
          tourDetailRefetch();
        }
      }
    );

    const { isLoading: isRegisterTournamentLoading, mutateAsync: mutateAsyncRegisterTournament } = useMutation(
      registerTournament,
      {
        onError(){
          regTourFail();
        },
        onSuccess(){
          regTourSuc();
          tourDetailRefetch();
        }
      }
    );

    const { isLoading: StartTournament, mutateAsync: mutateAsyncStartTournament } = useMutation(
      startTournament,
      {
        onError(){
          startTourFail();
        },
        onSuccess(){
          startTourSuc();
          tourDetailRefetch();
        }
      }
    );


    const { isLoading: isEndTournamentLoading, mutateAsync: mutateAsyncEndTournament } = useMutation(
      endTournament,
      {
        onError(){
          endTourFail();
        },
        onSuccess(){
          endtTourSuc();
          tourDetailRefetch();
        }
      }
    );

    const { isLoading: isUpdateTournamentLoading, mutateAsync: mutateAsyncUpdateTournament } = useMutation(
      updateTournamentDetail,
      {
        onError(){
          updatePicFail();
          setShowChangeCoverPopup(false);
        },
        onSuccess(){
          updatePicSuc();
          tourDetailRefetch();
          setShowChangeCoverPopup(false);
        }
      }
    );

    const [rule, setRule] = useState(TournamentDetail?.rule);

    function onRuleClick(){
      setRuleSel(prev => prev = true);
      setMatchSel(prev => prev = false);
      setJoinSel(prev => prev = false);
    }

    function onBracketClick(){
      setRuleSel(prev => prev = false);
      setMatchSel(prev => prev = true);
      setJoinSel(prev => prev = false);
    }

    function onTeamJoinClick(){
      setRuleSel(prev => prev = false);
      setMatchSel(prev => prev = false);
      setJoinSel(prev => prev = true);
    }

    function ruleChange(event){
      setRule(event.target.value)
    }

    async function confirmRule(){
      if(rule === TournamentDetail.rule) {
        setShowInputRule(false);
        return
      };

      if(user.id !== TournamentDetail.ownerId){
        setShowInputRule(false);
        setRule(TournamentDetail.rule)
        return
      }

      await mutateAsyncUpdateRule({id, payload: rule });

      setShowInputRule(false);
    }

    async function cancelRule(){
      setRule(TournamentDetail.rule)
      setShowInputRule(false)
    }

    async function onComfirmTourClick(){
      setShowConfirmReg(true)
      setShowConfirStart(false)
      setShowConfirmEnd(false)
    }
    
    async function onRegisterTourClick(){
      setShowConfirmReg(false)
      setShowConfirStart(true)
      setShowConfirmEnd(false)
    }
    
    async function onEndTourClick(){
      setShowConfirmReg(false)
      setShowConfirStart(false)
      setShowConfirmEnd(true)
    }

    const showJoinTour = (user.id !== TournamentDetail.ownerId && TournamentDetail.status === "REGISTER");
    
    //Tour is started
    const tourStart = (TournamentDetail.status === "STARTED" && user.id !== TournamentDetail.ownerId);
    //Tour is ended
    const tourEnd = (TournamentDetail.status === "ENDED");
    
    // for confirm detail and start register
    const showConfirmTour = (user.id === TournamentDetail.ownerId && TournamentDetail.status === "CHECKING"); 
    // for start the tournamnet after finish Register
    const showStartTour = (user.id === TournamentDetail.ownerId && TournamentDetail.status === "REGISTER");
    // for end the tournament after finish
    const showEndTour = (user.id === TournamentDetail.ownerId && TournamentDetail.status === "STARTED"); 
    
    const teamJoinList = joinsDetail.map((team) => 
      <TeamList key={team.id} {...team}/>
    );

    

    if(isTourLoading || isjoinLoading || isGetMatchLoading || isUpdateRuleLoading 
        || isRegisterTournamentLoading || StartTournament || isEndTournamentLoading
      ) return (<LoadingPage/>)
    if(isTourError || isjoinError || isGetMatchError) return (<ErrorPage/>)
  return (
    <div className="tourEachPage">
      <div className="gameLogoTournamen">
        <img src={TournamentDetail.game.logoUrl} alt="gameLogoTournamen"/>
      </div>
      <div className="tourEachHead">
        Tournament Detail
      </div>
      <div className="tourEachName">
        <h1>{TournamentDetail.tourName}</h1>
      </div>

      <div className="picAndPrizeWrape">
        <div className="tourCover">
          <img src={TournamentDetail.coverUrl} alt="tourCover" />
          {user.id === TournamentDetail.ownerId ? <div className="changeTournamentCover" onClick={() => setShowChangeCoverPopup(true)}><UploadPictureBtn/></div> : <></>}
        </div>
        {showChangCoverPopup ? <UploadPicturePopup targetId={TournamentDetail.id} mutateFunc={mutateAsyncUpdateTournament} isLoading={isUpdateTournamentLoading} payload={"coverUrl"} storage={"Tournament"} head={"Cover"} closePopup={setShowChangeCoverPopup}/> : <></>}

        <div className="prizeBox">
            
            <div className="timeWrape">
              <div className="prizePool">Prize Pool</div>
              <div className="prize">{TournamentDetail.prize} <span className='bath'>Bath</span></div>
            </div>

            <div className="timeWrape">
              <label className='regTime'>Register</label>
              <div className="time">{(TournamentDetail.regStartTime).slice(0,10)} <span className='fytyColor'>to</span>  {(TournamentDetail.regEndTime).slice(0,10)}</div>
            </div>

            <div className="timeWrape">
              <label className='startTime'>Start</label>
              <div className="time">{(TournamentDetail.tourStartTime).slice(0,10)} <span className='fytyColor'>to</span> {(TournamentDetail.tourEndTime).slice(0,10)}</div>
            </div>

            {/* for user */}
            { showJoinTour ? <div className="joinTournament" onClick={() => setShowJoinTourPopup(true)}>Join Tournament</div> : <></>}
            { showJoinTourPopup ? <JoinTournamentPopup userTeam={userTeamData} tourDetail={TournamentDetail} reTourDetail={tourDetailRefetch} setClosePopup={setShowJoinTourPopup} refetchJoin={refetchJoinDetail}/> : <></>}

            { tourStart ? <div className='tourEnd'> Tournament's Started</div> : <></>}
            { tourEnd ? <div className='tourEnd'> Tournament's Ended</div> : <></>}

            {/* for owner */}
            { showConfirmTour ? <div className="joinTournament" onClick={onComfirmTourClick}>Confirm Detail</div> : <></>}
            { showConfirmReg ? <TournamentRegisterPopup setClosePopup={setShowConfirmReg} comfrimReg={mutateAsyncRegisterTournament} tourId={id}/> : <></>}

            { showStartTour ? <div className="joinTournament" onClick={onRegisterTourClick}>Start Tour</div> : <></>}
            { showConfirmStart ? <TournamentStartPopup setClosePopup={setShowConfirStart} confrimStart={mutateAsyncStartTournament} tourId={id}/> : <></>}

            { showEndTour ? <div className="joinTournament" onClick={onEndTourClick}>End Tour</div> : <></>}
            { showConfirmEnd ? <TournamentEndedPopup setClosePopup={setShowConfirmEnd} confrimEnd={mutateAsyncEndTournament} tourId={id}/> : <></>}

        </div>

      </div>

      <div className="tourDetailBox">
        <div className="selectBar">
          <div className={ruleSel ? "ruleSel":"ruleNotSel"} onClick={onRuleClick}> Rule </div>
          <div className={matchSel ? "matchSel":"matchNotSel"} onClick={onBracketClick}> Bracket </div>
          <div className={joinSel ? "teamJoinSel" :"teamJoinNotSel"} onClick={onTeamJoinClick}> Team({TournamentDetail.currentJoin} / {TournamentDetail.tourCap}) </div>
        </div>

        <div className="tourDetail">
          {/* content */}
          {ruleSel ? 
            <div className='ruleContrainer' >
              {showInputRule ? 
                <div className="ruleInput">
                  <textarea name="rule" id="rule" cols="150" rows="50" onChange={(event) => ruleChange(event)}>{TournamentDetail.rule}</textarea>
                  <div className="ruleBtn">
                    <div className="confirmRuleBtn" onClick={confirmRule}>Confirm</div>
                    <div className="cancelRuleBtn" onClick={cancelRule}>Cancel</div>
                  </div>
                </div> 

                : 
                
                <div className='ruleString'>
                  <div className="settingFlex">
                    {user.id === TournamentDetail.ownerId ? <div className="settingRuleBtn" onClick={() => setShowInputRule(true)}>Setting</div> : <></>}
                  </div>
                  {TournamentDetail.rule }
                </div>
              }
            </div> 

            : <></>
          }
          
          {matchSel ? <div className='matchContrainer' ><MatchContrianer tourMatch={matches} tournamentDetail={TournamentDetail} teams={joinsDetail} refetchTourMatch={refetchMatch}/></div> : <></>}
          
          {joinSel ? <div className='teamJoinContrainer' >{teamJoinList}</div> : <></>}
        </div>

      </div>
      
      { user.id === TournamentDetail.ownerId && TournamentDetail.status === "CHECKING" ?
        <div className="deleteTour">
          <div className="deleteTourBtnReal" on onClick={() => setShowDelTour(true)}>
            Delete Tournament
          </div>
        </div>
      : <></>}

      {showDelTour ? <ConfirmDelete tourId={id} setShowPopup={setShowDelTour}/> : <></>}

      

    </div>
  )
}

export default TournamentEach