

import Link from "next/link";
import {
  SignedIn,
  SignedOut,
  SignUpButton,
  UserButton,
  SignInButton,
} from "@clerk/nextjs";
import { AnimatedThemeToggler } from "@/components/ui/animated-theme-toggler";
import { MenuIcon } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import NavBarWrapper from "./NavBarWrapper";

export const NavBar = () => {
  NavBarWrapper();

  return (
    <>
      <div className="hidden md:flex justify-between h-16 w-full p-4 bg-background border-b border-border mx-auto max-w-3xl md:max-w-5xl lg:max-w-7xl">
        <div className="flex items-center">
          <span className="text-foreground font-semibold text-lg">Tweet</span>
        </div>
        <div className="flex items-center gap-4">
          <Link
            href="/"
            className="text-foreground hover:text-primary transition-colors"
          >
            Home
          </Link>
          <Link
            href="/profile"
            className="text-foreground hover:text-primary transition-colors"
          >
            Profile
          </Link>
          <AnimatedThemeToggler
            className="p-2 rounded-md hover:bg-accent text-foreground"
            duration={600}
          />
          <SignedOut>
            <SignInButton mode="modal">
              <button className="text-foreground hover:text-primary transition-colors">
                Sign In
              </button>
            </SignInButton>
            <SignUpButton mode="modal">
              <button className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-md px-4 py-2 transition-colors">
                Sign Up
              </button>
            </SignUpButton>
          </SignedOut>
          <SignedIn>
            <div className="z-50 relative">
              <UserButton />
            </div>
          </SignedIn>
        </div>
      </div>
      <div className="md:hidden flex items-center justify-between p-4 max-w-3xl mx-auto">
        <span className="text-foreground font-semibold text-lg">Tweet</span>
        <Sheet>
          <SheetTrigger asChild>
            <MenuIcon className="cursor-pointer" />
          </SheetTrigger>
          <SheetContent>
            <div className="flex flex-col gap-4 p-4">
              <Link
                href="/"
                className="text-foreground hover:text-primary transition-colors"
              >
                Home
              </Link>
              <Link
                href="/profile"
                className="text-foreground hover:text-primary transition-colors"
              >
                Profile
              </Link>
              <AnimatedThemeToggler
                className="p-2 rounded-md hover:bg-accent text-foreground w-8"
                duration={600}
              />
              <SignedOut>
                <SignInButton mode="modal">
                  <button className="text-foreground hover:text-primary transition-colors">
                    Sign In
                  </button>
                </SignInButton>
                <SignUpButton mode="modal">
                  <button className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-md px-4 py-2 transition-colors">
                    Sign Up
                  </button>
                </SignUpButton>
              </SignedOut>
              <SignedIn>
                <div className="z-50 relative">
                  <UserButton />
                </div>
              </SignedIn>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </>
  );
};
