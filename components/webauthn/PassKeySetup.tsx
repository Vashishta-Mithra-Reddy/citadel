"use client";

import { useState } from "react";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";
import { useAuth } from "@/app/providers/AuthProvider";
import { motion } from "framer-motion";

export default function PasskeySetup() {
  const [isLoading, setIsLoading] = useState(false);
  const { session } = useAuth();

  const handleRegisterPasskey = async () => {
    setIsLoading(true);
    try {

      const result = await authClient.passkey.addPasskey({
        name: session?.user.email,
      });

      if (result?.error) {
        throw new Error(result.error.message);
      }

      toast.success(`Passkey registered for ${session?.user.email}!`);
    } catch (error: any) {
      toast.error(error.message || "Could not register passkey.");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut", delay: 0.4 }}
      className="p-6 py-8 rounded-xl border-2 border-dashed border-foreground/20 font-outfit"
    >
      <div className="flex-col-center">
        <h3 className="text-2xl font-semibold mb-2">Add a Passkey</h3>
        <p className="text-sm text-foreground/60 mb-4 text-center">
          Enable signing in to your account with this device's biometrics
          (Fingerprint, Face ID, etc.).
        </p>
        <button
          onClick={handleRegisterPasskey}
          disabled={isLoading}
          className="px-6 py-3 bg-foreground/90 hover:bg-foreground/70 text-background/80 rounded-xl disabled:opacity-50 cursor-pointer active:scale-95 transition-all duration-500 font-medium"
        >
          {isLoading ? "Registering Device..." : "Add Passkey for This Device"}
        </button>
      </div>
    </motion.section>
  );
}
