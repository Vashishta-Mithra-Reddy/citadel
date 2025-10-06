"use client";

import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/providers/AuthProvider";

export default function PasskeyLoginButton() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { refreshSession } = useAuth();

  const refresh = async () => {
    await refreshSession();
  };

  const handlePasskeyLogin = async () => {
    setIsLoading(true);
    await authClient.signIn.passkey({
      fetchOptions: {
        onSuccess(context) {
          refresh();
          router.push("/dashboard");
        },
        onError(context) {
          toast.error(
            context.error.message || "Could not sign in with passkey.",
          );
          console.error(context.error);
          setIsLoading(false);
        },
      },
    });
  };

  return (
    <button
      onClick={handlePasskeyLogin}
      disabled={isLoading}
      className="w-full h-full bg-blue-400 hover:bg-blue-500 text-lg text-white font-bold py-2 px-6 rounded-xl cursor-pointer focus:outline-none focus:shadow-outline transition-all duration-500 disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {isLoading ? "Checking for Passkey..." : "Sign in with Passkey"}
    </button>
  );
}
