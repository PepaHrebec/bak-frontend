import { Info } from "lucide-react";
import { cn } from "../utils/cn";
import { Button } from "./buttons/Button";
import { useState } from "react";

export const InfoToggle = () => {
  const [showInfo, setShowInfo] = useState(false);

  return (
    <div className="absolute left-[0] sm:max-w-[30vw] top-0 flex flex-row items-start gap-2">
      <Button
        buttonType="info"
        LucideIcon={Info}
        onClick={() => setShowInfo((prev) => !prev)}
      >
        Info
      </Button>
      <div
        className={cn(
          "bg-white shadow rounded-md p-2 transition-opacity duration-300 text-gray-500",
          showInfo ? "opacity-100" : "opacity-0"
        )}
      >
        This app uses RP(SSB) transcriptions sourced from the Cambridge
        Dictionary.
      </div>
    </div>
  );
};
