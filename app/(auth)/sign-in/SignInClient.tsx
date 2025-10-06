"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { toast } from "sonner";
import { signIn } from "@/actions/auth-actions";
import { useAuth } from "@/app/providers/AuthProvider";

export default function SignInClient() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const router = useRouter();
  const { refreshSession } = useAuth();

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const result = await signIn(email, password);
      if (result.token) {
        toast.success("Signed in successfully");
        await refreshSession();
        router.push("/dashboard");
      }
    } catch (error) {
      console.error(error);
      toast.error(String(error));
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="flex items-center justify-center flex-col relative z-10 bg-transparent rounded-xl w-full mx-2 md:mx-0">
      <motion.div
        initial={{ y: 10, opacity: 0, filter: "blur(5px)" }}
        animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
        exit={{ y: -10, opacity: 0, filter: "blur(5px)" }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
        className="px-12 pt-12 pb-6 rounded-xl w-full max-w-md bg-background backdrop-blur-3xl backdrop-brightness-75"
      >
        <h2 className="text-3xl mb-12 text-center">
          Enter{" "}
          <Link href="/" className="font-semibold">
            Citadel.
          </Link>
        </h2>
        <form
          onSubmit={handleSignIn}
          className="flex items-center justify-center flex-col"
        >
          <div className="mb-4 w-full">
            <label
              className="block text-gray-500 pl-2 text-sm font-bold mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              className="w-full px-4 py-2 text-lg bg-card border-2 border-foreground/20 focus:border-foreground/50 rounded-xl transition-all placeholder:text-muted-foreground duration-500 focus:outline-none"
              placeholder="m@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-6 w-full">
            <label
              className="block text-gray-500 pl-2 text-sm font-bold mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="********"
              autoComplete="password"
              className="w-full px-4 py-2 text-lg bg-card border-2 border-foreground/20 focus:border-foreground/50 rounded-xl transition-all placeholder:text-muted-foreground duration-500 focus:outline-none"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="flex items-center justify-center w-full">
            <button
              type="submit"
              disabled={loading || !email || !password}
              className="w-full bg-blue-400 hover:bg-blue-500 text-lg text-white font-bold py-2 px-6 rounded-xl cursor-pointer focus:outline-none focus:shadow-outline mt-2 transition-all duration-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <div className="flex items-center justify-center">
                  <svg
                    className="animate-spin h-7 w-7 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                </div>
              ) : (
                "Sign In"
              )}
            </button>
          </div>
          <div className="text-center mt-6">
            <Link href="/sign-up">
              <p className="text-md text-gray-500 hover:underline">
                New here? <span className="text-blue-500">Sign up</span>
              </p>
            </Link>
          </div>
        </form>
      </motion.div>
    </section>
  );
}
