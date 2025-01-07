import React from 'react'

const UserCard = ({user}) => {
   const {firstName,lastName,photoUrl,about,age,gender} = user
  return (
     <div className="card bg-base-300 w-96 shadow-xl flex justify-center">
    <figure className="px-10 pt-10">
      <img
        src={photoUrl}
        alt="photo"
        className="rounded-xl" />
    </figure>
    <div className="card-body items-center text-center flex-grow-0">
      <h2 className="card-title">{firstName + " "+ lastName}</h2>
      
     {age && gender && <p>{ age + " , "+  gender}</p>}
     <p>{about}</p>
      <div className="card-actions">
        <button className="btn btn-secondary">Interested</button>
        <button className="btn btn-primary">ignore</button>
      </div>
    </div>
  </div> 
  )
}

export default UserCard