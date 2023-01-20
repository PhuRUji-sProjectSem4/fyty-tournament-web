import React from 'react'
import { useParams } from 'react-router-dom'

const TeamEach = () => {
    const { id } = useParams();
  return (
    <div>
        <h1>TeamEach</h1>
        <p>{id}</p>
    </div>
  )
}

export default TeamEach