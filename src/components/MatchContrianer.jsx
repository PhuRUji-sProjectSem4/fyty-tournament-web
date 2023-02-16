import React from 'react'
import "./css/MatchContrainer.css"

const MatchContrianer = (props) => {
    const round1Matches = props.tourMatch.filter((match) => match.round === "1").map((match) =>
        <div className="matchList">
            <div className="pair">{match.pair}</div>

            <div className="matchDetail">
                {match.homeTeamData.teamName} vs {match.awayTeamData.teamName}
             </div>
            
            
        </div>
    );

  return (
    <div className="matchWrape">
        <div className="Bracket">Upper Bracket</div>
        <div className="round">Round 1</div>
        {round1Matches}
        <div className="round">Round 2</div>
        <div className="round">Upper Final</div>
        <div className="Bracket">Lower Bracket</div>
        <div className="round">Round 1</div>
        <div className="round">Round 2</div>
        <div className="round">Round 3</div>
        <div className="round">Lower Final</div>
        <div className="Bracket">Grand Final</div>
    </div>
  )
}

export default MatchContrianer