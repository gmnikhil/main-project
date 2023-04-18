import Image from "next/image";
import signin from "./../../images/signin.png";
import Input from "../../components/input";
import { Roboto } from "@next/font/google";
import Link from "next/link";
import { useState } from "react";
import axios from "axios";

const roboto = Roboto({
  weight: "700",
  subsets: ["latin"],
  variable: "--font-roboto",
});

function SignIn() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [usernameErr, setUsernameErr] = useState("");
  const [passwordErr, setPasswordErr] = useState("");

  async function loginUser(e: any) {
    e.preventDefault();
    console.log({ username, password });
    axios
      .post("/api/login", { username, password })
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  }

  return (
    <div className="flex flex-row justify-evenly mt-0 ">
      <div className="flex flex-col space-y-8 mt-40 ">
        <p className="font-fredoka text-6xl  text-peach">Welcome</p>
        <form method="post" className="flex flex-col">
          <Input
            type="text"
            onChange={(e: any) => setUsername(e.target.value)}
            value={username}
            placeholder="Username"
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
      </div>
      <div className="pl-80 mr-0">
        <Image src={signin} alt="sign in image" width={700} />
      </div>
    </div>
  );
}

export default SignIn;
