import React, { useEffect } from "react";
import Navbar from "./Navbar";
import { Outlet, useNavigate } from "react-router-dom";
import { Footer } from "./Footer";
import { useDispatch } from "react-redux";
import { addUser } from "./utils/userSlice";
import axios from "axios";

const Body = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const fetchUser = async () => {
    try {
      const res = await axios.get("http://localhost:3000/profile", {
        withCredentials: true,
      });
      dispatch(addUser(res.data));
    } catch (err) {
      if(err.status === 401){
        navigate("/login")
      }
    
      console.error(err);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);
  return (
    <div>
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
};

export default Body;
