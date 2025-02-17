import * as React from "react";
import { createFileRoute } from "@tanstack/react-router";
import { load } from "../main";
import { useQuery } from "@tanstack/react-query";
import Keyboard from "../components/keyboard";

export const Route = createFileRoute("/")({
  component: HomeComponent,
});

function HomeComponent() {
  const { isPending, error, data, refetch } = useQuery({
    queryKey: ["repoData"],
    queryFn: () => load(),
  });

  if (isPending) return "Loading...";

  if (error) return "An error has occurred: " + error.message;

  return (
    <div className="p-2">
      <h3>Welcome {data.word}!</h3>
      <div>{data.english}</div>
      <button onClick={() => refetch()}>Refetch</button>
      <Keyboard
        clickLetterBtn={(e) => console.log((e.target as HTMLElement).innerText)}
        clickDeleteBtn={() => console.log("Del")}
      />
    </div>
  );
}
