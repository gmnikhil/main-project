import Link from "next/link";
import { Divider } from '@mantine/core';


function Jobpost()
{
    return(
        <div className="flex ml-5 font-josefin flex-row">
            <div className="bg-black h-10 w-10 rounded-3xl mt-5 mr-5">

            </div>
            <div>
            <Link href="#"><p className="font-bold text-red-600 text-xl w-96">Post</p></Link>
                <p>Company name</p>
                <p>Location</p>
                <p>upload time</p>
                <Divider my="lg" /> 
            </div>
        </div>

    );
}

export default Jobpost;