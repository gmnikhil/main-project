import Image from "next/image";
import camera from "./../public/images/camera.png";
import { Button } from "@mantine/core";
function jobdesc(){
    return(
        <div className="bg-white flex flex-row h-screen">
            <div className=" bg-white w-1/3 flex justify-center items-center flex-col overflow-hidden">
                <Image src={camera} alt="company logo" className="w-20 h-20 " />
                <div className="mt-5 flex flex-col items-center">
                    <p className="font-josefin text-3xl text-red-700 ">Company Name</p>
                    <p className="font-josefin text-2xl mt-2">Location</p>
                    <p className="font-josefin text-lg mt-1">Uploaded 19 minutes ago</p>
                    <Button variant="outline" color="red" className="mt-7">Follow</Button>
                </div>
            </div>
            <div className=" pl-10 w-2/3 pr-20 bg-beige pb-5 overflow-y-scroll">
                <div className="flex flex-row ">
                <p className="font-gloock text-3xl font-bold mt-10 text-red-700 mr-16">Role/Post</p>
                <Button variant="filled"  size="md" color="red" className="mt-10 bg-red-600 text-white rounded-3xl ">Apply</Button>
                </div>
               
                <p className="font-bold font-josefin text-2xl mb-3 mt-6 ">Introduction</p>
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
                
                <p className="font-bold font-josefin text-2xl mb-3">Preferred Technical And Professional Expertise</p>
                <p className="text-justify mb-8">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin vel dictum arcu, et viverra ipsum. Aliquam erat volutpat.
                 Quisque eget metus quis turpis gravida fringilla varius nec tortor. Pellentesque purus velit, eleifend at aliquet vel, 
                 suscipit at urna. Curabitur eget mi eget lectus lacinia placerat ac in enim. Phasellus porttitor lorem imperdiet, 
                 lobortis felis in, varius quam. Vestibulum fermentum turpis at tellus lobortis luctus. Ut at condimentum nibh, 
                 eget posuere lorem. Nulla vestibulum, metus ac laoreet fermentum, nulla lectus faucibus elit, ac ornare nisi 
                 ipsum et ante. Nulla pretium pellentesque fringilla.
                </p>

                <p className="font-bold font-josefin text-2xl mb-3">About Business Unit</p>
                <p className="text-justify mb-8">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin vel dictum arcu, et viverra ipsum. Aliquam erat volutpat.
                 Quisque eget metus quis turpis gravida fringilla varius nec tortor. Pellentesque purus velit, eleifend at aliquet vel, 
                 suscipit at urna. Curabitur eget mi eget lectus lacinia placerat ac in enim. Phasellus porttitor lorem imperdiet, 
                 lobortis felis in, varius quam. Vestibulum fermentum turpis at tellus lobortis luctus. Ut at condimentum nibh, 
                 eget posuere lorem. Nulla vestibulum, metus ac laoreet fermentum, nulla lectus faucibus elit, ac ornare nisi 
                 ipsum et ante. Nulla pretium pellentesque fringilla.
                </p>

               

            </div>
        </div>
    );
}

export default jobdesc;