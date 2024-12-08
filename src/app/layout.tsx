import { Toaster } from "@/components/ui/toaster";
import { AuthProvider } from "@/lib/auth";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // In design view, don't wrap with AuthProvider
  if (typeof window === "undefined") {
    return children;
  }

  return (
    <AuthProvider>
      {children}
      <Toaster />
    </AuthProvider>
  );
}
