import { redirect } from "next/navigation";

/** Experience is hidden for now. Keep the route so old links do not 404. */
export default function ExperiencePage() {
  redirect("/");
}
