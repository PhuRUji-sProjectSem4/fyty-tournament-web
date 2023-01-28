import React from 'react'
import { useParams } from 'react-router-dom'

const TournamentEach = () => {
    const { id } = useParams();
  return (
    <div>
        {id}
    </div>
  )
}

export default TournamentEach