import { useState, useEffect } from "react";
import { RouterProvider } from "react-router-dom";
import { useAuth, useSession } from "@clerk/clerk-react";

import LoadingBackdrop from "../utils/LoadingBackdrop";
import { signedInRouter } from "../router/signedInRouter";
import { UserContext } from "../store/UserContext";

function SignedInPage() {
  const { getToken } = useAuth();
  const { session } = useSession();
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
        console.error(error);
      }
      setIsLoading(false);
    }

    if (session.user.publicMetadata.subscriptionId) {
      getStripeSubscription();
    }
  }, [session]);

  console.log(subscriptionDetails);

  return (
    <>
      {isLoading ? (
        <LoadingBackdrop />
      ) : (
        <UserContext.Provider
          value={{
            subscriptionDetails,
            session,
          }}
        >
          <RouterProvider router={signedInRouter} basename="/" />
        </UserContext.Provider>
      )}
    </>
  );
}

export default SignedInPage;
