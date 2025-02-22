import { memo } from "react";
import { Key } from "./keyboard/Key";

interface KeyboardProps {
  clickLetterBtn: React.MouseEventHandler;
  clickDeleteBtn: React.MouseEventHandler;
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
