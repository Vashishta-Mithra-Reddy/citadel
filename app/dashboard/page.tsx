import { headers } from "next/headers";
import { auth } from "@/utils/auth";
import { redirect } from "next/navigation";
import DashboardClient from "./DashboardClient"; 

export default async function DashboardPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/sign-in");
  }

  if (!session.user.salt) {
    redirect("/dashboard/set-master-password");
  }

  return (
    <main className="wrapperx flex flex-col items-center justify-center text-foreground/90">
      <div className="w-full space-y-12 font-outfit">
        <DashboardClient />
      </div>
    </main>
  );
}