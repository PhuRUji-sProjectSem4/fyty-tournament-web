import React, { useContext, useState } from 'react'
import { generatePath, useNavigate } from 'react-router-dom';
import "./css/MatchContrainer.css"
import { ClientRounteKey } from '../path/coverPath'
import { UserContext } from '../App';
import AddMatchPopup from './AddMatchPopup';
import MatchList from './MatchList';


const MatchContrianer = (props) => {
    const [user, setUser] = useContext(UserContext);
    const [showAddPopup, setShowAddPopup] = useState(false); 

    function matchShow(round, bracket){
       return props.tourMatch
        .filter((match) => match.round === round && match.bracket === bracket)
        .sort((a,b) => a.pair - b.pair)
        .map((match) =>
          <MatchList key={match.id} {...match} tournamentDetail={props.tournamentDetail} refetchMatch={props.refetchTourMatch}/>
        )
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