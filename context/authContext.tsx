import React, { createContext, useEffect, useState } from "react";

export const AuthContext = createContext(undefined as any);

function AuthContextProvider(props: any) {
  const [currentUser, setCurrentUser] = useState();
  const [username, setUsername] = useState();
  const [token, setToken] = useState();

  const handleUser = (user: any) => {
    setCurrentUser(user);
    localStorage.setItem("projectUser", user);
  };

  const handleToken = (token: any) => {
    setToken(token);
    localStorage.setItem("projectToken", token);
  };

  const handleUsername = (username: any) => {
    setUsername(username);
    localStorage.setItem("projectUsername", username);
  };

  const handleLogout = () => {
    localStorage.removeItem("projectUser");
    localStorage.removeItem("projectToken");
    localStorage.removeItem("projectUsername");
    setCurrentUser(undefined);
  };

  const value = {
    currentUser,
    token,
    username,
    handleUser,
    handleLogout,
    handleToken,
    handleUsername,
  };

  useEffect(() => {
    setCurrentUser(localStorage.getItem("projectUser") as any);
    setUsername(localStorage.getItem("projectUsername") as any);
    setToken(localStorage.getItem("projectToken") as any);
  }, []);

  return (
    <AuthContext.Provider value={value as any}>
      {props.children}
    </AuthContext.Provider>
  );
}

export default AuthContextProvider;
