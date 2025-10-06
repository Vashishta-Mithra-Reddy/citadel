import MasterPasswordForm from "./MasterPasswordForm";
import { auth } from "@/utils/auth";
import { redirect } from "next/navigation";
import { headers } from "next/headers";

export default async function SetMasterPasswordPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/sign-in");
  }

  if (session.user.salt) {
    redirect("/dashboard");
  }

  return (
    <main className="wrapperx flex flex-col items-center justify-center text-foreground/90">
      <div className="space-y-12 font-outfit">
        <h2 className="text-3xl font-semibold mb-8 text-center">
          Set Master Password
        </h2>
        <section className="px-16 py-8 rounded-xl bg-background mb-0">
          <MasterPasswordForm />
        </section>
        <aside
          id="master-password-tip"
          className="mt-8 p-4 border border-foreground/10 bg-foreground/5 text-sm text-foreground rounded-md w-full max-w-md text-center text-pretty"
        >
          💡 Think of it like your locker key. You'll only be able to access
          your passwords using this master password. Make it strong and
          memorable!
        </aside>
      </div>
    </main>
  );
}
