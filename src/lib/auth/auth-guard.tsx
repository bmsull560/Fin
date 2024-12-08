import { Navigate } from "react-router-dom";
import { useAuth } from "./auth-provider";

export function AuthGuard({ children }: { children: React.ReactNode }) {
  // In design view or development without auth, always render children
  if (
    import.meta.env.SSR ||
    (import.meta.env.DEV && !import.meta.env.VITE_SUPABASE_URL)
  ) {
    return <>{children}</>;
  }

  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/auth/login" replace />;
  }

  return <>{children}</>;
}
