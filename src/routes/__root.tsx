import { Outlet, createRootRoute } from "@tanstack/react-router";
import { Toaster } from "react-hot-toast";
import { logOut } from "../utils/functions";
import { useLocalStorage } from "usehooks-ts";
import { UserProfile } from "../utils/types";
import { NavLink } from "../components/NavLink";
import { LogOutButton } from "../components/buttons/LogOutButton";

export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  const [value, setValue] = useLocalStorage<undefined | UserProfile>(
    "user",
    undefined
  );

  return (
    <div className="h-[100dvh] max-h-[100dvh] bg-gray-100 flex flex-col items-center">
      <div className=" h-full flex flex-col">
        <div className="border-b-4 border-b-white w-[100vw] flex flex-row justify-center">
          <nav className="flex justify-between text-lg md:text-xl md:w-[80vw]">
            <div className="flex flex-row">
              <NavLink to="/" text="Home" />
              <NavLink to="/inverted" text="Inverted" />
              {value !== undefined ? <NavLink to="/list" text="List" /> : null}
            </div>
            <div className="flex flex-row gap-4">
              {value === undefined ? (
                <>
                  <NavLink to="/sign-in" text="Sign-in" />
                  <NavLink to="/log-in" text="Log-in" />
                </>
              ) : (
                <div className="flex flex-row gap-4">
                  <div className="flex flex-row justify-center items-center">
                    {value.name}
                  </div>
                  <LogOutButton onClick={() => logOut(setValue)}>
                    Log-out
                  </LogOutButton>
                </div>
              )}
            </div>
          </nav>
        </div>
        <div className="flex-1 m-auto w-[80vw] py-2">
          <Outlet />
        </div>
      </div>
      <Toaster />
    </div>
  );
}
