"use client";

import React, { useState } from "react";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { GalleryHorizontal, Send } from "lucide-react";
import toast from "react-hot-toast";


function CreatePost({ userDetails }: { userDetails: { profileImageUrl?: string, clerkid: string } }) {
  const [content, setContent] = useState("");
  const [isPosting, setIsPosting] = useState(false);
  const [image, setImage] = useState<File | null>(null);

  
  const handlePost = async () => {
    setIsPosting(true);
    try {
    
      const res = { success: true };

      if (res.success) {
        setContent("");
        setImage(null);
        toast.success("Post created successfully!");
      }
    } catch (err) {
      toast.error("Failed to create post.");
    } finally {
      setIsPosting(false);
    }
  };

  return (
    <div className="h-64 w-full border-2 border-border rounded-2xl p-4 flex flex-col justify-between text-foreground text-lg font-medium overflow-y-auto">
      <div className="flex  gap-2">
        <Avatar className="w-12 h-12 border-2 shrink-0">
          <AvatarImage src={userDetails?.profileImageUrl || "/avatar.png"} />
        </Avatar>
        <Textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Type your message here."
          className="  border-none resize-none overflow-y-auto max-h-34"
        />
      </div>
      <div className="flex flex-col gap-3">
        <Separator className="my-3" />
        <div className="flex justify-between items-center gap-3 px-4">
          <button className=" border flex items-center gap-2 px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-accent rounded-lg transition-colors duration-200">
            <GalleryHorizontal className="w-4 h-4" />
            Photo
          </button>
          <button
            className="flex items-center gap-2 px-6 py-2 bg-primary text-primary-foreground text-sm font-medium rounded-lg hover:bg-primary/90 transition-colors duration-200 shadow-sm"
            disabled={isPosting || content.trim() === ""}
            onClick={handlePost}
          >
            <Send className="w-4 h-4" />
            Post
          </button>
        </div>
      </div>
    </div>
  );
}

export default CreatePost;
