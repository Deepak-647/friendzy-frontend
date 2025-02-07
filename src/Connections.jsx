import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "./utils/connectionSlice"
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
  if (connections.length == 0) return <h1 className="text-center text-bold text-2xl my-10">You don't have any connections</h1>;
console.log(connections)
  return (
    <div className="text-center my-10">
      <h1 className="text-bold text-2xl">Connections</h1>
      <div className="flex flex-col justify-center">
        {connections.map((connection) => {
          const { _id, firstName, lastName, age, gender, about, photoUrl } =
            connection;

          return (
            <div key={_id} className="p-4 m-4 w-1/3 text-white flex items-center bg-base-200">
              <img alt="photo-user" className="h-28 rounded-md"src={photoUrl} />
              <div className="flex flex-col mx-4">
                <h2 className="my-2">{firstName + " " +lastName}</h2>
                {age && gender && <p>{age + "-"+gender}</p>}
                {about && <p>{about}</p>}

               
              </div>
              <Link to={"/chat/"+_id}>
              <button className="btn btn-primary">Chat</button>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Connections;
