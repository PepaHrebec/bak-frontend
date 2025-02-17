import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { load } from "../main";
import { useQuery } from "@tanstack/react-query";
import Keyboard from "../components/keyboard";
import toast from "react-hot-toast";

export const Route = createFileRoute("/")({
  component: HomeComponent,
});

function HomeComponent() {
  const { isPending, error, data, isFetching, refetch } = useQuery({
    queryKey: ["repoData"],
    queryFn: () => load(),
  });

  const [userWord, setUserWord] = useState("");

  if (isPending || isFetching) return "Loading...";

  if (error) return "An error has occurred: " + error.message;

  const transcription = data.transcriptions[0];

  function letterClicked(e: React.MouseEvent<Element, MouseEvent>) {
    const letter = (e.target as HTMLElement).innerText;
    setUserWord((prev) => prev + letter);
  }

  function deleteLetter() {
    if (userWord.length === 0) {
      return;
    }
    setUserWord((prev) => prev.slice(0, prev.length - 1));
  }

  function check() {
    console.log(transcription, userWord);
    if (transcription === userWord) {
      toast.success("Good");
    } else if (transcription.replace("ˈ", "") === userWord) {
      toast("Almost there!");
    } else {
      console.log("Hi");
      toast.error("Bad");
    }
  }

  return (
    <div className="p-2">
      <h3>Welcome {data.originalWord}!</h3>
      <h2>{userWord}</h2>
      <div>{data.transcriptions[0]}</div>
      <button onClick={() => refetch()}>Refetch</button>
      <button onClick={() => check()}>Check</button>
      <Keyboard clickLetterBtn={letterClicked} clickDeleteBtn={deleteLetter} />
    </div>
  );
}
