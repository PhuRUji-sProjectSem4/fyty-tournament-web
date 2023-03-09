import React, { useState } from 'react'
import { useQuery } from 'react-query'
import { useNavigate } from 'react-router-dom'
import { getTeams } from '../apis/team/team-queries'
import { FliterCard, CreateTeam, TeamCard } from "../components/index"
import { ClientRounteKey } from '../path/coverPath'

import "./css/Team.css"
import LoadingPage from './LoadingPage'

const Team = () => {
  const [createTeamPopup, setCreateTeamPopup] = useState(() => false);
  const [gameSel, setGameSel] = useState("all");
  const [search, setSearch] = useState("");

  const navigate = useNavigate();

  const {data: teams =[], error, isLoading} = useQuery(
    "teams",
    getTeams
  )

  function handleSearchChange(event){
    setSearch(event.target.value)
  };

  if(error) return (
    navigate(ClientRounteKey.error)
  )

  const teamList = teams
    .filter((team) => gameSel==="all" ? true : team.gameId === gameSel)
    .filter((team) => search === "" ? true : team.teamName.includes(search))
    .map((team) =>
    <TeamCard key={team.id} {...team}/>
  );

  if(isLoading){
    return (<LoadingPage/>)
  }

  return (
    <div className='team'>
      <div className="teamHead">Find Your Team</div>
      <FliterCard onSelect={setGameSel}/> 
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