import { NavLink } from "react-router-dom";
import { useAuth, useUser } from "@clerk/clerk-react";

import { useSessionContext } from "../../utils/useSessionContext";

import {
  SignedIn,
  SignedOut,
  UserButton,
  SignInButton,
} from "@clerk/clerk-react";

import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";

import alpacaLogo from "../../assets/alpacaLogo.png";
import { Button } from "@mui/material";

function TopNavigationBar() {
  const sessionCtx = useSessionContext();
  const { getToken } = useAuth();
  const { isSignedIn } = useUser();

  async function handleSubscribe() {
    try {
      const token = await getToken();
      const response = await fetch(
        `http://127.0.0.1:3000/api/v1/subscription/create-checkout-session`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const resData = await response.json();

      window.location = resData.url;
    } catch (e) {
      console.error(e);
    }
  }

  const isAdmin = sessionCtx.session?.user.publicMetadata.admin ? true : false;

  return (
    <div className="w-screen position sticky bg-white  ">
      <div className="flex justify-between mx-48 pt-3">
        <div className="flex justify-center">
          <img className="w-10 mx-2" src={alpacaLogo} alt="alpaca logo" />
          <h1 className="center text-xl leading-9">现代价值投资课</h1>
        </div>
        <div className="flex justify-center">
          <Button
            className="mr-10"
            onClick={handleSubscribe}
            variant="outlined"
          >
            Subscribe
          </Button>
          <i className="mx-3 cursor-pointer translate-y-1">
            <ChatBubbleOutlineOutlinedIcon sx={{ color: " #7A5858" }} />
          </i>
          <i className="mx-3 flex justify-center px-5 rounded-lg">
            <SignedIn>
              <UserButton />
            </SignedIn>
            <SignedOut>
              <SignInButton className="cursor-pointer px-5 rounded-lg border border-gray-400 text-gray-600 hover:border-black hover:text-black" />
            </SignedOut>
          </i>
        </div>
      </div>
      {/* Navigation Page */}
      <div className="flex mx-48 pt-3 ">
        <SignedIn>
          <NavLink
            to="/"
            className={({ isActive, isPending }) =>
              isPending
                ? "m-2 mb-4"
                : isActive
                ? "m-2 mb-4 underline underline-offset-[10px]"
                : "m-2 mb-4"
            }
          >
            Community
          </NavLink>
          <NavLink
            to="/classroom"
            className={({ isActive, isPending }) =>
              isPending
                ? "m-2 mb-4"
                : isActive
                ? "m-2 mb-4 underline underline-offset-[10px]"
                : "m-2 mb-4"
            }
          >
            Classroom
          </NavLink>
        </SignedIn>
        <NavLink
          to={isSignedIn ? "/about" : "/"}
          className={({ isActive, isPending }) =>
            isPending
              ? "m-2 mb-4"
              : isActive
              ? "m-2 mb-4 underline underline-offset-[10px]"
              : "m-2 mb-4"
          }
        >
          About
        </NavLink>
        {isAdmin && (
          <NavLink
            to="/instructor"
            className={({ isActive, isPending }) =>
              isPending
                ? "m-2 mb-4"
                : isActive
                ? "m-2 mb-4 underline underline-offset-[10px]"
                : "m-2 mb-4"
            }
          >
            Instructor
          </NavLink>
        )}
      </div>
    </div>
  );
}

export default TopNavigationBar;
