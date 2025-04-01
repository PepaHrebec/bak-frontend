import { createFileRoute, redirect, useNavigate } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { loadUserList } from "../../utils/functions";
import { startTransition, useEffect, useOptimistic, useState } from "react";
import { Button } from "../../components/buttons/Button";
import { Club, Pencil } from "lucide-react";
import { fetcher } from "../../utils/axios";
import toast from "react-hot-toast";
import { UserProfile } from "../../utils/types";
import { useLocalStorage } from "usehooks-ts";
import { ListTranscriptionWrapper } from "../../components/ListTranscriptionWrapper";

export const Route = createFileRoute("/list/")({
  component: RouteComponent,
  beforeLoad: () => {
    const user = localStorage.getItem("user");
    if (user === "undefined") {
      throw redirect({
        to: "/",
      });
    }
  },
});

function RouteComponent() {
  // User data hook
  const [userData = undefined, setValue] = useLocalStorage<
    undefined | UserProfile
  >("user", undefined);

  // Data loading
  const { isPending, error, data, isFetching, refetch } = useQuery({
    queryKey: ["getList"],
    queryFn: () => loadUserList(),
  });

  // Navigation hook
  const navigate = useNavigate({ from: "/list" });

  // State hooks
  const [optimisticState, removeOptimistic] = useOptimistic(
    data,
    // updateFn
    (currentState, optimisticValue: number) => {
      return currentState?.filter((val) => val.id !== optimisticValue);
    }
  );
  const [newWord, setNewWord] = useState("");

  // Functions
  const deleteItem = async (itemId: string) => {
    startTransition(() => {
      removeOptimistic(Number(itemId));
    });

    try {
      await fetcher.delete(`/repeat-list/${itemId}`);
      await refetch();
    } catch (error: any) {
      toast.error(error.response.data.message);
      if (error.response.status === 401) {
        setValue(undefined);
        redirect({
          to: "/",
        });
      }
    }
  };

  const addItem = async () => {
    try {
      await fetcher.post(`/repeat-list/own-word`, {
        word: newWord,
      });
      await refetch();
      setNewWord("");
    } catch (error: any) {
      toast.error(error.response.data.message);
      if (error.response.status === 401) {
        setValue(undefined);
        redirect({
          to: "/",
        });
      }
    }
  };

  if (error || isPending || isFetching || !optimisticState) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col gap-3">
      <div className="max-h-[70vh] h-[70vh] overflow-auto">
        {data.length === 0 ? (
          <div className="max-w-[75vw] h-[70vh] flex justify-center items-center">
            <p className="text-2xl text-gray-400">Space for your list!</p>
          </div>
        ) : null}
        <div className="grid grid-cols-2 sm:grid-cols-4 justify-items-center m-auto gap-1 max-w-[75vw]">
          {optimisticState.map((req) => {
            return (
              <ListTranscriptionWrapper
                key={req.id}
                listId={req.id}
                deleteItem={deleteItem}
                originalWord={req.word}
                transcribedWords={req.transcriptions}
              />
            );
          })}
        </div>
      </div>
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Button
          onClick={() => navigate({ to: "/list/regular" })}
          disabled={data.length === 0}
          LucideIcon={Pencil}
        >
          Regular Exercise
        </Button>
        <Button
          onClick={() => navigate({ to: "/list/inverted" })}
          disabled={data.length === 0}
          LucideIcon={Club}
        >
          Flashcard Exercise
        </Button>
      </div>
      <div className="flex flex-row justify-center gap-4">
        <input
          type="text"
          value={newWord}
          onChange={(e) => setNewWord(e.target.value)}
        />
        <Button onClick={addItem}>Add</Button>
      </div>
    </div>
  );
}
