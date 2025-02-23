import { cn } from "../../utils/cn";
import { LucideIcon } from "lucide-react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  LucideIcon?: LucideIcon;
  buttonType?: "approve" | "reject" | "warning" | "info";
}

export const Button = ({
  disabled,
  children,
  className,
  buttonType = "approve",
  LucideIcon,
  ...props
}: ButtonProps) => {
  return (
    <button
      {...props}
      disabled={disabled}
      className={cn(
        "font-bold text-white bg-green-500 px-3 py-1 rounded-sm hover:rounded-md hover:bg-green-600 active:bg-green-700 shadow-md shadow-green-200 transition-all duration-200 hover:cursor-pointer flex flex-row items-center gap-2 min-w-[6rem]",
        buttonType === "warning"
          ? "bg-amber-400 hover:bg-amber-500 active:bg-amber-600 shadow-md shadow-amber-200"
          : "",
        buttonType === "reject"
          ? "bg-red-400 hover:bg-red-500 active:bg-red-600 shadow-md shadow-red-200"
          : "",
        buttonType === "info"
          ? "bg-blue-400 hover:bg-blue-500 active:bg-blue-600 shadow-md shadow-blue-200"
          : "",
        className,
        disabled
          ? "bg-gray-300 text-gray-500 shadow-none hover:rounded-none hover:bg-gray-300 active:bg-gray-300 hover:cursor-default"
          : ""
      )}
    >
      {LucideIcon ? (
        <LucideIcon
          className={cn(disabled ? "text-gray-500" : "")}
          strokeWidth={3}
          size={12}
        />
      ) : null}
      {children}
    </button>
  );
};
