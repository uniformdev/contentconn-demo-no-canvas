import React from "react";
import { useRouter } from "next/router";
import useCookie from "react-use-cookie";
import useLocalStorage from "../lib/useLocalStorage";

const Initializer = () => {
  const router = useRouter();
  const enabled = router.asPath === "/setup";
  const [initialized, setInitialized] = useCookie("initialized", "false");
  const [clientId, setClientId] = useLocalStorage("visitorId", 0);
  React.useEffect(() => {
    if (enabled) {
      setClientId(123);
      setInitialized("true");
    }
  });

  return enabled ? <span>Setup OK.</span> : <span>Not ok!.</span>;
};

export default Initializer;
