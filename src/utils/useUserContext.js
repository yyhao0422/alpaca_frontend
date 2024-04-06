import { useContext } from "react";
import { UserContext } from "../store/UserContext";

export const useUserContext = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error(
      "useUserContext must be used within a Subscription Context Provider"
    );
  }
  return context;
};
