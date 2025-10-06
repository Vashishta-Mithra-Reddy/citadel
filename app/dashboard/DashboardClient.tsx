"use client";

import NavigationCard from "@/components/NavigationCard";
import { useEncryption } from "../providers/EncryptionProvider";
import UnlockVaultForm from "@/components/UnlockVaultForm";
import PasskeySetup from "@/components/webauthn/PassKeySetup";
import Vault from "@/components/vault/Vault";

export default function DashboardClient() {
  const { isLocked } = useEncryption();

  if (isLocked) {
    return <UnlockVaultForm />;
  }

  return (
    <div className="space-y-8 w-full">
      <Vault />

      <NavigationCard
        href="/password-generator"
        title="Trying to create a strong password?"
        tag="Open Password Generator"
        delay={0.2}
        width="full"
      />

      <section className="p-6 py-8 rounded-xl border-2 border-dashed border-foreground/20">
        <PasskeySetup />
      </section>
    </div>
  );
}
