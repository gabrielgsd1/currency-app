import React, { useContext, useEffect } from "react";
import { UserContext } from "../Contexts/ContextProvider";
import { useNavigate } from "react-router-dom";

export const LoginAuth = ({ children }) => {
  const navigate = useNavigate();
  const userData = useContext(UserContext);

  useEffect(() => {
    if (userData.user.user === null) navigate("/login");
  });

  if (userData.user.user !== null) {
    return <div>{children}</div>;
  }
  return null;
};
