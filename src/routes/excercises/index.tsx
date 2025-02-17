import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/excercises/")({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/excercises/"!</div>;
}
