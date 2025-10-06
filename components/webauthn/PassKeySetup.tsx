"use client";

import { useState } from "react";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";

/**
 * A helper function to generate a descriptive name from the browser's user agent.
 * @returns A string like "Chrome on Windows" or "Safari on iPhone".
 */

function getDeviceName(): string {
  if (typeof window === "undefined") return "Unknown Device";

  const ua = navigator.userAgent;
  let browser = "Unknown Browser";
  let os = "Unknown OS";

  // Detect OS
  if (/Windows/.test(ua)) os = "Windows";
  else if (/Macintosh|Mac OS X/.test(ua)) os = "macOS";
  else if (/iPhone|iPad|iPod/.test(ua)) os = "iOS Device";
  else if (/Android/.test(ua)) os = "Android";
  else if (/Linux/.test(ua)) os = "Linux";

  // Detect Browser
  if (ua.includes("Firefox/")) browser = "Firefox";
  else if (ua.includes("SamsungBrowser/")) browser = "Samsung Browser";
  else if (ua.includes("Edge/")) browser = "Edge";
  else if (ua.includes("Chrome/")) browser = "Chrome";
  else if (ua.includes("Safari/")) browser = "Safari";

  // For mobile Safari/Chrome, be more specific
  if (os === "iOS Device" && browser === "Safari" && ua.includes("Version/"))
    browser = "Safari";
  if (os === "iOS Device" && browser === "Chrome" && ua.includes("CriOS/"))
    browser = "Chrome";

  return `${browser} on ${os}`;
}

export default function PasskeySetup() {
  const [isLoading, setIsLoading] = useState(false);

  const handleRegisterPasskey = async () => {
    setIsLoading(true);
    try {
      const generatedName = getDeviceName();

      const result = await authClient.passkey.addPasskey({
        name: "Citadel | "+generatedName,
      });

      if (result?.error) {
        throw new Error(result.error.message);
      }

      toast.success(`Passkey registered for ${generatedName}!`);
    } catch (error: any) {
      toast.error(error.message || "Could not register passkey.");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <h3 className="text-lg font-semibold">Add a Passkey</h3>
      <p className="text-sm text-foreground/60 mb-4">
        Enable signing in to your account with this device's biometrics
        (Fingerprint, Face ID, etc.).
      </p>
      <button
        onClick={handleRegisterPasskey}
        disabled={isLoading}
        className="px-4 py-2 bg-foreground text-background rounded-md disabled:opacity-50"
      >
        {isLoading ? "Registering Device..." : "Add Passkey for This Device"}
      </button>
    </div>
  );
}
