import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/exercises/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      <Link to="/exercises/inverted">Inverted</Link>
    </div>
  );
}
