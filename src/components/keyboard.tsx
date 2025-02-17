import { memo } from "react";

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
          <button onClick={clickLetterBtn} key={sign}>
            {sign}
          </button>
        ))}
      </div>
      <div>
        {consArr.map((sign) => (
          <button onClick={clickLetterBtn} key={sign}>
            {sign}
          </button>
        ))}
        <button onClick={clickDeleteBtn}>Delete</button>
      </div>
    </div>
  );
});
