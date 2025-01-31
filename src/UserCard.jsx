import axios from "axios";
import React from "react";
import { useDispatch } from "react-redux";
import { removeUserFromFeed } from "./utils/feedSlice";
import { BASE_URL } from "./utils/constants";

const UserCard = ({ user }) => {
  const { _id,firstName, lastName, photoUrl, about, age, gender } = user;
  const dispatch = useDispatch()
  const handleSendRequest = async (status, _id) => {
   
    try {
      const res = await axios.post(
        BASE_URL + "/request/send/" + status + "/" + _id,
        {},
        { withCredentials: true }
      );
      dispatch(removeUserFromFeed(_id))
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="card bg-base-300 w-72 sm:w-96 shadow-xl flex justify-center my-4 sm:my-0 mx-auto">
      <figure className="px-10 pt-10">
        <img src={photoUrl} alt="photo" className="rounded-xl h-20 sm:h-44" />
      </figure>
      <div className="card-body items-center text-center flex-grow-0">
        <h2 className="card-title">{firstName + " " + lastName}</h2>

        {age && gender && <p>{age + " , " + gender}</p>}
        <p>{about}</p>
        <div className="card-actions">
          <button className="btn btn-secondary" onClick={()=>handleSendRequest("interested",_id)}>Interested</button>
          <button className="btn btn-primary" onClick={()=>handleSendRequest("ignored",_id)}>ignore</button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
