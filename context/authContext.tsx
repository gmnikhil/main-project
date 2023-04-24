import React, { createContext, useEffect, useState } from "react";

export const AuthContext = createContext(undefined as any);

function AuthContextProvider(props: any) {
  const [currentUser, setCurrentUser] = useState();
  const [currentCompany, setCurrentCompany] = useState();
  const [companyName, setCompanyName] = useState();
  const [username, setUsername] = useState();
  const [token, setToken] = useState();

  const handleUser = (user: any) => {
    setCurrentUser(user);
    if (user) handleCompanyLogout();
    localStorage.setItem("projectUser", JSON.stringify(user));
  };

  const handleCompany = (company: any) => {
    setCurrentCompany(company);
    if (company) handleUserLogout();
    localStorage.setItem("projectCompany", company);
  };

  const handleToken = (token: any) => {
    setToken(token);
    localStorage.setItem("projectToken", token);
  };

  const handleUsername = (username: any) => {
    setUsername(username);
    localStorage.setItem("projectUsername", username);
  };

  const handleCompanyName = (companyName: any) => {
    setCompanyName(companyName);
    localStorage.setItem("projectCompanyName", companyName);
  };

  const handleUserLogout = () => {
    localStorage.removeItem("projectUser");
    localStorage.removeItem("projectToken");
    localStorage.removeItem("projectUsername");
    setCurrentUser(undefined);
  };
  const handleCompanyLogout = () => {
    localStorage.removeItem("projectCompany");
    localStorage.removeItem("projectToken");
    localStorage.removeItem("projectCompanyName");
    setCurrentCompany(undefined);
  };

  const value = {
    currentUser,
    currentCompany,
    token,
    username,
    companyName,
    handleUser,
    handleCompany,
    handleUserLogout,
    handleToken,
    handleUsername,
    handleCompanyName,
    handleCompanyLogout,
  };

  useEffect(() => {
    let u = localStorage.getItem("projectUser");
    if (u) setCurrentUser(JSON.parse(u) as any);
    setUsername(localStorage.getItem("projectUsername") as any);
    setToken(localStorage.getItem("projectToken") as any);
    let c = localStorage.getItem("projectCompany");
    if (c) setCurrentCompany(JSON.parse(c) as any);
    setCompanyName(localStorage.getItem("projectCompanyName") as any);
  }, []);

  return (
    <AuthContext.Provider value={value as any}>
      {props.children}
    </AuthContext.Provider>
  );
}

export default AuthContextProvider;
