import Image from "next/image";
import CreatePostWrapper from "./components/CreatePostWrapper";
import { currentUser } from "@clerk/nextjs/server";

export default async function Home() {


  const user = await currentUser();
  return (
  <div className="min-h-screen bg-background text-foreground p-6 flex-1">
    <div className="grid grid-cols-1 lg:grid-cols-10 w-full h-full gap-4">

<div className="col-span-6 ">

{user?<CreatePostWrapper />:<div className="w-full h-64 border-2 border-border rounded-2xl p-4 flex items-center justify-center text-foreground text-lg font-medium">
  Please sign in to create a post.</div>}



</div>
<div className="col-span-4">hi</div>


      </div>
  </div>
  );
}
