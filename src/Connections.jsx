import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "./utils/connectionSlice";
import { BASE_URL } from "./utils/constants";
import { Link } from "react-router-dom";

const Connections = () => {
  const connections = useSelector((store) => store.connections);
  const dispatch = useDispatch();
  const fetchConnections = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/connections", {
        withCredentials: true,
      });

      dispatch(addConnections(res?.data?.connections));
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    fetchConnections();
  }, []);
  if (!connections) return;
  if (connections.length == 0)
    return (
      <h1 className="text-center text-bold text-2xl my-10">
        You don't have any connections
      </h1>
    );

  return (
    <div className="text-center my-10">
      <h1 className="font-bold text-2xl sm:text-3xl">Connections</h1>
      <div className="flex flex-wrap justify-center gap-4 mt-6">
        {connections.map((connection) => {
          const { _id, firstName, lastName, age, gender, about, photo } =
            connection;

          return (
            <div
              key={_id}
              className="p-4 w-full sm:w-2/3 md:w-1/2 lg:w-1/3 bg-base-200 text-white flex items-center rounded-lg shadow-lg"
            >
              {/* Profile Photo */}
              <img
                alt="photo-user"
                className="h-24 w-24 sm:h-28 sm:w-28 rounded-md object-cover"
                src={photo ? `${BASE_URL}/${photo}` : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"}
              />

              {/* Text Content */}
              <div className="flex flex-col text-left mx-4 flex-grow">
                <h2 className="font-semibold text-lg">
                  {firstName + " " + lastName}
                </h2>
                {age && gender && (
                  <p className="text-sm text-gray-300">
                    {age + " - " + gender}
                  </p>
                )}
                {about && <p className="text-sm text-gray-400 mt-1">{about}</p>}
              </div>

              {/* Chat Button */}
              <Link to={`/chat/${_id}`} state={{ firstName, lastName, photo }}>
                <button className="btn btn-primary px-4 py-2">Chat</button>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Connections;
