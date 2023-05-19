
import Jobpost from "../components/Jobpost";

function Job() {
    return(
        <div className="flex bg-off-white h-screen p-5 justify-center ">
                <div className= " bg-white rounded-xl border-solid border-gray-300 border w-1/3 pt-10">
                    <Jobpost />
                    <Jobpost />
                </div>
        </div>
    );
}

export default Job;