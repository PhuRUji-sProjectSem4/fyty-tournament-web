import React, { useState } from 'react'
import { useQuery } from 'react-query';
import { getTournament } from '../apis/tournament/tournament-querie';
import { FliterCard } from '../components';
import TournamentCard from '../components/TournamentCard';

import "./css/Tournament.css"
import LoadingPage from './LoadingPage';

const Tournament = () => {
  const [searchInput, setSearchInput] = useState()
  
  const {data: tournaments =[], error, isLoading} = useQuery(
    "tournament",
    getTournament
  )
  console.log(tournaments);
  const tournamentList = tournaments.map((tour) =>
    <TournamentCard key={tour.id} {...tour}/>
  );

  function handleSearchChange(event){
    setSearchInput(event.target.value);
    console.log(searchInput);
  };

  if(isLoading){
    return ( <LoadingPage/> )
  }

  return (
    <div className='tournament'>
      <div className="tournamentHead">Find Your Tournament</div>
      <FliterCard/>
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