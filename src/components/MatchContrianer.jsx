import React from 'react'
import { generatePath, useNavigate } from 'react-router-dom';
import "./css/MatchContrainer.css"
import { ClientRounteKey } from '../path/coverPath'


const MatchContrianer = (props) => {
    const navigate = useNavigate();

    function onTeamClick(id){
      return () => navigate(generatePath(ClientRounteKey.getTeamEach, {id}))
    }

    const round1UpperMatches = props.tourMatch
      .filter((match) => match.round === "1" && match.bracket ==="UPPER")
      .sort((a,b) => a.pair - b.pair)
      .map((match) =>
        <div className="matchList">
            <div className="pair">Pair: {match.pair}</div>

            <div className="matchDetail">
                <div className="teamAndScore">
                  <div className="teamName" onClick={onTeamClick(match.homeTeamData.id)}>{match.homeTeamData.teamName}</div> 
                  <div className="score"> 1 </div> 
                </div>
                <div className="vs">vs</div>
                <div className="teamAndScore">
                  <div className="score"> 2 </div>  
                  <div className="teamName" onClick={onTeamClick(match.awayTeamData.id)}>{match.awayTeamData.teamName}</div>
                </div>
             </div>
            
            <div className="playTime"> Date: {(match.date).slice(0,10)}  Time: {(match.date).slice(11,16)}</div>
         
        </div>
    );

  return (
    <div className="matchWrape">
        <div className="Bracket">Upper Bracket</div>
        <div className="round">Round 1</div>
        <div className="matchRow">
          {round1UpperMatches}
        </div>

        <div className="round">Round 2</div>
        <div className="matchRow">
          {round1UpperMatches}
        </div>

        <div className="round">Upper Final</div>
        <div className="matchRow">
          {round1UpperMatches}
        </div>

        <div className="Bracket">Lower Bracket</div>
        <div className="round">Round 1</div>
        <div className="matchRow">
          {round1UpperMatches}
        </div>

        <div className="round">Round 2</div>
        <div className="matchRow">
          {round1UpperMatches}
        </div>

        <div className="round">Round 3</div>
        <div className="matchRow">
          {round1UpperMatches}
        </div>

        <div className="round">Lower Final</div>
        <div className="matchRow">
          {round1UpperMatches}
        </div>

        <div className="Bracket">Grand Final</div>
        <div className="matchRow">
          {round1UpperMatches}
        </div>

    </div>
  )
}

export default MatchContrianer