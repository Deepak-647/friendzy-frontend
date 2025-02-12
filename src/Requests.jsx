import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addRequest, removeRequest } from "./utils/requestSlice";
import { BASE_URL } from "./utils/constants";

const Requests = () => {
  const requests = useSelector((store) => store.requests);
  const dispatch = useDispatch();

  const reviewRequest = async (status, _id) => {
    try {
      const res = await axios.post(
        BASE_URL + "/request/review/" + status + "/" + _id,
        {},
        { withCredentials: true }
      );
      dispatch(removeRequest(_id));
    } catch (err) {
      console.error(err);
    }
  };
  const fetchRequests = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/requests/received", {
        withCredentials: true,
      });
      dispatch(addRequest(res?.data?.data));
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    fetchRequests();
  }, []);
  if (!requests) return;
  if (requests.length == 0)
    return (
      <h1 className="text-center text-bold text-2xl my-10 min-h-[78vh]">
        You don't have any requests
      </h1>
    );

  return (
    <div className="text-center my-10 min-h-[78vh]">
      <h1 className="font-bold text-2xl">Requests</h1>
      <div className="flex flex-wrap justify-center gap-4 mt-6">
        {requests.map((request) => {
          const { _id, firstName, lastName, age, gender, about, photo } =
            request.fromUserId;

          return (
            <div
              key={_id}
              className="p-4 w-full sm:w-2/3 md:w-1/2 lg:w-1/3 bg-base-200 text-white flex items-center rounded-lg shadow-lg"
            >
              <img
                alt="photo-user"
                className="h-28 w-28 rounded-md object-cover"
                src={BASE_URL+"/"+photo}
              />
              <div className="flex flex-col text-left ml-4 flex-grow">
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
              <div className="flex flex-col gap-2 ml-4">
                <button
                  className="btn btn-primary px-4 py-2"
                  onClick={() => reviewRequest("accepted", request._id)}
                >
                  Accept
                </button>
                <button
                  className="btn btn-secondary px-4 py-2"
                  onClick={() => reviewRequest("rejected", request._id)}
                >
                  Reject
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Requests;
