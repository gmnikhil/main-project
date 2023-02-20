import Image from "next/image"
import signin from "./../images/signin.png"
import Input from "./../components/input"
import { Roboto } from '@next/font/google'
import Link from "next/link"

const roboto = Roboto({
  weight: '700',
  subsets: ['latin'],
  variable: '--font-roboto',
})

function SignIn() {
  return (
    <div className="flex flex-row justify-evenly mt-0 ">
      <div className="flex flex-col space-y-8 mt-40 ">
      <p className="font-fredoka text-6xl  text-peach" >Welcome</p>
      <form method="post" className="flex flex-col" >
                <Input type="text" placeholder="Username"  />
                <Input type="password" placeholder="Password"  />
                <Link href="#" className="mt-4">Forgot Password?</Link>
                <input type="submit" className="bg-red-500  h-10 rounded-md text-white font-fredoka text-lg mt-7" />
      </form>      
      <div className="relative flex py-0 items-center"> 
        <div className="flex-grow border-t border-gray-400"></div> 
        <span className="flex-shrink mx-4 text-gray-400">Or</span> 
        <div className="flex-grow border-t border-gray-400"></div> 
      </div>
      <div className="flex justify-center ">
        <Link href="#" className="">Create New Account</Link>
      </div>
      
     </div>
      <div className="pl-80 mr-0">
        <Image src={signin} alt="sign in image" width={700} />
      </div>

      
    </div>
  );
}

export default SignIn
