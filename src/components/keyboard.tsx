import { memo } from "react";
import { cn } from "../utils/cn";

interface KeyboardProps {
  clickLetterBtn: React.MouseEventHandler;
  clickDeleteBtn: React.MouseEventHandler;
}

interface KeyProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  value: string;
  keyType?: "normal" | "delete";
}

const consArr = [
  "p",
  "b",
  "t",
  "d",
  "k",
  "g",
  "m",
  "n",
  "ŋ",
  "f",
  "v",
  "θ",
  "ð",
  "s",
  "ʃ",
  "z",
  "ʒ",
  "h",
  "w",
  "j",
  "l",
  "r",
];
const vowelArr = [
  "i",
  "ɪ",
  "ʊ",
  "u",
  "e",
  "ɜ",
  "ə",
  "ɔ",
  "ɒ",
  "ʌ",
  "æ",
  "a",
  "ɑ",
  "ː",
];

function Key({ value, keyType, ...props }: Readonly<KeyProps>) {
  return (
    <button
      {...props}
      className={cn(
        "p-1 rounded shadow",
        keyType === "delete" ? "bg-red-300" : "bg-green-200"
      )}
    >
      {value}
    </button>
  );
}

export default memo(function Keyboard({
  clickLetterBtn,
  clickDeleteBtn,
}: KeyboardProps) {
  return (
    <div>
      <div>
        {vowelArr.map((sign) => (
          <Key key={sign} value={sign} onClick={clickLetterBtn} />
        ))}
      </div>
      <div>
        {consArr.map((sign) => (
          <Key key={sign} value={sign} onClick={clickLetterBtn} />
        ))}
        <Key value={"Delete"} keyType="delete" onClick={clickDeleteBtn} />
      </div>
    </div>
  );
});
