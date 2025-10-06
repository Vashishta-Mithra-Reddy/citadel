"use client";

import { useEffect, useState } from "react";
import { useEncryption } from "../providers/EncryptionProvider";
import UnlockVaultForm from "@/components/UnlockVaultForm";
import PasskeySetup from "@/components/webauthn/PassKeySetup";
import { authClient } from "@/lib/auth-client"; 
import Spinner from "@/components/Spinner";

export default function DashboardClient() {
  const { isLocked } = useEncryption();

  const [showPasskeySetup, setShowPasskeySetup] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const checkPasskeyAvailability = async () => {
      try {
        const supportsWebAuthn =
          typeof window.PublicKeyCredential !== "undefined" &&
          PublicKeyCredential.isConditionalMediationAvailable &&
          (await PublicKeyCredential.isConditionalMediationAvailable());

        if (!supportsWebAuthn) {
          return setShowPasskeySetup(false);
        }

        const { data: passkeys, error } = await authClient.passkey.listUserPasskeys();

        if (error) {
          console.warn("Error listing passkeys:", error);
          return setShowPasskeySetup(false); 
        }

        const hasPasskey = Array.isArray(passkeys) && passkeys.length > 0;
        setShowPasskeySetup(!hasPasskey);
        
      } catch (err) {
        console.error("Error checking passkey support or setup:", err);
        setShowPasskeySetup(false);
      } finally {
        setLoading(false);
      }
    };

    void checkPasskeyAvailability();
  }, []);

  if (isLocked) {
    return <UnlockVaultForm />;
  }

  if (loading) {
    return <Spinner />
  }

  return (
    <div className="space-y-8 w-full">
      <section className="p-6 py-12 rounded-xl border-2 border-dashed border-foreground/20">
        <h2 className="text-3xl font-semibold mb-8 text-center">
          Your Secure Vault
        </h2>
        <p className="text-center text-foreground/60">
          Vault is unlocked. Ready to manage your passwords.
        </p>
      </section>

      {showPasskeySetup && (
        <section className="p-6 py-12 rounded-xl border-2 border-dashed border-foreground/20">
          <h2 className="text-3xl font-semibold mb-8 text-center">
            Passkey Management
          </h2>
          {/* <PasskeySetup onSuccess={() => setShowPasskeySetup(false)} /> */}
          <PasskeySetup/>
        </section>
      )}
    </div>
  );
}
