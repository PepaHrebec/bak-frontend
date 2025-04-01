import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { useLocalStorage } from "usehooks-ts";
import {
  handleExpiredCookie,
  loadTranscription,
  saveWord,
} from "../utils/functions";
import { UserProfile } from "../utils/types";
import { useEffect, useState } from "react";
import { RotaryCard } from "../components/card/RotaryCard";
import { Button } from "../components/buttons/Button";
import { Send, BookmarkPlus } from "lucide-react";
import { DoubleBorder } from "../components/DoubleBorder";

export const Route = createFileRoute("/inverted")({
  component: RouteComponent,
});

function RouteComponent() {
  // User data hook
  const [userData = undefined, setValue] = useLocalStorage<
    undefined | UserProfile
  >("user", undefined);

  // States
  const [isSaved, setIsSaved] = useState(false);

  // Data loading
  const { isPending, error, data, isFetching, refetch } = useQuery({
    queryKey: ["repoData"],
    queryFn: () => loadTranscription(),
  });

  // UseEffects
  useEffect(() => {
    handleExpiredCookie(data, setValue, userData);
    setIsSaved(false);
  }, [data]);

  if (error) return "An error has occurred: " + error.message;

  return (
    <div className="flex flex-col h-full justify-around items-center">
      <DoubleBorder className="bg-gray-100 shadow-none p-0">
        <RotaryCard
          originalWord={
            isFetching || isPending ? undefined : data?.originalWord
          }
          transcribedWords={
            isFetching || isPending ? undefined : data?.transcriptions
          }
        />
      </DoubleBorder>
      <div className="flex flex-row gap-4">
        <Button LucideIcon={Send} onClick={() => refetch()}>
          New Word
        </Button>
        {userData ? (
          <Button
            disabled={data?.wordIsInList || isSaved}
            LucideIcon={BookmarkPlus}
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
    </div>
  );
}
