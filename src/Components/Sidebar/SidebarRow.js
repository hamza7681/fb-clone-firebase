import { Avatar } from "@mui/material";
import React from "react";
import "./sidebar.css";

const SidebarRow = ({ title, src, Icon }) => {
  return (
    <>
      <div className="sidebarRow">
        {src && <Avatar src={src} />}
        {Icon && <Icon />}
        <h4>{title}</h4>
      </div>
    </>
  );
};

export default SidebarRow;
