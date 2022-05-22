import { useRouter } from "next/router";
import useLocalStorage from "../lib/useLocalStorage";
//import useCookie from "react-use-cookie";

const FollowLarsButton = () => {
  const [clientId, setClientId] = useLocalStorage("visitorId", 0);
  const router = useRouter();
  const enabled = router.asPath === "/live";
  //const [initialized, setInitialized] = useCookie("initialized", "false");

  return typeof window === "undefined" ? null : enabled ? (
    <button
      type="button"
      onClick={() => {
        clientId !== 123 ? setClientId(123) : setClientId(0);
        window.location.reload();
      }}
      style={{ position: "fixed", bottom: "1.15rem", left: "1.15rem" }}
      className={
        clientId === 123
          ? "bg-red-700 text-white focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center"
          : "text-red-700 border border-red-700 hover:bg-red-700 hover:text-white focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:focus:ring-red-800"
      }
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
        />
      </svg>
    </button>
  ) : null;
};

export default FollowLarsButton;
