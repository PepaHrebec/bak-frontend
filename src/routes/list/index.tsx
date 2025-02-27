import { createFileRoute, redirect, useNavigate } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { loadUserList } from "../../utils/functions";
import { RotaryCard } from "../../components/card/RotaryCard";
import { useState } from "react";
import { Button } from "../../components/buttons/Button";
import { Club, Pencil, Trash2 } from "lucide-react";
import { fetcher } from "../../utils/axios";
import toast from "react-hot-toast";
import { UserProfile } from "../../utils/types";
import { useLocalStorage } from "usehooks-ts";

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
  const [, setValue] = useLocalStorage<undefined | UserProfile>(
    "user",
    undefined
  );

  // Data loading
  const { isPending, error, data, isFetching, refetch } = useQuery({
    queryKey: ["getList"],
    queryFn: () => loadUserList(),
  });

  // Navigation hook
  const navigate = useNavigate({ from: "/list" });

  // State hooks
  const [searchText, setSearchText] = useState("");

  // Functions
  const deleteItem = async (itemId: string) => {
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

  if (error || isPending || isFetching) {
    return <div>Wait</div>;
  }

  return (
    <div>
      <input
        type="text"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
      />
      <div className="max-h-[70vh] h-[70vh] overflow-auto">
        <div className="grid grid-cols-2 sm:grid-cols-4 justify-items-center m-auto gap-1 max-w-[75vw]">
          {data
            .filter((req) =>
              searchText !== "" ? req.word.includes(searchText) : true
            )
            .map((req) => {
              return (
                <div
                  key={req.id}
                  className="w-full h-20 p-2 rounded-sm bg-gray-200 flex flex-col gap-2 items-center"
                >
                  <RotaryCard
                    key={req.id}
                    transcriptionIsFront={false}
                    originalWord={req.word}
                    transcribedWords={[req.transcription]}
                    className="w-full h-8"
                  />
                  <Button
                    buttonType="reject"
                    className="scale-75"
                    LucideIcon={Trash2}
                    onClick={() => deleteItem(String(req.id))}
                  >
                    Remove
                  </Button>
                </div>
              );
            })}
        </div>
      </div>
      <div className="flex flex-row gap-4 justify-center">
        <Button
          onClick={() => navigate({ to: "/list/regular" })}
          LucideIcon={Pencil}
        >
          Regular Exercise
        </Button>
        <Button
          onClick={() => navigate({ to: "/list/inverted" })}
          LucideIcon={Club}
        >
          Flashcard Exercise
        </Button>
      </div>
    </div>
  );
}
