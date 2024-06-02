import {
  SignedIn,
  SignedOut,
  UserButton,
  SignInButton,
} from "@clerk/clerk-react";
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import alpacaLogo from "../../../assets/alpacaLogo.png";

function TopBar() {
  return (
    <div className="flex justify-between mx-48 py-3">
      <div className="flex justify-center">
        <img className="w-10 mx-2" src={alpacaLogo} alt="alpaca logo" />
        <h1 className="center text-xl leading-9">现代价值投资课</h1>
      </div>
      <div className="flex justify-center">
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
  );
}

export default TopBar;
