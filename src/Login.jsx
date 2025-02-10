import React, { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "./utils/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "./utils/constants";

const Login = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [isLoginForm, setIsLoginForm] = useState(true);
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "/login",
        { emailId, password },
        { withCredentials: true }
      );
      dispatch(addUser(res.data));
      navigate("/");
    } catch (err) {
      setError(err?.response?.data);
    }
  };

  const handleSignup = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "/signup",
        { firstName, lastName, emailId, password },
        { withCredentials: true }
      );
      dispatch(addUser(res.data.data));
      navigate("/profile");
    } catch (err) {
      setError(err?.response?.data);
    }
  };

  return (
    <div className="flex justify-center items-center   bg-black text-white p-4 min-h-[75vh]">
      <div className="card bg-gray-900 w-full max-w-md shadow-xl rounded-lg p-6 md:p-8">
        <div className="card-body">
          <h2 className="text-center text-2xl font-semibold mb-4">
            {isLoginForm ? "Login" : "Sign Up"}
          </h2>
          {!isLoginForm && (
            <>
              <input
                type="text"
                value={firstName}
                className="input input-bordered w-full my-2 bg-gray-800 text-white"
                placeholder="First Name"
                onChange={(e) => setFirstName(e.target.value)}
              />
              <input
                type="text"
                value={lastName}
                className="input input-bordered w-full my-2 bg-gray-800 text-white"
                placeholder="Last Name"
                onChange={(e) => setLastName(e.target.value)}
              />
            </>
          )}
          <input
            type="text"
            value={emailId}
            className="input input-bordered w-full my-2 bg-gray-800 text-white"
            placeholder="Email"
            onChange={(e) => setEmailId(e.target.value)}
          />
          <input
            type="password"
            value={password}
            className="input input-bordered w-full my-2 bg-gray-800 text-white"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <p className="text-red-500 text-center">{error}</p>
          <div className="card-actions flex justify-center">
            <button
              className="btn btn-primary w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white"
              onClick={isLoginForm ? handleLogin : handleSignup}
            >
              {isLoginForm ? "Login" : "Sign Up"}
            </button>
          </div>
          <p className="text-center mt-4">
            {isLoginForm ? "New user? " : "Already have an account? "}
            <span
              className="text-blue-400 cursor-pointer hover:underline"
              onClick={() => setIsLoginForm(!isLoginForm)}
            >
              {isLoginForm ? "Sign Up" : "Login"}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
