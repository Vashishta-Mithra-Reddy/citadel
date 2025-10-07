"use client";

import NavigationCard from "@/components/NavigationCard";
import { useEncryption } from "../providers/EncryptionProvider";
import UnlockVaultForm from "@/components/vault/UnlockVaultForm";
import PasskeySetup from "@/components/webauthn/PassKeySetup";
import Vault from "@/components/vault/Vault";

interface DashboardClientProps {
  encryptedItems: { _id: string; ciphertext: string; iv: string }[];
}

export default function DashboardClient({
  encryptedItems,
}: DashboardClientProps) {
  const { isLocked } = useEncryption();

  if (isLocked) {
    return <UnlockVaultForm />;
  }

  return (
    <div className="space-y-8 w-full">
      <Vault encryptedItems={encryptedItems} />

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
