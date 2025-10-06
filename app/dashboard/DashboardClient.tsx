"use client";

import { useEncryption } from "../providers/EncryptionProvider";
import UnlockVaultForm from "@/components/UnlockVaultForm";
import PasskeySetup from "@/components/webauthn/PassKeySetup";

export default function DashboardClient() {
  const { isLocked } = useEncryption();

  if (isLocked) {
    return <UnlockVaultForm />;
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

      {/* {!("PublicKeyCredential" in window) && ( */}
      <section className="p-6 py-12 rounded-xl border-2 border-dashed border-foreground/20">
        <h2 className="text-3xl font-semibold mb-8 text-center">
          Passkey Management
        </h2>
        <PasskeySetup />
      </section>
      {/* )} */}
    </div>
  );
}
