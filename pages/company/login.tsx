import Image from "next/image";
import signin from "./../../public/images/signin.png";
import Input from "../../components/input";
import { Roboto } from "@next/font/google";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import requestHandler from "../../utils/requestHandler";
import { AuthContext } from "../../context/authContext";
import { useRouter } from "next/router";
import Navbarlogin from "../../components/Navbarlogin";

const roboto = Roboto({
  weight: "700",
  subsets: ["latin"],
  variable: "--font-roboto",
});

function SignIn() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [emailErr, setEmailErr] = useState("");
  const [passwordErr, setPasswordErr] = useState("");

  const { currentCompany, handleCompany, handleToken, handleCompanyName } =
    useContext(AuthContext);

  async function loginUser(e: any) {
    e.preventDefault();
    console.log({ email, password });
    requestHandler("POST", "/api/company/login", { email, password })
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
    <>
    <Navbarlogin />
    <div className="flex flex-row justify-evenly mt-0">
      <div className="flex justify-center pl-0 mr-0 mt-20 ">
        <Image src={signin} alt="sign in image" width={700} />
      </div>
      <div className="flex flex-col space-y-8 mt-40 ">
        <p className="font-fredoka text-6xl  text-peach">Welcome</p>
        <form method="post" className="flex flex-col">
          <Input
            type="email"
            onChange={(e: any) => setEmail(e.target.value)}
            value={email}
            placeholder="Email"
          />
          <Input
            type="password"
            onChange={(e: any) => setPassword(e.target.value)}
            value={password}
            placeholder="Password"
          />
          <Link href="#" className="mt-4">
            Forgot Password?
          </Link>
          <button
            type="submit"
            onClick={loginUser}
            className="bg-red-500  h-10 rounded-md text-white font-fredoka text-lg mt-7"
          >
            Log In
          </button>
        </form>
        <div className="relative flex py-0 items-center">
          <div className="flex-grow border-t border-gray-400"></div>
          <span className="flex-shrink mx-4 text-gray-400">Or</span>
          <div className="flex-grow border-t border-gray-400"></div>
        </div>
        <div className="flex justify-center ">
          <Link href="./signup" className="">
            Create New Account
          </Link>
        </div>
        <div className="relative flex py-0 items-center">
          <div className="flex-grow border-t border-gray-400"></div>
          <span className="flex-shrink mx-4 text-gray-400">Or</span>
          <div className="flex-grow border-t border-gray-400"></div>
        </div>
        <div className="flex justify-center ">
          <Link href="../auth/login" className="">
            User Login
          </Link>
        </div>
      </div>
      
    </div>
    </>
  );
}

export default SignIn;
