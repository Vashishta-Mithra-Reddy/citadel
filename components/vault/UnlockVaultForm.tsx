"use client";

import { useState } from "react";
import { useEncryption } from "@/app/providers/EncryptionProvider";
import { toast } from "sonner";
import { motion } from "framer-motion";

export default function UnlockVaultForm() {
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const { unlockVault } = useEncryption();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      await unlockVault(password);
      toast.success("Vault unlocked!");
    } catch (err: any) {
      const errorMessage =
        "Failed to unlock vault. Please check your password.";
      setError(errorMessage);
      toast.error(errorMessage);
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 20, filter: "blur(5px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      className="px-20 py-12 rounded-xl bg-background flex-col-center w-fit"
    >
      <h2 className="text-3xl font-semibold mb-8 text-center">
        Unlock Your Secure Vault
      </h2>
      <form
        onSubmit={handleSubmit}
        className="space-y-4 flex-col-center w-full max-w-sm"
      >
        <div className="flex-col-center w-full">
          <label htmlFor="masterPassword" className="text-lg font-medium">
            Master Password
          </label>
          <input
            id="masterPassword"
            name="masterPassword"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-2 p-2 px-4 w-full border border-foreground/20 focus:border-foreground/80 rounded-md outline-none"
            required
            autoFocus
          />
        </div>

        {error && <p className="text-sm text-red-500 text-center">{error}</p>}

        <button
          type="submit"
          disabled={isLoading || !password}
          className="px-5 py-3 mt-2 bg-foreground text-background rounded-md font-medium hover:bg-foreground/90 transition disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
        >
          {isLoading ? "Unlocking..." : "Unlock"}
        </button>
      </form>
    </motion.section>
  );
}
