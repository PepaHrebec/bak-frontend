import { useQuery } from "@tanstack/react-query";
import { createFileRoute, redirect, useNavigate } from "@tanstack/react-router";
import { House, ArrowBigRight, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "../../components/buttons/Button";
import { RotaryCard } from "../../components/card/RotaryCard";
import { DoubleBorder } from "../../components/DoubleBorder";
import { deleteFromList, loadUserList } from "../../utils/functions";
import { UserListRequest, UserProfile } from "../../utils/types";
import { AxiosError } from "axios";
import { useLocalStorage } from "usehooks-ts";

export const Route = createFileRoute("/list/inverted")({
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
  const { isPending, error, data, isFetching } = useQuery({
    queryKey: ["getList"],
    queryFn: () => loadUserList(),
  });

  // Navigation hook
  const navigate = useNavigate({ from: "/list/inverted" });

  // States
  const [randomizedDataArray, setRandomizedDataArray] = useState<
    UserListRequest[] | undefined
  >(undefined);
  const [dataIndex, setDataIndex] = useState(0);

  // UseEffects
  useEffect(() => {
    setRandomizedDataArray(data?.sort(() => 0.5 - Math.random()));
  }, [data]);

  if ((error as AxiosError).status === 401) {
    setValue(undefined);
    navigate({
      to: "/",
    });
  }

  if (error) return "An error has occurred: " + error.message;

  if (randomizedDataArray === undefined) {
    return <div>uhh</div>;
  }

  // Const
  const currentItem = randomizedDataArray[dataIndex];

  return (
    <div className="flex flex-col h-full justify-around items-center">
      <DoubleBorder className="bg-gray-100 shadow-none p-0">
        <RotaryCard
          originalWord={isFetching || isPending ? undefined : currentItem.word}
          transcribedWords={
            isFetching || isPending ? undefined : [currentItem.transcription]
          }
        />
      </DoubleBorder>
      <div className="flex flex-row gap-1 bg-white p-2 rounded-md w-fit text-md text-gray-400">
        {dataIndex + 1}/{randomizedDataArray.length}
      </div>
      <div className="flex flex-row gap-4">
        {dataIndex < randomizedDataArray.length - 1 ? (
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
          Remove From List
        </Button>
      </div>
    </div>
  );
}
