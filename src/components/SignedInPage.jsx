import { useState, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useAuth, useSession } from "@clerk/clerk-react";

import TopNavigationBar from "./NavigationBar/TopNavigationBar";
import DesktopWrapper from "./Wrapper/DesktopWrapper";
import AnonymousNavigationBar from "./NavigationBar/AnonymousNavigationBar";
import LoadingBackdrop from "../utils/LoadingBackdrop";
import { UserContext } from "../store/UserContext";

// This component is a wrapper for providing the subscription details and session to the children components

function SignedInPage() {
  const { getToken } = useAuth();
  const { session } = useSession();
  const navigate = useNavigate();
  const [subscriptionDetails, setSubscriptionDetails] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  // Get subscription details from the server
  useEffect(() => {
    async function getStripeSubscription() {
      setIsLoading(true);
      const token = await getToken();

      try {
        const response = await fetch(
          "http://127.0.0.1:3000/api/v1/subscription/get-subscription-details",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const resData = await response.json();

        setSubscriptionDetails(resData.data.subscription);
      } catch (error) {
        console.log(error);
      }
      setIsLoading(false);
    }
    if (session) {
      if (session.user.publicMetadata.subscriptionId) {
        getStripeSubscription();
      } else {
        // Redirect to the unsubscribed page if the user has no subscriptionId
        navigate("/unsubscribed");
      }
    }
  }, [session]);

  useEffect(() => {
    // Redirect to the subscribed page if the user is subscribed
    if (subscriptionDetails?.status === "active") {
      navigate("/subscribed");
    }
    // Redirect to the unsubscribed page if the user is canceled
    if (subscriptionDetails?.status === "canceled") {
      navigate("/unsubscribed");
    }
  }, [subscriptionDetails]);

  return (
    <>
      {isLoading ? (
        <LoadingBackdrop />
      ) : (
        <UserContext.Provider
          value={{
            subscriptionDetails,
            session,
            isSubscribed: subscriptionDetails?.status === "active",
          }}
        >
          <DesktopWrapper />
          {subscriptionDetails?.status === "active" ? (
            <TopNavigationBar />
          ) : (
            <AnonymousNavigationBar />
          )}
          <Outlet />
        </UserContext.Provider>
      )}
    </>
  );
}

export default SignedInPage;
