import { useMutation } from "@tanstack/react-query";
import { createFileRoute, redirect, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { fetcher } from "../utils/axios";
import { UserAuthValues, UserProfile } from "../utils/types";
import { useLocalStorage } from "usehooks-ts";
import { Button } from "../components/buttons/Button";
import axios from "axios";
import toast from "react-hot-toast";

export const Route = createFileRoute("/sign-in")({
  component: RouteComponent,
  beforeLoad: () => {
    const user = localStorage.getItem("user");
    console.log(user);
    console.log(typeof user);
    if (user !== "undefined") {
      throw redirect({
        to: "/",
      });
    }
  },
});

function RouteComponent() {
  // Local storage hook
  const [, setValue] = useLocalStorage<undefined | UserProfile>(
    "user",
    undefined
  );

  // Navigation hook
  const navigate = useNavigate({ from: "/list" });

  // Mutation hook
  const mutation = useMutation({
    mutationFn: (obj: UserAuthValues) => {
      return fetcher.post<Promise<UserProfile>>("/sign-in", {
        name: obj.name,
        password: obj.password,
      });
    },
  });

  // States
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  // Functions
  async function signIn(user: UserAuthValues) {
    try {
      const data = await mutation.mutateAsync({
        name: user.name,
        password: user.password,
      });
      const rtrn = await data.data;

      setValue(rtrn);

      navigate({ to: "/" });
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data.message);
      }
    }
  }

  return (
    <div className="items-center h-full flex flex-col justify-center">
      <div className="bg-white sm:w-[40vw] shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div className="mb-4">
          <p className="block text-gray-700 text-sm font-bold mb-2">Username</p>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={name}
            onChange={(e) => setName(e.target.value)}
            type="text"
            placeholder="Username"
          />
        </div>
        <div className="mb-6">
          <p className="block text-gray-700 text-sm font-bold mb-2">Password</p>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="******************"
          />
        </div>
        <div className="flex items-center justify-between">
          <Button
            onClick={() => signIn({ name: name, password: password })}
            buttonType="info"
          >
            Sign-in
          </Button>
        </div>
      </div>
    </div>
  );
}
