import { EncryptionProvider } from "../providers/EncryptionProvider";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <EncryptionProvider>
      {children}
    </EncryptionProvider>
  );
}