
import Image from "next/image";
import CreatePost from "./components/CreatePost";
import { currentUser } from "@clerk/nextjs/server";

export default async function Home() {


  const user = await currentUser();
  return (
  <div className="min-h-screen bg-background text-foreground p-6 flex-1">
    <div className="grid grid-cols-1 lg:grid-cols-10 w-full h-full gap-4">

<div className="col-span-6 ">

{user?<CreatePost/>:null}




</div>
<div className="col-span-4">hi</div>


      </div>
  </div>
  );
}
