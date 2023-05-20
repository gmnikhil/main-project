import Image from "next/image";
import camera from "./../public/images/camera.png";
function jobdesc(){
    return(
        <div className="bg-beige h-screen flex  flex-row ">
            <div className=" bg-white w-1/3 flex justify-center items-center flex-col">
                <Image src={camera} alt="company logo" className="w-20 h-20" />
                <div className="mt-5 flex flex-col items-center">
                    <p className="font-josefin text-3xl text-red-700">Company Name</p>
                    <p className="font-josefin text-2xl mt-2">Location</p>
                    <p className="font-josefin text-lg mt-1">Uploaded 19 minutes ago</p>
                </div>
            </div>
            <div className="ml-10 mt-10 w-2/3 pr-20 ">
                <p className="font-bold font-josefin text-2xl mb-3">Introduction</p>
                <p className="text-justify mb-8">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin vel dictum arcu, et viverra ipsum. 
                    Aliquam erat volutpat. Quisque eget metus quis turpis gravida fringilla varius nec tortor. Pellentesque purus 
                    velit, eleifend at aliquet vel, suscipit at urna. Curabitur eget mi eget lectus lacinia placerat ac in enim. 
                    Phasellus porttitor lorem imperdiet, lobortis felis in, varius quam. Vestibulum fermentum turpis at tellus 
                    lobortis luctus. Ut at condimentum nibh, eget posuere lorem. Nulla vestibulum, metus ac laoreet fermentum, 
                    nulla lectus faucibus elit, ac ornare nisi ipsum et ante. Nulla pretium pellentesque fringilla.</p>
                
                <p className="font-bold font-josefin text-2xl mb-3">Your Role and Responsibilities</p>
                <p className="text-justify mb-8">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin vel dictum arcu, et viverra ipsum. 
                    Aliquam erat volutpat. Quisque eget metus quis turpis gravida fringilla varius nec tortor. Pellentesque purus 
                    velit, eleifend at aliquet vel, suscipit at urna. Curabitur eget mi eget lectus lacinia placerat ac in enim. 
                    Phasellus porttitor lorem imperdiet, lobortis felis in, varius quam. Vestibulum fermentum turpis at tellus 
                    lobortis luctus. Ut at condimentum nibh, eget posuere lorem. Nulla vestibulum, metus ac laoreet fermentum, 
                    nulla lectus faucibus elit, ac ornare nisi ipsum et ante. Nulla pretium pellentesque fringilla.</p>
                
                <p className="font-bold font-josefin text-2xl mb-3">Required Technical and Professional Expertise</p>
                <p className="text-justify mb-8">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin vel dictum arcu, et viverra ipsum. 
                    Aliquam erat volutpat. Quisque eget metus quis turpis gravida fringilla varius nec tortor. Pellentesque purus 
                    velit, eleifend at aliquet vel, suscipit at urna. Curabitur eget mi eget lectus lacinia placerat ac in enim. 
                    Phasellus porttitor lorem imperdiet, lobortis felis in, varius quam. Vestibulum fermentum turpis at tellus 
                    lobortis luctus. Ut at condimentum nibh, eget posuere lorem. Nulla vestibulum, metus ac laoreet fermentum, 
                    nulla lectus faucibus elit, ac ornare nisi ipsum et ante. Nulla pretium pellentesque fringilla.</p>
                
                <p className="font-bold font-josefin text-2xl mb-3">Your Role and Responsibilities</p>
                <p>
                    <ul>
                        <li>Lorem ipsum dolor sit amet</li>
                        <li>onsectetur adipiscing elit</li>
                        <li>Proin vel dictum arcu</li>
                    </ul>
                </p>

            </div>
        </div>
    );
}

export default jobdesc;