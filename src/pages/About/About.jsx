import { useAuth, useUser, SignInButton } from "@clerk/clerk-react";

import { Button, Card, Typography } from "@mui/material";
import Divider from "@mui/material/Divider";

import AlpacaImage from "../../assets/alpaca.png";

function About() {
  const { getToken } = useAuth();
  const { isSignedIn } = useUser();

  // Check if the user is subscribed
  // Not show the subscribe button if the user is already subscribed
  const isSubscribed = window.location.pathname.split("/")[1] === "subscribed";

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
  return (
    <div className="flex flex-col mx-48">
      <Card sx={{ marginTop: "40px", padding: "30px" }}>
        <Typography
          variant="h5"
          sx={{ fontWeight: "bold", marginBottom: "20px" }}
        >
          现代价值投资课
        </Typography>
        <div className="flex gap-10">
          <img src={AlpacaImage} className="w-1/2" />
          <div className="flex flex-col justify-between w-1/2">
            <div className="flex justify-around border p-3 rounded-2xl border-solid gap-5">
              <p>Member</p>
              <Divider orientation="vertical" flexItem />
              <p>Active</p>
            </div>
            {!isSubscribed && (
              <div className="w-full flex items-center justify-center">
                {isSignedIn ? (
                  <Button variant="outlined" onClick={handleSubscribe}>
                    Subscribe Now
                  </Button>
                ) : (
                  <Button variant="outlined">
                    <SignInButton>Sign In To Subscribe</SignInButton>
                  </Button>
                )}
              </div>
            )}
          </div>
        </div>
        <div className="my-10">
          <Typography variant="subtitle1">
            全網最簡單易懂的價值投課，透過成長股投資打造財富自由的基礎！
          </Typography>
        </div>
      </Card>
    </div>
  );
}

export default About;
