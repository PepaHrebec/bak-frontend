import { Trash2, ArrowLeftRight } from "lucide-react";
import { Button } from "./buttons/Button";
import { RotaryCard, RotaryCardProps } from "./card/RotaryCard";
import { useState } from "react";

interface ListTranscriptionWrapperProps extends RotaryCardProps {
  deleteItem: (itemId: string) => Promise<void>;
  listId: number;
}

export const ListTranscriptionWrapper = (
  props: ListTranscriptionWrapperProps
) => {
  const { listId, originalWord, transcribedWords, deleteItem } = props;

  const [transcriptionIndex, setTranscriptionIndex] = useState(0);

  if (transcribedWords === undefined) {
    return <div></div>;
  }

  return (
    <div
      key={listId}
      className="w-full h-20 p-2 rounded-sm bg-gray-200 flex flex-col gap-2 items-center"
    >
      <RotaryCard
        transcriptionIsFront={false}
        originalWord={originalWord}
        transcribedWords={[transcribedWords[transcriptionIndex]]}
        className="w-full h-8"
      />
      <div className="flex flex-row">
        <Button
          buttonType="reject"
          className="scale-75"
          LucideIcon={Trash2}
          onClick={() => deleteItem(String(listId))}
        >
          Remove
        </Button>
        <Button
          buttonType="info"
          title="Swap Transcriptions"
          disabled={transcribedWords.length === 1}
          className="scale-75 min-w-0 max-w-fit"
          onClick={() =>
            setTranscriptionIndex(
              (prev) => (prev + 1) % transcribedWords.length
            )
          }
        >
          <ArrowLeftRight />
        </Button>
      </div>
    </div>
  );
};
