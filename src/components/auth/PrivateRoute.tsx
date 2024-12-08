import { useAuth } from "@/lib/auth";
import { Navigate } from "react-router-dom";
import LoadingScreen from "@/components/ui/loading-screen";

export function PrivateRoute({ children }: { children: React.ReactNode }) {
  // In design view, always render children
  if (typeof window === "undefined") {
    return children;
  }

  const { user, loading } = useAuth();

  if (loading) {
    return <LoadingScreen message="Authenticating..." />;
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  return children;
}
