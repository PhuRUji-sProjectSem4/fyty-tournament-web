import React from 'react'
import { useEffect } from 'react';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom'
import { getTeamEach } from '../apis/team/team-queries';

const TeamEach = () => {
    const { id } = useParams();

    const {data: team = {}, error, isLoading } = useQuery(
      "team",
      () => getTeamEach(id)
    )
  return (
    <div>
        <h1>TeamEach</h1>
        <h1>{id}</h1>
        <p>{team.teamName}</p>
        <p>{team.currentMember}</p>
    </div>
  )
}

export default TeamEach