import React, { useState } from 'react'
import { useQuery } from 'react-query'
import { getTeams } from '../apis/team/team-queries'
import { FliterCard, CreateTeam, TeamCard } from "../components/index"

import "./css/Team.css"
import LoadingPage from './LoadingPage'

const Team = () => {
  const [createTeamPopup, setCreateTeamPopup] = useState(() => false);

  const {data: teams =[], error, isLoading} = useQuery(
    "teams",
    getTeams
  )

  let searchInput = "";

  function handleSearchChange(event){
    searchInput = event.target.value;
    console.log(searchInput);
  };

  if(error) return (
    <h1>Boom Api Cashed GG Go Next!!!</h1>
  )

  const teamList = teams.map((team) =>
    <TeamCard key={team.id} {...team}/>
  );

  if(isLoading){
    return (<LoadingPage/>)
  }

  return (
    <div className='team'>
      <div className="teamHead">Find Your Team</div>
      <FliterCard/> 
      <div className="teamSearchBarWrape">
        <div className="lines">Team Lists</div>
        <div  className='teamSearchBar'>
          <input type="text" placeholder='Search your friend, team and Tournament' onChange={handleSearchChange} />
          <img src="/asset/search.svg" alt="searchIcon" height="25px" width="25px"/>
        </div>
        <div className="createTeamContrainer">
          <div className="createTeamBtn" onClick={() => setCreateTeamPopup(prev => prev = true)}>
            + Team
          </div>
        </div>
      </div>
      <CreateTeam createTrigle={createTeamPopup} setCreateTrigle={setCreateTeamPopup}/>
      <div className="teamsWrape">
         {teamList}
      </div>
    </div>
  )
}

export default Team