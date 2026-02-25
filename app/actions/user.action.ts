"use server";
import { prisma } from "@/lib/prisma";

import { auth, currentUser } from "@clerk/nextjs/server";

export async function syncUser() {
  try {
    const { userId } = await auth();

    if (!userId) {
      console.log("Error: userId is null or undefined.");
      return null;
    }

    const user = await currentUser();

    const existingUser = await prisma.user.findUnique({
      where: {
        clerkId: userId,
      },
    });

    if (existingUser){
        console.log("User already exists in the database");
        return existingUser;

    } 

    // Handle cases where user.firstName or user.lastName might be undefined
    const username =
      `${user?.firstName || ""} ${user?.lastName || ""}`.trim() || "Anonymous";

    const createUser = await prisma.user.create({
      data: {
        clerkId: userId,
        username: username, // Use the constructed username
        email: user?.emailAddresses[0]?.emailAddress || "", // Safely access emailAddress
        profileImageUrl: user?.imageUrl || "",
      },
    });

    console.log("User synced successfully");

    return createUser;
  } catch (e) {
    console.log("Error syncing user:", e);
    return null;
  }
}



export async function getUser({clerkid}:{clerkid:string | undefined | null}){
try{

    if(!clerkid){
        return null;
    }

    const user = await prisma.user.findUnique({
        where:{
            clerkId: clerkid
        },
        include:{
      _count:{
        select:{
          followers:true,
          following:true,
          posts:true
        }
      }
        }
    })


    return user;

}catch(e)
{
  console.log("Error fetching user:", e);
  return null;

}

}




export async function getUserId(){

  try{

    const user = await auth();

    if(!user.userId){
      console.log("Error: userId is null or undefined.");
      return null;
    }

    return user.userId;

  }
  catch(e)
  {

  }
}

export async function CreatePostdb({content,image}:{content:string,image:string}){
  try{
    const user = await auth();

    if(!user.userId){
      console.log("Error: userId is null or undefined.");
      return null;
    }

    if (!content.trim() && !image.trim()) {
      console.log("Error: Both content and image are empty.");
      return null;
    }

    const newPost = await prisma.post.create({
      data:{
        authorId: user.userId,
        content: content,
       
        Image: image 
      }
    });

    if(!newPost) return "post not created some error";

    return newPost;
  }
  catch(e)
  {
    console.log("error",e);
    return e;
  }
}