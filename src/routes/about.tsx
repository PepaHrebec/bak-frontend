import { createFileRoute } from "@tanstack/react-router";
import { Button } from "../components/buttons/Button";
import { Search, Send, NotebookPen } from "lucide-react";

export const Route = createFileRoute("/about")({
  component: AboutComponent,
});

function AboutComponent() {
  return (
    <div className="">
      <h3>About</h3>
    </div>
  );
}
