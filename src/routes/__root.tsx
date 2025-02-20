import { Link, Outlet, createRootRoute } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import { Toaster } from "react-hot-toast";
import { logOut } from "../utils/functions";
import { useLocalStorage } from "usehooks-ts";
import { UserProfile } from "../utils/types";

export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  const [value, setValue] = useLocalStorage<undefined | UserProfile>(
    "user",
    undefined
  );

  return (
    <div className="h-[100vh] max-h-[100vh]">
      <div className="p-2 flex gap-2 text-lg">
        <Link
          to="/"
          activeProps={{
            className: "font-bold",
          }}
          activeOptions={{ exact: true }}
        >
          Home
        </Link>{" "}
        <Link
          to="/about"
          activeProps={{
            className: "font-bold",
          }}
        >
          About
        </Link>
        <Link
          to="/exercises"
          activeProps={{
            className: "font-bold",
          }}
        >
          Exercises
        </Link>
        {value !== undefined ? (
          <div>
            <div>{value.name}</div>
            <button onClick={() => logOut(setValue)}>Log-out</button>
          </div>
        ) : (
          <div>
            <Link
              to="/sign-in"
              activeProps={{
                className: "font-bold",
              }}
            >
              Sign-in
            </Link>
            <Link
              to="/log-in"
              activeProps={{
                className: "font-bold",
              }}
            >
              Log-in
            </Link>
          </div>
        )}
      </div>
      <div className="p-2">
        <Outlet />
      </div>
      <TanStackRouterDevtools position="bottom-right" />
      <Toaster />
    </div>
  );
}
