import React from 'react'
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom'
import { getTeamEach, getTeamMember, getTeamTourJoined } from '../apis/team/team-queries';
import LoadingPage from './LoadingPage';

const TeamEach = () => {
    const { id } = useParams();

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

  return (
    <div>
        <h1>TeamEach</h1>
        <h1>{id}</h1>
        <p>{team.teamName}</p>
        <p>{team.currentMember}</p>
        {memberList}
        <p>tour</p>
        {tourList}
    </div>
  )
}

export default TeamEach