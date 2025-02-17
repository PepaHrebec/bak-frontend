import { Link, Outlet, createRootRoute } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import { Toaster } from "react-hot-toast";
import { useUserStore } from "../utils/store";

export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  const { user } = useUserStore();

  return (
    <>
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
          to="/excercises"
          activeProps={{
            className: "font-bold",
          }}
        >
          Excercises
        </Link>
        {user !== undefined ? <div>{user.name}</div> : <div>Log in</div>}
      </div>
      <Outlet />
      <TanStackRouterDevtools position="bottom-right" />
      <Toaster />
    </>
  );
}
