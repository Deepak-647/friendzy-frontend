import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addRequest } from "./utils/requestSlice";

const Requests = () => {
  const requests = useSelector((store) => store.requests);
  const dispatch = useDispatch();
  const fetchRequests = async () => {
    try {
      const res = await axios.get(
        "http://localhost:3000/user/requests/received",
        { withCredentials: true }
      );
      dispatch(addRequest(res?.data?.data));
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    fetchRequests();
  }, []);
  if (!requests) return;
  if (requests.length == 0) return <h1>You don't have any requests</h1>;
 
  return (
    <div className="text-center my-10">
      <h1 className="text-bold text-2xl">Requests</h1>
      <div className="flex flex-col justify-center">
        {requests.map((request) => {
          const { _id, firstName, lastName, age, gender, about, photoUrl } =
        request.fromUserId;

          return (
            <div key={_id} className="p-4 m-4 w-1/3 text-white flex items-center bg-base-200">
              <img alt="photo-user" className="h-28 rounded-md"src={photoUrl} />
              <div className="flex flex-col mx-4">
                <h2 className="my-2">{firstName + " " +lastName}</h2>
                {age && gender && <p>{age + "-"+gender}</p>}
                {about && <p>{about}</p>}
               <div>
               <button className="btn btn-active btn-primary m-2">Accept</button>
               <button className="btn btn-active btn-secondary m-2">Reject</button>
               </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Requests;