import React from "react";
import "./sidebar.css";
import SidebarRow from "./SidebarRow";
import EmojiFlagsIcon from "@mui/icons-material/EmojiFlags";
import PeopleIcon from "@mui/icons-material/People";
import StorefrontIcon from "@mui/icons-material/Storefront";
import VideoLibraryIcon from "@mui/icons-material/VideoLibrary";
import { useSelector } from "react-redux";

const Sidebar = () => {
  const { fullUser } = useSelector((state) => state.AuthReducer);

  return (
    <>
      <div className="sidebar">
        <SidebarRow src={fullUser?.data.profilePhoto} title={fullUser?.data.name} />
        <SidebarRow Icon={EmojiFlagsIcon} title="Groups" />
        <SidebarRow Icon={PeopleIcon} title="Friends" />
        <SidebarRow Icon={StorefrontIcon} title="Marketplace" />
        <SidebarRow Icon={VideoLibraryIcon} title="Videos" />
      </div>
    </>
  );
};

export default Sidebar;
