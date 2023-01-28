import React from 'react'
import { useQuery } from 'react-query'
import { getUserSchedule } from '../apis/user/user-queries'
import MatchCard from '../components/MatchCard'

import "./css/Schedule.css"
import LoadingPage from './LoadingPage'

const MySchedule = () => {

  const {data: matchs = [], error: matchError, isLoading: matchLoading} = useQuery(
    "matchs",
    getUserSchedule
  )

  const matchList = matchs.map((match) =>
    <MatchCard key={match.id} {...match} />
  );

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