import axios from "axios";
import React from "react";
import { useDispatch } from "react-redux";
import { removeUserFromFeed } from "./utils/feedSlice";
import { BASE_URL } from "./utils/constants";

const UserCard = ({ user }) => {
  const { _id, firstName, lastName, photo, about, age, gender } = user;

  const dispatch = useDispatch();
  const handleSendRequest = async (status, _id) => {
    try {
      const res = await axios.post(
        BASE_URL + "/request/send/" + status + "/" + _id,
        {},
        { withCredentials: true }
      );
      dispatch(removeUserFromFeed(_id));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="card bg-base-300 w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl shadow-xl flex flex-col items-center p-4 sm:p-6 mx-auto">
      <figure className="w-full flex justify-center">
        <img
          src={photo ? `${BASE_URL}/${photo}` : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"}
          alt="photo"
          className="rounded-full w-32 h-32 sm:w-44 sm:h-44 md:w-52 md:h-52 object-cover"
        />
      </figure>
      <div className="card-body text-center w-full flex flex-col items-center">
        <h2 className="card-title text-lg sm:text-xl md:text-2xl font-semibold mt-2">
          {firstName + " " + lastName}
        </h2>
        {age && gender && (
          <p className="text-sm sm:text-base text-gray-500 mt-1">
            {age + " , " + gender}
          </p>
        )}
        <p className="text-sm sm:text-base mt-1 text-gray-600">{about}</p>
        <div className="card-actions flex flex-wrap justify-center gap-2 mt-3">
          <button
            className="btn btn-secondary px-4 py-2 sm:px-6 sm:py-3 text-sm sm:text-base"
            onClick={() => handleSendRequest("interested", _id)}
          >
            Interested
          </button>
          <button
            className="btn btn-primary px-4 py-2 sm:px-6 sm:py-3 text-sm sm:text-base"
            onClick={() => handleSendRequest("ignored", _id)}
          >
            Ignore
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
