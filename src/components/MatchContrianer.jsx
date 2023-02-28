import React, { useContext, useState } from 'react'
import { generatePath, useNavigate } from 'react-router-dom';
import "./css/MatchContrainer.css"
import { ClientRounteKey } from '../path/coverPath'
import { UserContext } from '../App';
import AddMatchPopup from './AddMatchPopup';


const MatchContrianer = (props) => {
    const navigate = useNavigate();
    const [user, setUser] = useContext(UserContext);
    const [showAddPopup, setShowAddPopup] = useState(false);
    const [editScore, setEditScore] = useState(false);
    
    function onTeamClick(id){
      return () => navigate(generatePath(ClientRounteKey.getTeamEach, {id}))
    }

    function matchShow(round, bracket){
       return props.tourMatch
        .filter((match) => match.round === round && match.bracket === bracket)
        .sort((a,b) => a.pair - b.pair)
        .map((match) =>
          <div className="matchList">
              <div className="pair">Pair: {match.pair}</div>

              <div className="matchDetail">
                  <div className="teamAndScore">
                    <div className="homeTeamName" onClick={onTeamClick(match.homeTeamData.id)}>{match.homeTeamData.teamName}</div> 
                    <div className="score"> {match.matchResult === null ? "" : match.matchResult.teamHomeScore} </div> 
                  </div>
                  <div className="vs">vs</div>
                  <div className="teamAndScore">
                    <div className="score"> {match.matchResult === null ? "" : match.matchResult.teamAwayScore} </div>  
                    <div className="awayTeamName" onClick={onTeamClick(match.awayTeamData.id)}>{match.awayTeamData.teamName}</div>
                  </div>
              </div>
              
              <div className="playTime"> Date: {(match.date).slice(0,10)}  Time: {(match.date).slice(11,16)}</div>
              {user.id === props.tournamentDetail.ownerId && match.matchResult === null ? <div className='editScoreBtn'><img src="/asset/edit.png" alt="edit" /></div> : <></>}
          </div>)
  };

  return (
    <div className="matchWrape">

        {user.id === props.tournamentDetail.ownerId && props.tournamentDetail.status !== "ENDED" && props.tournamentDetail.status === "STARTED" ? <div className="addMatch" onClick={() => setShowAddPopup(true)}>+ Match</div> : <></>}
        {showAddPopup ? <AddMatchPopup setOpenPopup={setShowAddPopup} teams={props.teams} tournamentDetail={props.tournamentDetail} refetchMatch={props.refetchTourMatch}/> : <></> }

        
        <div className="Bracket">Upper Bracket</div>
        <div className="round">
          Round 1
        </div>
        <div className="matchRow">
          {matchShow("1", "UPPER") == "" ? <div className='upComing'>Up Coming</div> : matchShow("1", "UPPER")}
        </div>

        <div className="round">Round 2</div>
        <div className="matchRow">
          {matchShow("2", "UPPER") == "" ? <div className='upComing'>Up Coming</div> : matchShow("2", "UPPER")}
        </div>

        <div className="round">Upper Final (Round3)</div>
        <div className="matchRow">
          {matchShow("3", "UPPER") == "" ? <div className='upComing'>Up Coming</div> : matchShow("3", "UPPER")}
        </div>

        <div className="Bracket">Lower Bracket</div>
        <div className="round">Round 1</div>
        <div className="matchRow">
          {matchShow("1", "LOWWER") == "" ? <div className='upComing'>Up Coming</div> : matchShow("1", "LOWWER")}
        </div>

        <div className="round">Round 2</div>
        <div className="matchRow">
          {matchShow("2", "LOWWER") == "" ? <div className='upComing'>Up Coming</div> : matchShow("2", "LOWWER")}
        </div>

        <div className="round">Round 3</div>
        <div className="matchRow">
          {matchShow("3", "LOWWER") == "" ? <div className='upComing'>Up Coming</div> : matchShow("3", "LOWWER")}
        </div>

        <div className="round">Lower Final (Round4)</div>
        <div className="matchRow">
          {matchShow("4", "LOWWER") == "" ? <div className='upComing'>Up Coming</div> : matchShow("4", "LOWWER")}
        </div>

        <div className="Bracket">Final (Uppper)</div>
        <div className="round">Grand Final (Round4)</div>
        <div className="matchRow">
          {matchShow("4", "UPPER") == "" ? <div className='upComing'>Up Coming</div> : matchShow("4", "UPPER")}
        </div>

    </div>
  )
}

export default MatchContrianer