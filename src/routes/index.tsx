import { useEffect, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { cn } from "../utils/cn";
import {
  handleExpiredCookie,
  loadTranscription,
  saveWord,
} from "../utils/functions";
import { useLocalStorage } from "usehooks-ts";
import { UserProfile } from "../utils/types";
import {
  Send,
  NotebookPen,
  Search,
  BookmarkPlus,
  ArrowLeftRight,
} from "lucide-react";
import { Button } from "../components/buttons/Button";
import { UserWordDisplay } from "../components/UserWordDisplay";
import { DoubleBorder } from "../components/DoubleBorder";
import Keyboard from "../components/Keyboard";
import { InfoToggle } from "../components/InfoToggle";

export const Route = createFileRoute("/")({
  component: HomeComponent,
});

function HomeComponent() {
  // User data hook
  const [userData = undefined, setValue] = useLocalStorage<
    undefined | UserProfile
  >("user", undefined);

  // Data loading
  const { isPending, error, data, isFetching, refetch } = useQuery({
    queryKey: ["repoData"],
    queryFn: () => loadTranscription(),
    gcTime: 0,
  });

  // State hooks
  const [userWord, setUserWord] = useState("");
  const [transcriptionIndex, setTranscriptionIndex] = useState(0);
  const [revealedTranscription, setRevealedTranscription] = useState(false);
  const [hasShownSolution, setHasShownSolution] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  // UseEffects
  useEffect(() => {
    setUserWord("");
    setRevealedTranscription(false);
    handleExpiredCookie(data, setValue, userData);
    setHasShownSolution(false);
    setIsSaved(data ? data.wordIsInList : false);
    setTranscriptionIndex(0);
  }, [data]);

  // Consts
  const transcriptions = data?.transcriptions;

  // Functions
  function letterClicked(e: React.MouseEvent<Element, MouseEvent>) {
    if (userWord.length >= 70) {
      return;
    }
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
    }
    // If there's at least one match without stress
    else if (
      transcriptions?.filter((tr) => tr.replace("ˈ", "") === userWord)
        ?.length !== 0
    ) {
      toast.success("Just missing the stress!");
    } else {
      toast.error("You've made an error.");
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
    <div className="h-full flex flex-col justify-center relative">
      <div className="flex flex-col gap-4 sm:gap-16">
        <InfoToggle />
        <div className="flex flex-col gap-4 items-center">
          <DoubleBorder className="min-w-[40vw]">
            {isPending || isFetching ? (
              <p className="text-gray-400">Loading...</p>
            ) : (
              <>
                <p>{data.originalWord.toLocaleUpperCase()}</p>
                <div className="flex flex-row gap-8">
                  <p
                    className={cn(
                      "transition duration-500 flex",
                      revealedTranscription ? "blur-none" : "blur"
                    )}
                  >
                    {data.transcriptions[transcriptionIndex]}
                  </p>
                </div>
              </>
            )}
          </DoubleBorder>
          <UserWordDisplay userWord={userWord} />
        </div>
        <div className="flex flex-col items-center gap-4">
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 justify-center sm:flex sm:flex-row sm:justify-between">
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
            <Button
              buttonType="info"
              LucideIcon={ArrowLeftRight}
              disabled={
                !revealedTranscription ||
                !data ||
                data.transcriptions.length === 1
              }
              className="cursor-pointer rounded min-w-0 max-w-fit"
              onClick={() =>
                data
                  ? setTranscriptionIndex(
                      (prev) => (prev + 1) % data.transcriptions.length
                    )
                  : null
              }
            >
              Transcription+
            </Button>
            {userData ? (
              <Button
                className="col-span-2 sm:col-span-1"
                LucideIcon={BookmarkPlus}
                disabled={data?.wordIsInList || isSaved}
                onClick={
                  isPending || isFetching
                    ? () => null
                    : () => {
                        saveWord(data?.originalWord, data?.transcriptions);
                        setIsSaved(true);
                      }
                }
              >
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
