import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { load } from "../../utils/functions";

export const Route = createFileRoute("/exercises/inverted")({
  component: RouteComponent,
});

function RouteComponent() {
  const { isPending, error, data, isFetching, refetch } = useQuery({
    queryKey: ["repoData"],
    queryFn: () => load(),
  });

  return <div>Hello "/exercises/inverted"!</div>;
}
