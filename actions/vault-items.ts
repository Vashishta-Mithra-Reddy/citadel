// app/actions/vault.ts

"use server";

import { auth } from "@/utils/auth";
import { headers } from "next/headers";
import { revalidatePath } from "next/cache";
import VaultItem from "@/db/models/VaultItem";
import { connectToDB } from "@/db/dbmongoose";

// --- CREATE ---
export async function createVaultItem(data: {
  ciphertext: string;
  iv: string;
}) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) throw new Error("Unauthorized");
  await connectToDB();

  const newItem = new VaultItem({
    userId: session.user.id,
    ciphertext: data.ciphertext,
    iv: data.iv,
  });

  await newItem.save();
  revalidatePath("/dashboard"); // Refresh the dashboard data
}

// --- READ ---
export async function getEncryptedVaultItems() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) return [];
  await connectToDB();

  const items = await VaultItem.find({ userId: session.user.id }).sort({
    createdAt: -1,
  });
  // Return a plain object to avoid serialization issues
  return JSON.parse(JSON.stringify(items));
}

// --- UPDATE ---
export async function updateVaultItem(
  id: string,
  data: { ciphertext: string; iv: string },
) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) throw new Error("Unauthorized");
  await connectToDB();

  const item = await VaultItem.findOne({ _id: id, userId: session.user.id });
  if (!item) throw new Error("Item not found or permission denied");

  item.ciphertext = data.ciphertext;
  item.iv = data.iv;
  await item.save();

  revalidatePath("/dashboard");
}

// --- DELETE ---
export async function deleteVaultItem(id: string) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) throw new Error("Unauthorized");
  await connectToDB();

  const result = await VaultItem.deleteOne({
    _id: id,
    userId: session.user.id,
  });
  if (result.deletedCount === 0)
    throw new Error("Item not found or permission denied");

  revalidatePath("/dashboard");
}
