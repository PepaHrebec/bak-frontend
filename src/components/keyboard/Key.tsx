import { cn } from "../../utils/cn";

export interface KeyProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  value: string;
  keyType?: "normal" | "delete";
}

export function Key({
  value,
  keyType = "normal",
  className,
  ...props
}: Readonly<KeyProps>) {
  return (
    <button
      {...props}
      className={cn(
        className,
        keyType === "delete"
          ? "text-white bg-red-400 border-red-500 hover:bg-red-500 shadow-outer-red"
          : " text-gray-900 bg-white hover:bg-gray-50 border-gray-200 shadow-outer",
        "px-3 py-2 sm:text-lg font-semibold border rounded-lg m-1 transition duration-75  active:shadow-xs active:translate-y-[4px] cursor-pointer"
      )}
    >
      {value}
    </button>
  );
}
