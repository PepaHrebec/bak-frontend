import { useEffect, useState } from "react";
import { cn } from "../utils/cn";

interface UserWordDisplay {
  userWord: string;
}

export const UserWordDisplay = ({ userWord }: UserWordDisplay) => {
  const [hit, setHit] = useState(false);

  useEffect(() => {
    let timeout = 0;
    if (!hit) {
      setHit(true);
      timeout = setTimeout(() => {
        setHit(false);
      }, 100);
    }
    return () => clearTimeout(timeout);
  }, [userWord]);

  return (
    <div
      className={cn(
        hit ? "scale-110" : "",
        "flex flex-row gap-1 bg-white p-2 rounded-md w-fit transition duration-100 text-xl"
      )}
    >
      <div className="text-gray-400">/</div>
      <p className={cn(userWord.length === 0 ? "text-gray-400" : "text-black")}>
        {userWord.length !== 0 ? userWord : "ˈempti"}
      </p>
      <div className="text-gray-400">/</div>
    </div>
  );
};
