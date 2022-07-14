import React from "react";
import { Link } from "react-router-dom";
import "./header.css";
import { useDispatch,useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const DropdownComp = ({ setShow, show }) => {
  const { user } = useSelector((state) => state.AuthReducer);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logout = () => {
    localStorage.clear();
    dispatch({ type: "LOGOUT" });
    navigate("/login");
  };
  return (
    <>
      <div className="dropdown">
        <div>
          <Link
            to={`/${user?.displayname}`}
            className="link"
            onClick={() => {
              setShow(!show);
            }}
          >
            Profile
          </Link>
        </div>
        <div>
          <button onClick={logout} className="logout">
            Logout
          </button>
        </div>
      </div>
    </>
  );
};

export default DropdownComp;
