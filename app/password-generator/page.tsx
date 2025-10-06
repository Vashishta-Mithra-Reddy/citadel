import NavigationCard from "@/components/NavigationCard";
import PasswordGenerator from "@/components/PasswordGenerator";
import { auth } from "@/utils/auth";
import { headers } from "next/headers";

export default async function PasswordGeneratorPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  return (
    <div className="wrapperx font-outfit text-foreground/80">
      <h1 className="text-2xl md:text-4xl font-semibold text-foreground/80 mb-8 md:mb-12 text-center">
        Password Generator
      </h1>
      <PasswordGenerator />

      <div className="flex flex-col items-center justify-center space-y-4 mt-4 md:mt-8">
        {session?.user ? (
          <NavigationCard
            title="Access your secure vault"
            href="/dashboard"
            tag="Dashboard"
            delay={0.6}
          />
        ) : (
          <NavigationCard
            title="Need to save your passwords?"
            href="/sign-in"
            tag="Sign In"
            delay={0.6}
          />
        )}
      </div>
    </div>
  );
}
