import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/superficies")({
  component: () => <Outlet />,
});
