import { SignIn } from "@clerk/nextjs";
import { Image } from "@unpic/react";
export default function Page() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 min-h-screen bg-linear-to-r from-blue-100 to-orange-400">
      <div>
        <Image
          src={"/splash3.jpg"}
          alt="login"
          layout="fullWidth"
          className="object-cover h-full w-full"
        />
      </div>
      <div className="flex justify-center items-center h-full">
        <SignIn />
      </div>
    </div>
  );
}

//write a script to generate 30 seconds video on topic: interesting historical story along with AI image prompt in realistic format for each scene and give me result in JSON format along with imagePrompt and ContextText as field
