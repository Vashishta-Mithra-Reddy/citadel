"use client";

import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/providers/AuthProvider";
import { toast } from "sonner";
import { useState, useCallback } from "react";

// Google Logo SVG Component
const GoogleIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    width="20"
    height="20"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fill="#4285F4"
      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
    />
    <path
      fill="#34A853"
      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
    />
    <path
      fill="#FBBC05"
      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
    />
    <path
      fill="#EA4335"
      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
    />
  </svg>
);

// Loading Spinner Component
const LoadingSpinner = ({ className }: { className?: string }) => (
  <svg
    className={`animate-spin ${className}`}
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    width="20"
    height="20"
  >
    <circle
      className="opacity-25"
      cx="12"
      cy="12"
      r="10"
      stroke="currentColor"
      strokeWidth="4"
    />
    <path
      className="opacity-75"
      fill="currentColor"
      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
    />
  </svg>
);

export default function GoogleAuthButton() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const { refreshSession } = useAuth();

  const handleGoogleLogin = useCallback(async () => {
    if (isLoading) return; // Prevent multiple clicks
    
    setIsLoading(true);
    
    try {
      await authClient.signIn.social({
        provider: "google",
        callbackURL: "/dashboard",
        fetchOptions: {
        //   onSuccess: async (context) => {
        //     try {
        //       await refreshSession();
        //       toast.success("Successfully signed in with Google!", {
        //         description: "Redirecting to your dashboard...",
        //       });
              
        //       setTimeout(() => {
        //         router.push("/dashboard");
        //       }, 1000);
        //     } catch (error) {
        //       console.error("Session refresh error:", error);
        //       toast.error("Sign-in successful, but failed to refresh session. Please try again.");
        //       setIsLoading(false);
        //     }
        //   },
          onError: (context) => {
            const errorMessage = context.error?.message || "Failed to sign in with Google";
            
            // Handle specific error cases
            if (errorMessage.includes("popup_closed_by_user")) {
              toast.info("Sign-in cancelled", {
                description: "You can try again anytime.",
              });
            } else if (errorMessage.includes("access_denied")) {
              toast.error("Access denied", {
                description: "Please grant permission to continue with Google sign-in.",
              });
            } else if (errorMessage.includes("network")) {
              toast.error("Network error", {
                description: "Please check your internet connection and try again.",
              });
            } else {
              toast.error("Sign-in failed", {
                description: errorMessage,
              });
            }
            
            console.error("Google sign-in error:", context.error);
            setIsLoading(false);
          },
        },
      });
    } catch (error) {
      console.error("Unexpected error during Google sign-in:", error);
      toast.error("Unexpected error", {
        description: "Something went wrong. Please try again.",
      });
      setIsLoading(false);
    }
  }, [isLoading, refreshSession, router]);

  return (
    <button
      onClick={handleGoogleLogin}
      disabled={isLoading}
      className="w-full flex items-center justify-center gap-3 bg-white hover:bg-gray-50 text-gray-700 font-medium py-2.5 px-6 rounded-xl border border-gray-300 hover:border-gray-400 cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:bg-white disabled:hover:border-gray-300 mb-2 shadow-sm hover:shadow-md active:scale-[0.98] mt-2"
      aria-label={isLoading ? "Signing in with Google..." : "Sign in with Google"}
    >
      {isLoading ? (
        <LoadingSpinner className="text-gray-600" />
      ) : (
        <GoogleIcon />
      )}
      <span className="text-base">
        {isLoading ? "Signing in..." : "Continue with Google"}
      </span>
    </button>
  );
}