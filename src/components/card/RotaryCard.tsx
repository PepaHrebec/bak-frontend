import { useEffect, useState } from "react";
import { cn } from "../../utils/cn";
import { CardFace } from "./CardFace";

export interface RotaryCardProps extends React.HTMLAttributes<HTMLDivElement> {
  originalWord: string | undefined;
  transcribedWords: string[] | undefined;
  transcriptionIsFront?: boolean;
}

export const RotaryCard = ({
  originalWord,
  transcribedWords,
  transcriptionIsFront = true,
  className,
  ...props
}: RotaryCardProps) => {
  // Clicking the card disables the hover attribute and straight-up applies the rotation
  // transformation which would've been applied through the hover, making sure that
  // the effects don't overlap in a case of a click AND a hover
  const [rotate, setRotate] = useState(true);

  useEffect(() => {
    setRotate(true);
  }, [originalWord]);

  return (
    <div
      {...props}
      className={cn("group h-52 w-52 [perspective:1000px]", className)}
      onClick={() => setRotate((prev) => !prev)}
    >
      <div
        className={cn(
          "relative h-full w-full rounded-md shadow-md transition-all duration-500 [transform-style:preserve-3d]",
          rotate
            ? "group-hover:[transform:rotateY(180deg)]"
            : "[transform:rotateY(180deg)]"
        )}
      >
        {/* Front Face */}
        {transcriptionIsFront ? (
          <>
            <CardFace
              isBack={!transcriptionIsFront}
              words={transcribedWords}
              isTranscription={true}
            />
            <CardFace
              isBack={transcriptionIsFront}
              words={originalWord ? [originalWord] : undefined}
              isTranscription={false}
            />
          </>
        ) : (
          <>
            <CardFace
              isBack={transcriptionIsFront}
              words={originalWord ? [originalWord] : undefined}
              isTranscription={false}
            />
            <CardFace
              isBack={!transcriptionIsFront}
              words={transcribedWords}
              isTranscription={true}
            />
          </>
        )}
        {/* <CardFace isBack={!isTranscriptionFront} words={transcribedWords} /> */}
        {/* Back Face */}
        {/* <CardFace
          isBack={isTranscriptionFront}
          words={originalWord ? [originalWord] : undefined}
        /> */}
      </div>
    </div>
  );
};
