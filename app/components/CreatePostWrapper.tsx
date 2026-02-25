import CreatePost from "./CreatePost";
import { CreatePostdb } from "@/app/actions/user.action";
import { currentUser } from "@clerk/nextjs/server";

export default async function CreatePostWrapper() {
  // fetch current user on server
  const user = await currentUser();

  async function createPostAction({ content, image }: { content: string; image: string }) {
    "use server";
    // server-only logic lives here
    const result = await CreatePostdb({ content, image });
    return result;
  }

  return <CreatePost user={user} action={createPostAction} />;
}
