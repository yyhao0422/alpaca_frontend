import { useEffect, useState } from "react";
import { useSessionContext } from "../../utils/useSessionContext";

function Community() {
  const sessionCtx = useSessionContext();

  const [message, setMessage] = useState("Loading ...");

  useEffect(() => {
    if (
      sessionCtx.session?.user.publicMetadata?.paid_sub &&
      sessionCtx.session?.user.publicMetadata?.paid_sub === "true"
    ) {
      setMessage(`You are subscribed`);
    } else {
      setMessage(`You are not subscribed`);
    }
  }, []);

  return <div>{message}</div>;
}

export default Community;
