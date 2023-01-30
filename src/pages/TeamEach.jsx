import React from 'react'
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom'
import { getTeamEach, getTeamMember, getTeamTourJoined } from '../apis/team/team-queries';
import LoadingPage from './LoadingPage';

import "./css/TeamEach.css"
import { useContext } from 'react';
import { UserContext } from '../App';

const TeamEach = () => {
    const { id } = useParams();

    const user = useContext(UserContext);

    const {data: team = {}, error: teamError, isLoading: teamLoading } = useQuery(
      "team",
      () => getTeamEach(id)
    );

    const {data: members = [], error: memberError, isLoading: memberLoading } = useQuery(
      "members",
      () => getTeamMember(id)
    );

    const {data: tours = [], error: tourError, isLoading: tourLoading } = useQuery(
      "tournaments",
      () => getTeamTourJoined(id)
    );

    
    const memberList = members.map((member) => 
      <div>{member.username}</div>
    );
   

    
    const tourList = tours.map((tour) => 
      <div>{tour.tourName}</div>
    );
    
  if(teamLoading || memberLoading || tourLoading){
    return ( <LoadingPage/> )
  }

  if(teamError || memberError || tourError){
    return ( <h1>Boom Api Cash gg go next!</h1> )
  }

  return (
    <div className='teamEach'>
        <div className="teamCover">
          <img src={team.coverUrl} alt="team cover" />
        </div>
        <div className="teamEachHead">Team Profile</div>

        <div className="teamContent">
          <div className="teamLogo">
            <img className='logo' src={team.logoUrl} alt="logo" />
            <div className="name-des">
              <h1>{team.teamName}</h1>
              <div className="teamDes">
                {team.slogan}
              </div>
            </div>
          </div>
          
          <div className="team-detail-box">
            
          </div>
        </div>

    </div>
  )
}

export default TeamEach