import { useQuery } from "@tanstack/react-query";
import { createFileRoute, redirect, useNavigate } from "@tanstack/react-router";
import {
  NotebookPen,
  Search,
  ArrowBigRight,
  House,
  Trash2,
  ArrowLeftRight,
} from "lucide-react";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { Button } from "../../components/buttons/Button";
import { DoubleBorder } from "../../components/DoubleBorder";
import { UserWordDisplay } from "../../components/UserWordDisplay";
import { cn } from "../../utils/cn";
import { loadUserList, deleteFromList } from "../../utils/functions";
import { UserListRequest, UserProfile } from "../../utils/types";
import Keyboard from "../../components/Keyboard";
import { AxiosError } from "axios";
import { useLocalStorage } from "usehooks-ts";

export const Route = createFileRoute("/list/regular")({
  component: HomeComponent,
  beforeLoad: () => {
    const user = localStorage.getItem("user");
    if (user === "undefined") {
      throw redirect({
        to: "/",
      });
    }
  },
});

function HomeComponent() {
  // User data hook
  const [userData = undefined, setValue] = useLocalStorage<
    undefined | UserProfile
  >("user", undefined);

  // Data loading
  const { isPending, error, data, isFetching } = useQuery({
    queryKey: ["getList"],
    queryFn: () => loadUserList(),
  });

  // Navigation hook
  const navigate = useNavigate({ from: "/list/inverted" });

  // State hooks
  const [userWord, setUserWord] = useState("");
  const [revealedTranscription, setRevealedTranscription] = useState(false);
  const [hasShownSolution, setHasShownSolution] = useState(false);
  const [transcriptionIndex, setTranscriptionIndex] = useState(0);
  const [randomizedDataArray, setRandomizedDataArray] = useState<
    UserListRequest[] | undefined
  >(undefined);
  const [dataIndex, setDataIndex] = useState(0);

  // UseEffects
  useEffect(() => {
    setRandomizedDataArray(data?.sort(() => 0.5 - Math.random()));
  }, [data]);

  useEffect(() => {
    setUserWord("");
    setRevealedTranscription(false);
    setHasShownSolution(false);
    setTranscriptionIndex(0);
  }, [dataIndex]);

  // Functions
  function letterClicked(e: React.MouseEvent<Element, MouseEvent>) {
    if (userWord.length >= 75) {
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
    if (randomizedDataArray === undefined) {
      return;
    }
    // If there's at least one exact match
    if (
      randomizedDataArray[dataIndex].transcriptions?.filter(
        (tr) => tr === userWord
      )?.length !== 0
    ) {
      toast.success("Good job!");
    }
    // If there's at least one match without stress
    else if (
      randomizedDataArray[dataIndex].transcriptions?.filter(
        (tr) => tr.replace("ˈ", "") === userWord
      )?.length !== 0
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

  if (randomizedDataArray === undefined) {
    return <div>Loading...</div>;
  }

  // Const
  const currentItem = randomizedDataArray[dataIndex];

  if (error && (error as AxiosError).status === 401) {
    setValue(undefined);
    navigate({
      to: "/",
    });
  }

  if (error) return "An error has occurred: " + error.message;

  return (
    <div className="h-full flex flex-col justify-center">
      <div className="flex flex-col gap-4 sm:gap-16">
        <div className="flex flex-col gap-4 items-center">
          <div className=" m-auto flex flex-row gap-1 bg-white p-2 rounded-md w-fit text-md text-gray-400">
            {dataIndex + 1}/{randomizedDataArray.length}
          </div>
          <DoubleBorder className="min-w-[40vw]">
            {isPending || isFetching || randomizedDataArray === undefined ? (
              <p className="text-gray-400">Loading...</p>
            ) : (
              <>
                <p>{currentItem.word.toLocaleUpperCase()}</p>
                <p
                  className={cn(
                    "transition duration-500",
                    revealedTranscription ? "blur-none" : "blur"
                  )}
                >
                  {currentItem.transcriptions[transcriptionIndex]}
                </p>
              </>
            )}
          </DoubleBorder>
          <UserWordDisplay userWord={userWord} />
        </div>
        <div className="flex flex-col items-center gap-4">
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            {randomizedDataArray &&
            dataIndex < randomizedDataArray.length - 1 ? (
              <Button
                LucideIcon={ArrowBigRight}
                onClick={() => setDataIndex((prev) => prev + 1)}
              >
                Next Word
              </Button>
            ) : (
              <Button
                LucideIcon={House}
                buttonType="info"
                onClick={() =>
                  navigate({
                    to: "/list",
                  })
                }
              >
                Return
              </Button>
            )}
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
              buttonType="reject"
              LucideIcon={Trash2}
              onClick={() => {
                deleteFromList(String(currentItem.id));
                dataIndex < randomizedDataArray.length - 1
                  ? setDataIndex((prev) => prev + 1)
                  : navigate({
                      to: "/list",
                    });
              }}
            >
              Remove
            </Button>
            <Button
              buttonType="info"
              LucideIcon={ArrowLeftRight}
              disabled={
                !revealedTranscription ||
                randomizedDataArray[dataIndex].transcriptions.length === 1
              }
              className="cursor-pointer rounded min-w-0 max-w-fit"
              onClick={() =>
                data
                  ? setTranscriptionIndex(
                      (prev) =>
                        (prev + 1) %
                        randomizedDataArray[dataIndex].transcriptions.length
                    )
                  : null
              }
            >
              Transcription+
            </Button>
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
