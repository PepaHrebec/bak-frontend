import { createFileRoute } from "@tanstack/react-router";
import Keyboard from "../components/keyboard";
import { useState } from "react";
import { cn } from "../utils/cn";
import { UserWordDisplay } from "../components/UserWordDisplay";

export const Route = createFileRoute("/about")({
  component: AboutComponent,
});

function AboutComponent() {
  const [userWord, setUserWord] = useState("");

  function letterClicked(e: React.MouseEvent<Element, MouseEvent>) {
    const letter = (e.target as HTMLElement).innerText;
    setUserWord((prev) => prev + letter);
  }

  function deleteLetter() {
    if (userWord.length === 0) {
      return;
    }
    setUserWord((prev) => prev.slice(0, prev.length - 1));
  }
  return (
    <div className="">
      <h3>About</h3>
      <UserWordDisplay userWord={userWord} />
      <Keyboard clickLetterBtn={letterClicked} clickDeleteBtn={deleteLetter} />
    </div>
  );
}
