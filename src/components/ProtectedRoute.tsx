import React, { JSX } from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectIsAuth } from "../redux/auth";

interface props {
  children: JSX.Element;
}

export const ProtectedRoute = ({ children }: props) => {
  const isAuth = useSelector(selectIsAuth);
  const token = localStorage.getItem("token");

  if (!isAuth && !token) {
    return <Navigate to="/login" />;
  }

  return children;
};
