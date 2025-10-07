"use server";
import { auth } from "@/utils/auth";
import { headers } from "next/headers";
import { revalidatePath } from "next/cache";

export const signUp = async (email: string, password: string, name: string) => {
  const result = await auth.api.signUpEmail({
    body: {
      email,
      password,
      name,
      callbackURL: "/",
    },
  });
  revalidatePath("/");
  return result;
};

export const signIn = async (email: string, password: string) => {
  const result = await auth.api.signInEmail({
    body: {
      email,
      password,
      callbackURL: "/",
    },
  });
  revalidatePath("/");
  return result;
};

export const signOut = async () => {
  const result = await auth.api.signOut({ headers: await headers() });
  revalidatePath("/");
  return result;
};

export const getSession = async () => {
  const session = await auth.api.getSession({ headers: await headers() });
  return session || null;
};
