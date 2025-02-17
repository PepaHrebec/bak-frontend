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
        {user !== undefined ? <div>{user.name}</div> : <div>Log in</div>}
      </div>
      <div className="p-2">
        <Outlet />
      </div>
      <TanStackRouterDevtools position="bottom-right" />
      <Toaster />
    </div>
  );
}
