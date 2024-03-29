import React, { useState } from 'react'
import { useQuery } from 'react-query'
import { getUserTournament } from '../apis/user/user-queries'
import TournamentList from '../components/TournamentList'

import "./css/CreateTournament.css"
import LoadingPage from './LoadingPage'
import ErrorPage from "./ErrorPage.jsx"
import CreateTournamentPopup from '../components/CreateTournamentPopup'


const CreateTournament = () => {
  const [createTourShow, setCreateTourShow] = useState(false);

  const {data: tournaments = [], isError:isTournamnetError, isLoading: tournamnetLoading, refetch } = useQuery(
    "userTournamnet",
    getUserTournament
  );

  function createBtnClick(){
    setCreateTourShow(prev => prev = true)
  }

  const onGoingList = tournaments.filter((tour) => tour.status !== "ENDED").map((tour) =>
    <TournamentList key={tour.id} {...tour}/>
  );

  const endedList = tournaments.filter((tour) => tour.status === "ENDED").map((tour) =>
    <TournamentList key={tour.id} {...tour}/>
  );

  if(tournamnetLoading) return( <LoadingPage/>)
  if(isTournamnetError) return( <ErrorPage/>)
  
  return (
    <div className="createTourPage">
      <div className="createTourHead">
        Create Your Own Tournament
      </div>
      <div className="createTourBtn" onClick={createBtnClick}>
        + Create Tour
      </div>
      {createTourShow ? <CreateTournamentPopup setPopup ={setCreateTourShow}/> : <></>}
      <div className="ongoingWrape">
        <h1>
          Ongoing Tournament
        </h1>
        <div className="tournamentCardWrape">
          {onGoingList}
        </div>
      </div>
      <div className="endedWrape">
        <h1>
          Ended Tournament
        </h1>
        <div className="tournamentCardWrape">
          {endedList}
        </div>
      </div>
    </div>
  )
}

export default CreateTournament