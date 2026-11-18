import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/staff-reset-password")({
  beforeLoad: () => { throw redirect({ to: "/trial", replace: true }); },
});
