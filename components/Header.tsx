"use client";
import AuthButton from "./AuthButton";
import ThemeSwitcher from "./ThemeSwitcher";
import Link from "next/link";
import { useAuth } from "@/app/providers/AuthProvider";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { toast } from "sonner";

type BeforeInstallPromptEvent = Event & {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed"; platform: string }>;
};

export default function Header() {
  const session = useAuth();

  const [deferredPrompt, setDeferredPrompt] =
    useState<BeforeInstallPromptEvent | null>(null);
  const [installable, setInstallable] = useState(false);
  const [isIOS, setIsIOS] = useState(false);
  const [isStandalone, setIsStandalone] = useState(false);

  useEffect(() => {
    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      setInstallable(true);
    };
    window.addEventListener("beforeinstallprompt", handler);
    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  useEffect(() => {
    const onInstalled = () => setInstallable(false);
    window.addEventListener("appinstalled", onInstalled);
    return () => window.removeEventListener("appinstalled", onInstalled);
  }, []);

  useEffect(() => {
    setIsIOS(/iphone|ipad|ipod/i.test(window.navigator.userAgent));
    const standalone =
      window.matchMedia("(display-mode: standalone)").matches ||
      // @ts-expect-error - iOS Safari
      !!window.navigator.standalone;
    setIsStandalone(standalone);
  }, []);

  const handleInstall = async () => {
    if (deferredPrompt) {
      await deferredPrompt.prompt();
      await deferredPrompt.userChoice;
      setDeferredPrompt(null);
      setInstallable(false);
      return;
    }
    if (isIOS && !isStandalone) {
      toast.info("On iOS: tap Share, then ‘Add to Home Screen’.");
      return;
    }
    toast.info("Use your browser’s menu to install the app.");
  };

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
          {(installable || (isIOS && !isStandalone)) && (
            <button
              onClick={handleInstall}
              className="text-lg font-semibold font-outfit rounded-xl p-3.5 px-5 text-center transition-all duration-300 hover:bg-foreground/5 hover:text-foreground/90 border border-border cursor-pointer active:scale-95"
            >
              Install
            </button>
          )}
          <AuthButton />
        </div>
      </div>
    </header>
  );
}
