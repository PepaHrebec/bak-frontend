import { useEffect, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { load } from "../main";
import { useQuery } from "@tanstack/react-query";
import Keyboard from "../components/keyboard";
import toast from "react-hot-toast";
import { cn } from "../utils/cn";

export const Route = createFileRoute("/")({
  component: HomeComponent,
});

function HomeComponent() {
  const { isPending, error, data, isFetching, refetch } = useQuery({
    queryKey: ["repoData"],
    queryFn: () => load(),
  });

  const [userWord, setUserWord] = useState("");
  const [revealTranscription, setRevealTranscription] = useState(false);

  useEffect(() => {
    setUserWord("");
    setRevealTranscription(false);
  }, [data]);

  const isLoading = isPending || isFetching;

  if (error) return "An error has occurred: " + error.message;

  const transcriptions = data?.transcriptions;

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
    // If there's at least one exact match
    if (transcriptions?.filter((tr) => tr === userWord)?.length !== 0) {
      toast.success("Good");
      // If there's at least one match without stress
    } else if (
      transcriptions?.filter((tr) => tr.replace("ˈ", "") === userWord)
        ?.length !== 0
    ) {
      toast("Almost there!");
    } else {
      toast.error("Bad");
    }
  }

  return (
    <div className="flex flex-col">
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <div>
          <h3 className={cn(revealTranscription ? "blur-none" : "blur-xs")}>
            {data.originalWord}
          </h3>
          <h2>{userWord}</h2>
          <div>{data.transcriptions[0]}</div>
          <button onClick={() => refetch}>Refetch</button>
          <button onClick={check}>Check</button>
          <button onClick={() => setRevealTranscription((prev) => !prev)}>
            Reveal
          </button>
        </div>
      )}

      <Keyboard clickLetterBtn={letterClicked} clickDeleteBtn={deleteLetter} />
    </div>
  );
}
