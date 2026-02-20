import React from "react";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { auth } from "@clerk/nextjs/server";
import { getUser } from "../actions/user.action";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "radix-ui";
async function CreatePost() {
  const user = await auth();

  const UserDetails = await getUser({ clerkid: user.userId });

  return (
    <div className="h-64 w-full border-2 border-border rounded-2xl p-4 flex flex-col text-foreground text-lg font-medium overflow-y-auto">
      <div className="flex gap-2">
        <Avatar className="w-12 h-12 border-2 shrink-0">
          <AvatarImage src={UserDetails?.profileImageUrl || "/avatar.png"} />
        </Avatar>

        <Textarea
          placeholder="Type your message here."
          className=" border-none resize-none overflow-y-auto max-h-40"
        />
      </div>
    </div>
  );
}

export default CreatePost;
