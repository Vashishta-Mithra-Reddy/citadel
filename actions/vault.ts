"use server";

import { auth } from "@/utils/auth";
import { headers } from "next/headers";

export async function setupVault(data: { salt: string; verificationCipher: string; iv: string }) {
  const { salt, verificationCipher, iv } = data;
  try {
    const session = await auth.api.getSession({ headers: await headers() });

    if (!session) throw new Error('Unauthorized');
    
    if (!salt || !verificationCipher || !iv) throw new Error('Invalid setup data.');

    await auth.api.updateUser({
      headers: await headers(), 
      body: {
        salt,
        verificationCipher,
        verificationIv: iv, 
      },
    });

  } catch (error) {
    console.error('Vault Setup Action Error:', error);
    if (error instanceof Error) throw new Error(error.message);
    throw new Error('An unexpected error occurred.');
  }
}

export async function getVaultVerificationData() {
  try {
    const session = await auth.api.getSession({ headers: await headers() });
    
    if (!session) return null;

    const { salt, verificationCipher, verificationIv } = session.user;

    if (!salt || !verificationCipher || !verificationIv) return null;

    return { salt, verificationCipher, verificationIv };
  } catch (error) {
    return null;
  }
}

export async function getUserSalt(): Promise<string | null> {
  try {
    const session = await auth.api.getSession({ headers: await headers() });
    if (!session || !session.user.salt) {
      return null;
    }
    return session.user.salt;
  } catch (error) {
    return null;
  }
}
