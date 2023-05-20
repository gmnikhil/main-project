import Link from "next/link";

function Navbar()
{
  return(
    <div className="flex flex-row justify-between font-fredoka text-lg">
      <div className="ml-5">
      <nav>
          <ul>
            <Link href="../profile">Profile</Link>
            <Link href="../chat/list" className="ml-4">Messages</Link>
            <Link href="../job" className="ml-4">Job</Link>
            <Link href="../auth/login" className="ml-4">Logout</Link>
          </ul>
        </nav>
      </div>
      <div className="flex justify-end mr-5">
        <div>WeConnect</div>
      </div>
    </div> 
  );
}

export default Navbar;