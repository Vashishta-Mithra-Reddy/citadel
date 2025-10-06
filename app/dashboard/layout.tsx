import { EncryptionProvider } from "../providers/EncryptionProvider";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <EncryptionProvider>
      <div className="flex-center">
      {children}
      </div>
    </EncryptionProvider>
  );
}