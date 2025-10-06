import SignInClient from "./SignInClient";
import { headers } from "next/headers";
import { auth } from "@/utils/auth";
import { redirect } from "next/navigation";

export default async function SignInPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (session) {
    redirect("/dashboard");
  }
  return <SignInClient />;
}
