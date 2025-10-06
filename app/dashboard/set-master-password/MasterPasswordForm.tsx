"use client";

import { useState } from "react";
import { toast } from "sonner";
import { setupVault } from "@/actions/vault";
import { deriveKey, encryptData } from "@/lib/crypto";
import { useRouter } from "next/navigation";

const VERIFICATION_PLAINTEXT = "VAULT_VERIFIED";

export default function MasterPasswordForm() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      setIsLoading(false);
      return;
    }
    if (password.length < 8) {
      setError("For security, the password must be at least 8 characters long.");
      setIsLoading(false);
      return;
    }

    try {
      const saltBuffer = crypto.getRandomValues(new Uint8Array(16));
      const saltString = btoa(
        String.fromCharCode.apply(null, Array.from(saltBuffer)),
      );

      const key = await deriveKey(password, saltString);

      const { ciphertext, iv } = await encryptData(VERIFICATION_PLAINTEXT, key);

      await setupVault({
        salt: saltString,
        verificationCipher: ciphertext,
        iv: iv,
      });

      toast.success("Vault secured successfully!");
      router.push("/dashboard")

    } catch (err: any) {
      setError(err.message);
      toast.error(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 flex-col-center">
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
          aria-describedby="master-password-tip"
          className="mt-2 p-2 px-4 w-full border border-foreground/20 focus:border-foreground/80 rounded-md outline-none"
          required
        />
      </div>

      <div className="flex-col-center w-full">
        <label htmlFor="confirmMasterPassword" className="text-lg font-medium">
          Confirm Master Password
        </label>
        <input
          id="confirmMasterPassword"
          name="confirmMasterPassword"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="mt-2 p-2 px-4 w-full border border-foreground/20 focus:border-foreground/80 rounded-md outline-none"
          required
        />
      </div>

      {error && <p className="text-sm text-red-500 text-center">{error}</p>}

      <button
        type="submit"
        disabled={isLoading}
        className="px-5 py-3 mt-2 bg-foreground text-background rounded-md font-medium hover:bg-foreground/90 transition disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
      >
        {isLoading ? "Securing Vault..." : "Set Master Password"}
      </button>
    </form>
  );
}