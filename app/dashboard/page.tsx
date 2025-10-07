import { headers } from "next/headers";
import { auth } from "@/utils/auth";
import { redirect } from "next/navigation";
import DashboardClient from "./DashboardClient";
import { getEncryptedVaultItems } from "@/actions/vault-items";

export default async function DashboardPage() {
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session) redirect("/sign-in");
  if (!session.user.salt) redirect("/dashboard/set-master-password");

  const encryptedItems = await getEncryptedVaultItems();

  return <DashboardClient encryptedItems={encryptedItems} />;
}
