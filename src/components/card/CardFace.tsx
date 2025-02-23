import { cn } from "../../utils/cn";

interface CardFaceProps {
  words: string[] | undefined;
  isBack?: boolean;
}

export const CardFace = ({ isBack = false, words }: CardFaceProps) => {
  return (
    <div
      className={cn(
        isBack ? "[transform:rotateY(180deg)]" : "",
        "absolute inset-0 h-full w-full rounded-md [backface-visibility:hidden] bg-white p-2 flex flex-col items-center justify-center"
      )}
    >
      {words ? null : <p className="text-gray-400">Loading...</p>}
      {words?.map((word) => {
        return (
          <div key={word} className="flex flex-row">
            {isBack ? null : <p className="text-gray-400">/</p>}
            <p>{word}</p>
            {isBack ? null : <p className="text-gray-400">/</p>}
          </div>
        );
      })}
    </div>
  );
};
