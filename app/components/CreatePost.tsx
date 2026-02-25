"use client";

import React, { useState } from "react";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { GalleryHorizontal, Loader2Icon, Send } from "lucide-react";
import toast from "react-hot-toast";

type CreatePostProps = {
	user?: {
		imageUrl?: string | null;
		id?: string;
		// ...other fields if needed
	} | null;
	action: (args: { content: string; image: string }) => Promise<any>;
};

export default function CreatePost({ user, action }: CreatePostProps) {
  const [content, setContent] = useState("");
  const [isPosting, setIsPosting] = useState(false);
  const [image, setImage] = useState("");
  const [imageUpload, showImageUpload] = useState(false);

  const handlePost = async () => {
    if (content.trim() === "" && image.trim() === "") {
      return toast.error("Add content or image before posting.");
    }

    setIsPosting(true);
    try {
      const res = await action({ content, image }); // call server action passed from server component
      if (!res) {
        console.error("Server action returned falsy:", res);
        toast.error("Failed to create post. Please try again.");
        return;
      }
      toast.success("Post created successfully");
      setContent("");
      setImage("");
    } catch (e) {
      console.error("Error creating post:", e);
      toast.error("Error creating post.");
    } finally {
      setIsPosting(false);
    }
  };

  return (
    <div className="h-64 w-full border-2 border-border rounded-2xl p-4 flex flex-col justify-between text-foreground text-lg font-medium overflow-y-auto">
      <div className="flex  gap-2">
        <Avatar className="w-12 h-12 border-2 shrink-0">
          <AvatarImage src={user?.imageUrl || "/avatar.png"} />
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
          <button
            className=" border flex items-center gap-2 px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-accent rounded-lg transition-colors duration-200"
            onClick={() => showImageUpload(!imageUpload)}
          >
            <GalleryHorizontal className="w-4 h-4" />
            Photo
          </button>
          <button
            className="flex items-center gap-2 px-6 py-2 bg-primary text-primary-foreground text-sm font-medium rounded-lg hover:bg-primary/90 transition-colors duration-200 shadow-sm relative"
            disabled={isPosting || (content.trim() === "" && image.trim() === "")}
            onClick={handlePost}
          >
            {isPosting && (
              <div className="absolute inset-0 flex items-center justify-center bg-primary rounded-lg">
                <Loader2Icon className="animate-spin" />
              </div>
            )}
            <Send className="w-4 h-4" />
            Post
          </button>
        </div>
      </div>
    </div>
  );
}
