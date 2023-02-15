import React, { useContext, useState } from 'react'
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom'
import { getTournamentEach, getTournamentJoined } from '../apis/tournament/tournament-querie';
import LoadingPage from './LoadingPage'
import ErrorPage from './ErrorPage'
import { UserContext } from '../App';

import "./css/TournamentEach.css"
import TeamList from '../components/TeamList';

const TournamentEach = () => {
    const { id } = useParams();
    const [user, setUser] = useContext(UserContext);
    const [ruleSel, setRuleSel] = useState(true);
    const [matchSel, setMatchSel] = useState(false);
    const [joinSel, setJoinSel] = useState(false);

    const { data: TournamentDetail = [], isError: isTourError, isLoading:isTourLoading } = useQuery(
      "tourDetail",
      () => getTournamentEach(id)
    )

    const { data: joinsDetail = [], isError: isjoinError, isLoading:isjoinLoading } = useQuery(
      "tourJoined",
      () => getTournamentJoined(id)
    )

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

    const showJoinTour = (user.id !== TournamentDetail.ownerId && TournamentDetail.status === "REGISTER");
    
    //Tour is started
    const tourStart = TournamentDetail.status === "STARTED";
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

    

    if(isTourLoading || isjoinLoading) return (<LoadingPage/>)
    if(isTourError || isjoinError) return (<ErrorPage/>)
  return (
    <div className="tourEachPage">
      <div className="tourEachHead">
        Tournament Detail
      </div>
      <div className="tourEachName">
        <h1>{TournamentDetail.tourName}</h1>
      </div>

      <div className="picAndPrizeWrape">
        <div className="tourCover">
          <img src={TournamentDetail.coverUrl} alt="tourCover" />
        </div>

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
            { showJoinTour ? <div className="joinTournament">Join Tournament</div> : <></>}

            { tourStart ? <div className='tourEnd'> Tournament's Started</div> : <></>}
            { tourEnd ? <div className='tourEnd'> Tournament's Ended</div> : <></>}

            {/* for owner */}
            { showConfirmTour ? <div className="joinTournament">Confirm Detail</div> : <></>}


            { showStartTour ? <div className="joinTournament">Start Tour</div> : <></>}


            { showEndTour ? <div className="joinTournament">End Tour</div> : <></>}
       

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
          {ruleSel ? <div className='ruleContrainer' >{TournamentDetail.rule}</div> : <></>}
          {matchSel ? <div className='matchContrainer' >m</div> : <></>}
          {joinSel ? <div className='teamJoinContrainer' >{teamJoinList}</div> : <></>}
        </div>

      </div>



    </div>
  )
}

export default TournamentEach