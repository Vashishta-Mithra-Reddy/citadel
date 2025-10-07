"use client";

import { useState } from "react";
import { useEncryption } from "@/app/providers/EncryptionProvider";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { Dithering, GodRays, GrainGradient } from "@paper-design/shaders-react";

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
    <div className="wrapperx flex flex-col items-center justify-center text-foreground/90 h-full">
      {/* <GodRays
        colors={["#148effa6", "#c3defebf"]}
        colorBack="#080e1b"
        colorBloom="#ffffff"
        bloom={0.6}
        intensity={0.6}
        density={0.03}
        spotty={0}
        midSize={0.1}
        midIntensity={0}
        speed={1}
        className="absolute inset-0 w-full h-full"
      /> */}
      {/* <GrainGradient
        colors={["#3d3d3d"]}
        colorBack="#0e0d16"
        softness={0}
        intensity={0.15}
        noise={0.5}
        shape="blob"
        speed={1}
        scale={1.3}
        className="absolute inset-0 w-full h-full"
      /> */}
      <Dithering
        colorBack="#00000000"
        colorFront="#6E6E6E"
        shape="dots"
        type="random"
        size={9}
        speed={0.01}
        className="absolute inset-0 w-full h-full opacity-10"
      />
      <motion.section
        initial={{ opacity: 0, y: 20, filter: "blur(5px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
        className="px-8 md:px-20 py-8 md:py-12 rounded-xl bg-background flex-col-center w-fit font-outfit"
      >
        <h2 className="text-2xl md:text-3xl font-semibold mb-6 text-center">
          Unlock Your Secure Vault
        </h2>
        <form
          onSubmit={handleSubmit}
          className="space-y-3 flex-col-center w-full max-w-sm"
        >
          <div className="flex-col-center w-full">
            {/* <label htmlFor="masterPassword" className="text-lg font-medium">
            Master Password
          </label> */}
            <input
              id="masterPassword"
              name="masterPassword"
              type="password"
              value={password}
              placeholder="Enter Your Master Password"
              onChange={(e) => setPassword(e.target.value)}
              className="mt-2 py-3 px-5 w-full border border-foreground/20 focus:border-foreground/80 rounded-xl outline-none text-center transition-all duration-300"
              required
              autoFocus
            />
          </div>

          {error && <p className="text-sm text-red-500 text-center">{error}</p>}

          <button
            type="submit"
            disabled={isLoading || !password}
            className="px-5 py-3 mt-2 bg-foreground text-background rounded-xl font-medium hover:bg-foreground/90 transition disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer w-full"
          >
            {isLoading ? "Unlocking..." : "Unlock"}
          </button>
        </form>
      </motion.section>
    </div>
  );
}
