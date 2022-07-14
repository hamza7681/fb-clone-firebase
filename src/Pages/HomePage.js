import React from "react";
import Feed from "../Components/Feed/Feed";
import Sidebar from "../Components/Sidebar/Sidebar";
import Widgets from "../Components/Widgets/Widgets";
import "../App.css";

const HomePage = () => {
  return (
    <>
     
      <div className="row g-0" >
        <div className="col-md-3 sidebar_div">
          <Sidebar />
        </div>
        <div className="col-md-6" >
          <Feed />
        </div>
        <div className="col-md-3" style={{padding:0}}>
          <Widgets/>
        </div>
      </div>
    </>
  );
};

export default HomePage;
