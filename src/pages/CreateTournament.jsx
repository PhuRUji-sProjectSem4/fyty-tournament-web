import React from 'react'
import TournamentList from '../components/TournamentList'

import "./css/CreateTournament.css"

const CreateTournament = () => {
  
  return (
    <div className="createTourPage">
      <div className="createTourHead">
        Create Your Own Tournament
      </div>
      <div className="createTourBtn">
        + Create Tour
      </div>
      <div className="ongoingWrape">
        <h1>
          Ongoing Tournament
        </h1>
        <div className="tournamentCardWrape">
          
        </div>
      </div>
      <div className="endedWrape">
        <h1>
          Ended Tournament
        </h1>
        <div className="tournamentCardWrape">

        </div>
      </div>
    </div>
  )
}

export default CreateTournament