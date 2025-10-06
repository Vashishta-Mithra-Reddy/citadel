"use client";
import AuthButton from "./AuthButton";
import ThemeSwitcher from "./ThemeSwitcher";
import Link from "next/link";
import { useAuth } from "@/app/providers/AuthProvider";
import { motion } from "framer-motion";

export default function Header() {
  const session = useAuth();

  return (
    <header className="flex items-center justify-center pt-4 w-full">
      <div className="max-w-8xl px-8 md:px-20 w-full flex items-center justify-between">
        <Link href="/" className="text-2xl font-semibold font-outfit">
          Citadel.
          {session?.session?.user && (
            <motion.span
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="text-foreground/40 text-sm md:text-2xl"
            >
              {`{${session.session.user.name}}`}
            </motion.span>
          )}
        </Link>
        <div className="flex gap-2">
          <ThemeSwitcher />
          <AuthButton />
        </div>
      </div>
    </header>
  );
}
