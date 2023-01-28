import React from 'react'
import { useContext } from 'react'
import { UserContext } from '../App'

const MyProfile = () => {

  const [user, setUser] = useContext(UserContext);

  return (
    <div>{user.username}</div>
  )
}

export default MyProfile