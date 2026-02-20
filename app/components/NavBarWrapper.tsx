import { auth } from "@clerk/nextjs/server";
import { syncUser } from "../actions/user.action";
import { NavBar } from "../components/NavBar";

export default async function NavBarWrapper() {
  const { userId } = await auth();

  if (userId) {
    await syncUser();
  }

  return <NavBar />;
}
