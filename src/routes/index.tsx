import { useEffect, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import Keyboard from "../components/keyboard";
import toast from "react-hot-toast";
import { cn } from "../utils/cn";
import { handleExpiredCookie, load } from "../utils/functions";
import { fetcher } from "../utils/axios";
import { useLocalStorage } from "usehooks-ts";
import { UserProfile } from "../utils/types";
import { Send, NotebookPen, Search, BookmarkPlus } from "lucide-react";
import { Button } from "../components/buttons/Button";

export const Route = createFileRoute("/")({
  component: HomeComponent,
});

function HomeComponent() {
  // User data hook
  const [userData, setValue] = useLocalStorage<undefined | UserProfile>(
    "user",
    undefined
  );

  // Data loading
  const { isPending, error, data, isFetching, refetch } = useQuery({
    queryKey: ["repoData"],
    queryFn: () => load(),
  });

  // State hooks
  const [userWord, setUserWord] = useState("");
  const [revealedTranscription, setRevealedTranscription] = useState(false);
  const [hasShownSolution, setHasShownSolution] = useState(false);

  // UseEffects
  useEffect(() => {
    setUserWord("");
    setRevealedTranscription(false);
    handleExpiredCookie(data, setValue, userData);
    setHasShownSolution(false);
  }, [data]);

  useEffect(() => {
    console.log(userData);
  }, [userData]);

  // Consts
  const transcriptions = data?.transcriptions;

  // Functions
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
      toast.success("Good job!");
      // If there's at least one match without stress
    } else if (
      transcriptions?.filter((tr) => tr.replace("ˈ", "") === userWord)
        ?.length !== 0
    ) {
      toast("Almost there!");
    } else {
      toast.error("You've made an error.");
    }
  }

  async function saveWord() {
    try {
      await fetcher.post("/repeat-list", {
        word: data?.originalWord,
      });
    } catch (error: any) {
      toast.error(error.response.data.mess);
    }
  }

  function revealTranscription() {
    setRevealedTranscription((prev) => !prev);
    if (!hasShownSolution) {
      setHasShownSolution(true);
    }
  }

  if (error) return "An error has occurred: " + error.message;

  return (
    <div className="h-full flex flex-col justify-center">
      <div className="flex flex-col gap-16">
        {isPending || isFetching ? (
          <div>Loading...</div>
        ) : (
          <div className="flex flex-col gap-4 items-center">
            <div className="border-6 rounded-2xl border-white shadow">
              <div className="flex flex-row justify-around w-[30vw] bg-white p-4 rounded-lg m-2 shadow text-2xl">
                <p>{data.originalWord.toLocaleUpperCase()}</p>
                <p
                  className={cn(
                    "transition duration-500",
                    revealedTranscription ? "blur-none" : "blur"
                  )}
                >
                  {data.transcriptions[0]}
                </p>
              </div>
            </div>
            <div>{userWord.length === 0 ? "Enter" : userWord}</div>
          </div>
        )}
        <div className="flex flex-col items-center gap-4">
          <div className="flex flex-row gap-4">
            <Button onClick={() => refetch()} LucideIcon={Send}>
              New Word
            </Button>
            <Button
              buttonType="info"
              onClick={() => check()}
              disabled={hasShownSolution}
              LucideIcon={NotebookPen}
            >
              Check
            </Button>
            <Button
              buttonType="warning"
              onClick={() => revealTranscription()}
              LucideIcon={Search}
            >
              {revealedTranscription ? "Hide" : "Show"}
            </Button>
            {userData ? (
              <Button LucideIcon={BookmarkPlus} onClick={saveWord}>
                Save To List
              </Button>
            ) : null}
          </div>
          <Keyboard
            clickLetterBtn={letterClicked}
            clickDeleteBtn={deleteLetter}
          />
        </div>
      </div>
    </div>
  );
}
