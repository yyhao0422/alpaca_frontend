import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import { Link } from "react-router-dom";

import alpacaLogo from "../../assets/alpacaLogo.png";

function TopNavigationBar() {
  return (
    <div className="w-screen position sticky bg-white  ">
      <div className="flex justify-between mx-48 pt-3">
        <div className="flex justify-center">
          <img className="w-10 mx-2" src={alpacaLogo} alt="alpaca logo" />
          <h1 className="center text-xl leading-9">现代价值投资课</h1>
        </div>
        <div className="flex justify-center">
          <i className="mx-3 cursor-pointer translate-y-1">
            <ChatBubbleOutlineOutlinedIcon sx={{ color: " #7A5858" }} />
          </i>
          <i className="mx-3">
            <AccountCircleOutlinedIcon />
          </i>
        </div>
      </div>
      {/* Navigation Page */}
      <div className="flex mx-48 pt-3 ">
        <a className="m-2 mb-4">Community</a>
        <a className="m-2 mb-4">Classroom</a>
        <a className="m-2 mb-4">About</a>
      </div>
    </div>
  );
}

export default TopNavigationBar;
