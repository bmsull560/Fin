import { useAuth } from "@/lib/auth";
import { Navigate } from "react-router-dom";

export function AuthLayout({ children }: { children: React.ReactNode }) {
  // In design view, always render children
  if (typeof window === "undefined") {
    return children;
  }

  const { user } = useAuth();

  if (user) {
    return <Navigate to="/" />;
  }

  return children;
}
