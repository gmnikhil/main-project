import React, { createContext, useState } from "react";

export const AuthContext = createContext("");

function AuthContextProvider(props: any) {
  const [currentUser, setCurrentUser] = useState(
    localStorage.getItem("projectUser")
  );
  const [username, setUsername] = useState(
    localStorage.getItem("projectUsername")
  );
  const [token, setToken] = useState(localStorage.getItem("projectToken"));

  const handleUser = (user: any) => {
    setCurrentUser(user);
    localStorage.setItem("projectUser", user);
  };

  const handleToken = (token: any) => {
    setToken(token);
    localStorage.setItem("projectToken", token);
  };

  const handleUserName = (username: any) => {
    setUsername(username);
    localStorage.setItem("projectUsername", username);
  };

  const handleLogout = () => {
    localStorage.removeItem("projectUser");
    localStorage.removeItem("projectToken");
    localStorage.removeItem("projectUsername");
  };

  const value = {
    currentUser,
    token,
    username,
    handleUser,
    handleLogout,
    handleToken,
    handleUserName,
  };

  return (
    <AuthContext.Provider value={value as any}>
      {props.children}
    </AuthContext.Provider>
  );
}

export default AuthContextProvider;
