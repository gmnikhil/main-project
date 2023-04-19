import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/authContext";
import { useRouter } from "next/router";
import requestHandler from "../../utils/requestHandler";

export default function CompanyProfile() {
  const router = useRouter();
  const [name, setName] = useState();
  const [email, setEmail] = useState();

  const { currentCompany, token, handleCompanyLogout } =
    useContext(AuthContext);

  const logout = () => {
    handleCompanyLogout();
    router.push("/company/login");
  };

  useEffect(() => {
    if (!token) return;
    requestHandler("GET", "/api/company/profile", {}, token)
      .then((res: any) => {
        setName(res.data.company.name);
        setEmail(res.data.company.email);
      })
      .catch((err: any) => console.log(err));
  }, [token]);

  useEffect(() => {
    if (!currentCompany) router.push("/company/login");
  }, [currentCompany]);

  return (
    <>
      <button onClick={logout}>Logout</button>
      <div>Company Name:{name}</div>
      <br />
      <div>Email: {email}</div>
    </>
  );
}
