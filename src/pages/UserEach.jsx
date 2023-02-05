import React from 'react'
import { useParams } from 'react-router-dom';

const UserEach = () => {
    const { id } = useParams();
  return (
    <div>{id}</div>
  )
}

export default UserEach