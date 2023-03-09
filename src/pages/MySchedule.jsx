import React from 'react'
import { useQuery } from 'react-query'
import { useNavigate } from 'react-router-dom'
import { getUserSchedule } from '../apis/user/user-queries'
import MatchCard from '../components/MatchCard'
import { ClientRounteKey } from '../path/coverPath'

import "./css/Schedule.css"
import LoadingPage from './LoadingPage'

const MySchedule = () => {

  const {data: matchs = [], error: matchError, isLoading: matchLoading} = useQuery(
    "matchs",
    getUserSchedule
  )

  const navigate = useNavigate();

  console.log(matchs);
  const matchList = matchs
    .sort((matchA, matchB) => {
      return new Date(matchA.date) - new Date(matchB.date);
    })
    .map((match) =>
      <MatchCard key={match.id} {...match} />
  );

    if(matchError){
      return (navigate(ClientRounteKey.error))
    }
    
    if(matchLoading){
      return (<LoadingPage/>)
    }

  return (
    <div className='schedule'>
      <div className="scheduleHead">Don't Forget Your Match</div>
      <div className=''><h1>My Schedule</h1></div>
      <div className="match-wrape">
        {matchList}
      </div>
    </div>
  )
}

export default MySchedule