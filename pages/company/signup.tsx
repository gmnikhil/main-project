import Image from "next/image";
import signup from "./../../images/signUp.png";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/authContext";
import { useRouter } from "next/router";
import requestHandler from "../../utils/requestHandler";

function signUp() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [nameErr, setNameErr] = useState("");
  const [emailErr, setEmailErr] = useState("");
  const [passwordErr, setPasswordErr] = useState("");

  const { currentCompany, handleCompany, handleToken, handleCompanyName } =
    useContext(AuthContext);

  async function signupUser(e: any) {
    e.preventDefault();
    requestHandler("POST", "/api/company/signup", {
      name,
      email,
      password,
    })
      .then((res: any) => {
        const { company, token } = res.data;
        handleCompany(company);
        handleToken(token);
        handleCompanyName(company.name);
        if (res.data.success) router.push("/company/profile");
      })
      .catch((err: any) => console.log(err));
  }

  useEffect(() => {
    if (currentCompany) router.push("/company/profile");
  }, [currentCompany]);

  return (
    <div className=" h-screen">
      <div className="flex flex-row">
        <div className="h-screen bg-off-white w-3/5 pl-7 pt-2 overflow-hidden">
          <Image src={signup} alt="sign in image" height={1000} width={900} />
        </div>
        <div className="flex flex-col pl-28 mt-12">
          <p className="mt-10  font-fredoka text-5xl text-peach">Sign Up</p>
          <form className="flex flex-col">
            <input
              type={"text"}
              placeholder="Name"
              name="name"
              onChange={(e) => setName(e.target.value)}
              value={name}
              className="border-solid border-2 border-black h-11 pl-4 mt-16 w-96  rounded-lg  "
            ></input>

            <input
              type={"email"}
              placeholder="Email"
              name="email"
              onChange={(e) => setEmail(e.target.value)}
              className="border-solid border-2 border-black h-11 pl-4 mt-7   rounded-lg  "
            ></input>
            <input
              type={"password"}
              placeholder="Password"
              name="password"
              onChange={(e) => setPassword(e.target.value)}
              className="border-solid border-2 border-black h-11 pl-4 mt-7  rounded-lg  "
            ></input>
            <button
              type={"submit"}
              onClick={signupUser}
              disabled={!name || !email || !password}
              className="border-solid border-2 font-fredoka text-2xl bg-red-500 text-white h-11 pl-4 mt-16   rounded-lg  "
            >
              Join
            </button>
          </form>
          <div className="relative flex py-10 items-center">
            <div className="flex-grow border-t border-gray-400"></div>
            <span className="flex-shrink mx-4 text-gray-400">Or</span>
            <div className="flex-grow border-t border-gray-400"></div>
          </div>
          <div className="flex justify-center ">
            <Link href="./login" className="text-lg">
              Log In
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default signUp;
