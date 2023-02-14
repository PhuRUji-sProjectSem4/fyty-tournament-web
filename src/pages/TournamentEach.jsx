import React from 'react'
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom'
import { getTournamentEach, getTournamentJoined } from '../apis/tournament/tournament-querie';
import LoadingPage from './LoadingPage'
import ErrorPage from './ErrorPage'

import "./css/TournamentEach.css"

const TournamentEach = () => {
    const { id } = useParams();

    const { data: TournamentDetail = [], isError: isTourError, isLoading:isTourLoading } = useQuery(
      "tourDetail",
      () => getTournamentEach(id)
    )

    const { data: joinsDetail = [], isError: isjoinError, isLoading:isjoinLoading } = useQuery(
      "tourJoined",
      () => getTournamentJoined(id)
    )

    if(isTourLoading || isjoinLoading) return (<LoadingPage/>)
    if(isTourError || isjoinError) return (<ErrorPage/>)
  return (
    <div className="tourEachPage">
      <div className="tourEachHead">
        Tournament Detail
      </div>
      <div className="tourEachName">
        <h1>{TournamentDetail.tourName}</h1>
      </div>

      <div className="picAndPrizeWrape">
        <div className="tourCover">
          <img src={TournamentDetail.coverUrl} alt="tourCover" />
        </div>

        <div className="prizeBox">
            
            <div className="timeWrape">
              <div className="prizePool">Prize Pool</div>
              <div className="prize">{TournamentDetail.prize} <span className='bath'>Bath</span></div>
            </div>

            <div className="timeWrape">
              <label className='regTime'>Register</label>
              <div className="time">{(TournamentDetail.regStartTime).slice(0,10)} <span className='fytyColor'>to</span>  {(TournamentDetail.regEndTime).slice(0,10)}</div>
            </div>

            <div className="timeWrape">
              <label className='startTime'>Start</label>
              <div className="time">{(TournamentDetail.tourStartTime).slice(0,10)} <span className='fytyColor'>to</span> {(TournamentDetail.tourEndTime).slice(0,10)}</div>
            </div>


            <div className="joinTournament">Join Tournament</div>
        </div>

      </div>



    </div>
  )
}

export default TournamentEach