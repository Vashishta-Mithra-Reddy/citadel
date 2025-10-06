"use client";

import Link from "next/link";
import { toast } from "sonner";
import { signOut } from "@/actions/auth-actions";
import { useAuth } from "@/app/providers/AuthProvider";
import { useRouter } from "next/navigation";

export default function AuthButton() {
  const { session, refreshSession } = useAuth();
  const router = useRouter();

  const handleSignOut = async () => {
    try {
      const result = await signOut();
      if (result) {
        router.push("/");
        toast.success("Signed out successfully");
        await refreshSession();
      }
    } catch (error) {
      console.error(error);
      toast.error(String(error));
    }
  };

  return (
    <div className="w-fit text-foreground flex items-center gap-2">
      {session ? (
        <button
          onClick={handleSignOut}
          className="text-lg font-semibold font-outfit rounded-xl p-3.5 px-5 text-center transition-all duration-300 hover:bg-foreground/5 hover:text-foreground/90 border border-border cursor-pointer"
        >
          Sign Out
        </button>
      ) : (
        <div className="flex gap-2">
          <Link
            href="/sign-in"
            className="text-lg font-semibold font-outfit rounded-xl p-3.5 px-5 text-center transition-all duration-300 hover:bg-foreground/5 hover:text-foreground/90 border border-border"
          >
            Sign In
          </Link>
        </div>
      )}
    </div>
  );
}
