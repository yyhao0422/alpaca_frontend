import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@clerk/clerk-react";

function SuccessPaymentPage() {
  const { getToken } = useAuth();
  const navigate = useNavigate();
  const [message, setMessage] = useState("Loading subscription data ...");
  useEffect(() => {
    async function getStripeSession() {
      try {
        const token = await getToken();
        const response = await fetch(
          `http://127.0.0.1:3000/api/v1/subscription/get-stripe-session`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const resData = await response.json();
        setMessage(resData.message);
        window.location.href = "/";
      } catch (e) {
        console.error(e);
        setMessage("Failed to get subscription data");
      }
    }
    getStripeSession();
  }, []);
  return <div>{message}</div>;
}

export default SuccessPaymentPage;
