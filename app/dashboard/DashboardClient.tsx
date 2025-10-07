"use client";

import NavigationCard from "@/components/NavigationCard";
import { useEncryption } from "../providers/EncryptionProvider";
import UnlockVaultForm from "@/components/vault/UnlockVaultForm";
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
      />

      <PasskeySetup />
    </div>
  );
}
