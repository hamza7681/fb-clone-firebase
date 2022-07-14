import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoutes = () => {
  const { token } = useSelector((state) => state.AuthReducer);
  const getAuth = () => {
    if (token) return true;
    else return false;
  };
  const auth = getAuth();
  return <>{!auth ? <Navigate to="/login" /> : <Outlet />}</>;
};

export default PrivateRoutes;
