import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/pisos-revestimientos")({
  component: () => <Outlet />,
});
