import React, { useState } from 'react'
import { useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { getTournament } from '../apis/tournament/tournament-querie';
import { FliterCard } from '../components';
import TournamentCard from '../components/TournamentCard';
import { ClientRounteKey } from '../path/coverPath';

import "./css/Tournament.css"
import LoadingPage from './LoadingPage';


const Tournament = () => {
  const [searchInput, setSearchInput] = useState()
  const [gameSel, setGameSel] = useState("all");
  const navigate = useNavigate()
  
  const {data: tournaments =[], error, isLoading} = useQuery(
    "tournament",
    getTournament
  )
  
  const tournamentList = tournaments.filter((tour) => gameSel==="all" ? true : tour.gameId === gameSel).map((tour) =>
    <TournamentCard key={tour.id} {...tour}/>
  );

  function handleSearchChange(event){
    setSearchInput(event.target.value);
    console.log(searchInput);
  };

  if(error){
    return ( navigate(ClientRounteKey.error))
  }

  if(isLoading){
    return ( <LoadingPage/> )
  }

  return (
    <div className='tournament'>
      <div className="tournamentHead">Find Your Tournament</div>
      <FliterCard onSelect={setGameSel}/>
      <div className="teamSearchBarWrape">
        <div className="lines">Tournament Lists</div>
        <div  className='teamSearchBar'>
          <input type="text" placeholder='Search your friend, team and Tournament' onChange={handleSearchChange} />
          <img src="/asset/search.svg" alt="searchIcon" height="25px" width="25px"/>
        </div>
      </div>
      <div className="tournament-list">
        {tournamentList}
      </div>
    </div>
  )
}

export default Tournament