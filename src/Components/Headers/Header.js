import React, { useState } from "react";
import "./header.css";
import logo from "../../assets/logo.png";
import logo2 from '../../assets/logo2.png'
import FlagIcon from "@mui/icons-material/Flag";
import HomeIcon from "@mui/icons-material/Home";
import StorefrontIcon from "@mui/icons-material/Storefront";
import SubscriptionsIcon from "@mui/icons-material/Subscriptions";
import { Avatar, IconButton } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useSelector } from "react-redux";
import DropdownComp from "./Dropdown";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const { user,fullUser } = useSelector((state) => state.AuthReducer);
  const [show, setShow] = useState(false);
  const navigate = useNavigate();

  const goto = () => {
    navigate("/");
  };

  const gotoProfile = ()=>{
    navigate(`/${user?.displayname}`)
  }

  return (
    <>
      <div className="header">
        <div className="header_left">
          <img src={logo} alt="fb" onClick={goto} />
          <img src={logo2} alt='facebook'  />
        </div>
        <div className="header_middle">
          <div className="header_option header_option_active">
            <HomeIcon fontSize="large" />
          </div>
          <div className="header_option">
            <FlagIcon fontSize="large" />
          </div>
          <div className="header_option">
            <SubscriptionsIcon fontSize="large" />
          </div>
          <div className="header_option">
            <StorefrontIcon fontSize="large" />
          </div>
          <div className="header_option profile_header" onClick={gotoProfile}>
            <AccountCircleIcon  fontSize="large" />
          </div>
        </div>
        <div className="header_right">
          <div className="header_info">
            <Avatar src={fullUser?.data.profilePhoto} />
            <h4>{fullUser?.data.name}</h4>
          </div>
          <IconButton className="btn_icon" onClick={() => setShow(!show)}>
            <ExpandMoreIcon className="more_icon" />
          </IconButton>
        </div>
        {show ? <DropdownComp setShow={setShow} show={show} /> : ""}
      </div>
    </>
  );
};

export default Header;
