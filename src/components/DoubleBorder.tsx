import { cn } from "../utils/cn";

interface DoubleBorderProps extends React.HTMLAttributes<HTMLDivElement> {}

export const DoubleBorder = ({ children, className }: DoubleBorderProps) => {
  return (
    <div className="border-6 rounded-2xl border-white shadow">
      <div
        className={cn(
          "flex flex-row justify-around bg-white p-4 rounded-lg m-2 shadow text-2xl gap-6",
          className
        )}
      >
        {children}
      </div>
    </div>
  );
};
