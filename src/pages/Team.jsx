import React, { useState } from 'react'
import { FliterCard, CreateTeam } from "../components/index" 

import "./css/Team.css"

const Team = () => {
  const [createTeamPopup, setCreateTeamPopup] = useState(() => false)

  let searchInput = "";

  function handleSearchChange(event){
    searchInput = event.target.value;
    console.log(searchInput);
  };

  return (
    <div className='team'>
      <div className="teamHead">Find Your Team</div>
      <FliterCard/>
      <div className="teamSearchBarWrape">
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
    </div>
  )
}

export default Team