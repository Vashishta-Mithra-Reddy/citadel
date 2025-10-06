"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import { deriveKey, decryptData } from "@/lib/crypto";
import { getVaultVerificationData } from "@/actions/vault";

const VERIFICATION_PLAINTEXT = "VAULT_VERIFIED";

interface EncryptionContextType {
  encryptionKey: CryptoKey | null;
  isLocked: boolean;
  unlockVault: (masterPassword: string) => Promise<void>;
}

const EncryptionContext = createContext<EncryptionContextType | undefined>(
  undefined,
);

export function EncryptionProvider({ children }: { children: ReactNode }) {
  const [encryptionKey, setEncryptionKey] = useState<CryptoKey | null>(null);
  const isLocked = encryptionKey === null;

  const unlockVault = async (masterPassword: string) => {
    const data = await getVaultVerificationData();
    if (!data) {
      throw new Error("Could not retrieve vault data. Please try again.");
    }
    const { salt, verificationCipher, verificationIv } = data;

    const key = await deriveKey(masterPassword, salt);

    let decryptedText;
    try {
      decryptedText = await decryptData(
        verificationCipher,
        verificationIv,
        key,
      );
    } catch (error) {
      throw new Error("Invalid Master Password.");
    }

    if (decryptedText !== VERIFICATION_PLAINTEXT) {
      throw new Error("Invalid Master Password.");
    }

    setEncryptionKey(key);
  };

  return (
    <EncryptionContext.Provider
      value={{ encryptionKey, isLocked, unlockVault }}
    >
      {children}
    </EncryptionContext.Provider>
  );
}

export function useEncryption() {
  const context = useContext(EncryptionContext);
  if (context === undefined) {
    throw new Error("useEncryption must be used within an EncryptionProvider");
  }
  return context;
}
