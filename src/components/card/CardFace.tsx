import { cn } from "../../utils/cn";

interface CardFaceProps {
  words: string[] | undefined;
  isTranscription: boolean;
  isBack?: boolean;
}

export const CardFace = ({
  isBack = false,
  words,
  isTranscription,
}: CardFaceProps) => {
  return (
    <div
      className={cn(
        "absolute inset-0 h-full w-full rounded-md [backface-visibility:hidden] bg-white p-2 flex flex-col items-center justify-center transition duration-500",
        isBack ? "[transform:rotateY(180deg)]" : ""
      )}
    >
      {words ? null : <p className="text-gray-400">Loading...</p>}
      {words?.map((word) => {
        return (
          <div key={word} className="flex flex-row">
            {isTranscription ? <p className="text-gray-400">/</p> : null}
            <p>{word}</p>
            {isTranscription ? <p className="text-gray-400">/</p> : null}
          </div>
        );
      })}
    </div>
  );
};
