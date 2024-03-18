import React from 'react'
import { useLoaderData } from 'react-router-dom'

const Profile = () => {
  const profile = useLoaderData()
  console.log(profile)
  return (
    <>
      <h1>User Profile:</h1>
      <hr />
      <h3>email: {profile.email}</h3>
    </>
  )
}

export default Profile