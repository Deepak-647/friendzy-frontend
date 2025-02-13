import axios from "axios";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { removeUser } from "./utils/userSlice";
import { BASE_URL } from "./utils/constants";

const Navbar = () => {
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [dropdown, setDropdown] = useState(false);

  const handleLogout = async () => {
    try {
      await axios.post(BASE_URL + "/logout", {}, { withCredentials: true });
      dispatch(removeUser());
      return navigate("/login");
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <div className="navbar bg-base-200 pb-6 min-h-[10vh]">
      <div className="flex-1">
        <Link to="/" className="btn btn-ghost text-xl">
          FriendZY
        </Link>
      </div>
      {user && (
        <div className="flex-none gap-2">
          <div className="form-control">
            <input
              type="text"
              placeholder="Search"
              className="input input-bordered w-24 md:w-auto"
            />
          </div>
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
              onClick={(e) => {
                e.preventDefault();
                setDropdown(!dropdown);
              }}
            >
              <div className="w-10 rounded-full">
                <img
                  alt="Tailwind CSS Navbar component"
                  src={user?.photo ? `${BASE_URL}/${user.photo}` : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"}
                />
              </div>
              <p> {user.firstName}</p>
            </div>
            {dropdown && (
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
              >
                <li>
                  <Link
                    to="/profile"
                    className="justify-between"
                    onClick={() => setDropdown(false)}
                  >
                    Profile
                  </Link>
                </li>
                <li>
                  <Link to="/connections" onClick={() => setDropdown(false)}>
                    Connections
                  </Link>
                </li>
                <li>
                  <Link to="/requests" onClick={() => setDropdown(false)}>
                    Requests
                  </Link>
                </li>
                <li>
                  <a onClick={handleLogout}>Logout</a>
                </li>
              </ul>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
