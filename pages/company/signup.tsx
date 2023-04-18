import Image from "next/image";
import signup from "./../images/signUp.png";
import Link from "next/link";

function signUp() {
  return (
    <div className=" h-screen">
      <div className="flex flex-row">
        <div className="h-screen bg-off-white w-3/5 pl-7 pt-2 overflow-hidden">
          <Image src={signup} alt="sign in image" height={1000} width={900} />
        </div>
        <div className="flex flex-col pl-28 mt-12">
          <p className="mt-10  font-fredoka text-5xl text-peach">Sign Up</p>
          <form className="flex flex-col ">
            <input
              type={"text"}
              placeholder="Name"
              className="border-solid border-2 border-black h-11 pl-4 mt-16 w-96  rounded-lg  "
            ></input>
            <input
              type={"email"}
              placeholder="Email"
              className="border-solid border-2 border-black h-11 pl-4 mt-7   rounded-lg  "
            ></input>
            <input
              type={"password"}
              placeholder="Password"
              className="border-solid border-2 border-black h-11 pl-4 mt-7  rounded-lg  "
            ></input>
            <input
              type={"submit"}
              value="Join"
              className="border-solid border-2 font-fredoka text-2xl bg-red-500 text-white h-11 pl-4 mt-16   rounded-lg  "
            ></input>
          </form>
          <div className="relative flex py-10 items-center">
            <div className="flex-grow border-t border-gray-400"></div>
            <span className="flex-shrink mx-4 text-gray-400">Or</span>
            <div className="flex-grow border-t border-gray-400"></div>
          </div>
          <div className="flex justify-center ">
            <Link href="./login" className="text-lg">
              Sign In
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default signUp;
