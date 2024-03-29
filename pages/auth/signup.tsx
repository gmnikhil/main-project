import Image from "next/image";
import signup from "./../../public/images/signUp.png";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/authContext";
import { useRouter } from "next/router";
import requestHandler from "../../utils/requestHandler";
import Navbarlogin from "../../components/Navbarlogin";

function signUp() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmpassword] = useState("");
  const [isValidEmail, setIsValidEmail] = useState(true);

  const [nameErr, setNameErr] = useState("");
  const [usernameErr, setUserNameErr] = useState("");
  const [emailErr, setEmailErr] = useState("");
  const [passwordErr, setPasswordErr] = useState("");

  const { currentUser, handleUser, handleToken, handleUsername } =
    useContext(AuthContext);

  async function signupUser(e: any) {
    e.preventDefault();

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isValid = emailPattern.test(email);
    setIsValidEmail(isValid);
    if (isValidEmail) {
      // Proceed with submission
      console.log("Email is valid!");
    } else {
      // Email is not valid
      alert("Invalid Email Format!");
      return;
    }
    if (password === confirmpassword) {
      // Passwords match, proceed with form submission or other actions
      console.log("Passwords match!");
    } else {
      // Passwords do not match
      alert("Passwords Do Not Match!");
      return;
    }

    requestHandler("POST", "/api/user/signup", {
      name,
      username,
      email,
      password,
    })
      .then((res: any) => {
        const { user, token } = res.data;
        handleUser(user);
        handleToken(token);
        handleUsername(user.username);
      })
      .catch((err: any) => console.log(err));
  }

  useEffect(() => {
    if (currentUser) router.push("/profile");
  }, [currentUser]);

  return (
    <>
      <Navbarlogin />
      <div className=" h-fixed">
        <div className="flex flex-row">
          <div className=" bg-off-white w-3/5 pl-7 pt-2 overflow-hidden">
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
                type={"text"}
                placeholder="Username"
                name="username"
                onChange={(e) => setUsername(e.target.value)}
                value={username}
                className="border-solid border-2 border-black h-11 pl-4 mt-7 w-96  rounded-lg  "
              ></input>
              <input
                type={"email"}
                placeholder="Email"
                name="email"
                onChange={(e) => setEmail(e.target.value)}
                className="border-solid border-2 border-black h-11 pl-4 mt-7   rounded-lg  "
                pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
              ></input>
              <input
                type={"password"}
                placeholder="Password"
                name="password"
                onChange={(e) => setPassword(e.target.value)}
                className="border-solid border-2 border-black h-11 pl-4 mt-7  rounded-lg  "
              ></input>
              <input
                type={"password"}
                placeholder="Confirm Password"
                name="password"
                onChange={(e) => setConfirmpassword(e.target.value)}
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
              {/* <Link href="./login" className="text-lg">
                Log In
              </Link> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default signUp;
