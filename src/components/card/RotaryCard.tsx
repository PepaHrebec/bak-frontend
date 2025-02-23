import { CardFace } from "./CardFace";

interface RotaryCardProps extends React.HTMLAttributes<HTMLDivElement> {
  originalWord: string | undefined;
  transcribedWords: string[] | undefined;
}

export const RotaryCard = ({
  originalWord,
  transcribedWords,
  ...props
}: RotaryCardProps) => {
  return (
    <div {...props} className="group h-52 w-52 [perspective:1000px]">
      <div className="relative h-full w-full rounded-md shadow-md transition-all duration-500 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
        {/* Front Face */}
        <CardFace words={transcribedWords} />
        {/* Back Face */}
        <CardFace isBack words={originalWord ? [originalWord] : undefined} />
      </div>
    </div>
  );
};
