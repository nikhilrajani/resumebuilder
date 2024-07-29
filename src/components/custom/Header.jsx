import React from "react";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";
import { UserButton, useUser } from "@clerk/clerk-react";

const Header = () => {
  const { user, isLoaded, isSignedIn } = useUser();

  return (
    <div className="p-3 px-5 flex justify-between shadow-md">
      <img src="/logo.svg" width={100} height={100} />

      {isSignedIn ? (
        <div className="flex gap-2 items-center">
          <Link to={"/dashboard"}>
            <Button variant="outline">Dashboard</Button>
          </Link>
          <UserButton />
        </div>
      ) : (
        <div>
          <Link to={"/auth/sign-in"}>
            <Button>Get Started</Button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Header;
