import { useMutation } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { fetcher } from "../utils/axios";
import { UserProfile } from "../utils/types";
import { useLocalStorage } from "usehooks-ts";

interface UserAuthValues {
  name: string;
  password: string;
}

export const Route = createFileRoute("/sign-in")({
  component: RouteComponent,
});

function RouteComponent() {
  const [, setValue] = useLocalStorage<undefined | UserProfile>(
    "user",
    undefined
  );

  const mutation = useMutation({
    mutationFn: (obj: UserAuthValues) => {
      return fetcher.post<Promise<UserProfile>>("/sign-in", {
        name: obj.name,
        password: obj.password,
      });
    },
  });

  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  async function signIn(user: UserAuthValues) {
    const data = await mutation.mutateAsync({
      name: user.name,
      password: user.password,
    });
    const rtrn = await data.data;

    setValue(rtrn);
  }

  return (
    <div>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="text"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={() => signIn({ name: name, password: password })}>
        Submit
      </button>
    </div>
  );
}
