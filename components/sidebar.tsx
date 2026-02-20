import { auth } from '@clerk/nextjs/server'
import React from 'react'
import { getUser } from '../app/actions/user.action'
import { Avatar, AvatarImage } from "./ui/avatar";
import { Separator } from "./ui/separator";
import { LinkIcon, MapPinIcon } from "lucide-react";
import { Card, CardContent } from "./ui/card";
import Link from "next/link";

import {
    SignedIn,
    SignedOut,
    SignUpButton,
    UserButton,
    SignInButton,
  } from "@clerk/nextjs";
async function Sidebar() {



    const user = await  auth();

    console.log("Sidebar - User ID:", user.userId);

    if(!user.userId){
        console.log("No user ID, showing NotSignedIn");
        return <NotSignedIn/>
    }

const Userdetails = await getUser({clerkid: user.userId});

console.log("Sidebar - User details from DB:", Userdetails);

      if(!Userdetails){
        console.log("User not in DB, syncing...");
        const { syncUser } = await import('../app/actions/user.action');
        const syncResult = await syncUser();
        console.log("Sync result:", syncResult);
      
        const syncedUser = await getUser({clerkid: user.userId});
        console.log("User after sync:", syncedUser);
        if(!syncedUser){
            console.log("Sync failed, showing NotSignedIn");
            return <NotSignedIn/>
        }
        return <SignedInView userDetails={syncedUser} />
    }
   
    console.log("Showing SignedInView with user:", Userdetails.username);
    return <SignedInView userDetails={Userdetails} />

}

export default Sidebar





function NotSignedIn(){

    return(
        <>

<div className='w-80 h-74  sticky  border-2  rounded-4xl text-foreground p-4 flex items-center  flex-col gap-4'>

    <h2 className="text-black dark:text-white light:text-black font-bold text-2xl ">Welcome Back!</h2>
   
   <h3 className='text-center text-neutral-800 dark:text-neutral-300 light:text-neutral-700 text-xm'>Login to access your profile and connect with others</h3>
   <SignedOut>
            <SignInButton mode="modal">
              <button className="text-foreground hover:text-primary transition-colors w-1/2 border border-primary rounded-md px-4 py-2">
                Sign In
              </button>
            </SignInButton>
            <SignUpButton mode="modal">
              <button className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-md w-1/2 px-4 py-2  border border-black transition-colors">
                Sign Up
              </button>
            </SignUpButton>
          </SignedOut>

   </div>

        
        
       
        </>
    )

} 


function SignedInView({userDetails}: {userDetails: any}) {
    return(
        <div className="sticky top-20 w-74 h-70">
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col items-center text-center">
              <Link
                href={`/profile/${userDetails.username}`}
                className="flex flex-col items-center justify-center"
              >
                <Avatar className="w-20 h-20 border-2 ">
                  <AvatarImage src={userDetails.profileImageUrl || "/avatar.png"} />
                </Avatar>
  
                <div className="mt-4 space-y-1">
                  <h3 className="font-semibold">{userDetails.username}</h3>
                  <p className="text-sm text-muted-foreground">@{userDetails.username}</p>
                </div>
              </Link>
  
              {userDetails.bio && <p className="mt-3 text-sm text-muted-foreground">{userDetails.bio}</p>}
  
              <div className="w-full">
                <Separator className="my-4" />
                <div className="flex justify-between mx-4">
                  <div>
                    <p className="font-medium">{userDetails._count.following}</p>
                    <p className="text-xs text-muted-foreground">Following</p>
                  </div>
                  <Separator orientation="vertical" />
                  <div>
                    <p className="font-medium">{userDetails._count.followers}</p>
                    <p className="text-xs text-muted-foreground">Followers</p>
                  </div>
                </div>
                <Separator className="my-4" />
              </div>
  
              <div className="w-full space-y-2 text-sm">
                <div className="flex items-center text-muted-foreground">
                  <MapPinIcon className="w-4 h-4 mr-2" />
                  {userDetails.location || "No location"}
                </div>
                <div className="flex items-center text-muted-foreground">
                  <LinkIcon className="w-4 h-4 mr-2 shrink-0" />
                  {userDetails.websiteUrl ? (
                    <a href={`${userDetails.websiteUrl}`} className="hover:underline truncate" target="_blank">
                      {userDetails.websiteUrl}
                    </a>
                  ) : (
                    "No website"
                  )}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    )
}