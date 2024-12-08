import { Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import { AuthProvider } from "@/lib/auth/auth-provider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// Auth pages
import LoginPage from "@/app/(auth)/login/page";
import SignUpPage from "@/app/(auth)/signup/page";
import AuthCallbackPage from "@/app/(auth)/callback/page";

// Protected pages
import HomePage from "@/app/page";
import { AuthGuard } from "./lib/auth/auth-guard";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Suspense
          fallback={
            <div className="flex h-screen items-center justify-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
            </div>
          }
        >
          <Routes>
            {/* Auth Routes */}
            <Route path="/auth/login" element={<LoginPage />} />
            <Route path="/auth/signup" element={<SignUpPage />} />
            <Route path="/auth/callback" element={<AuthCallbackPage />} />

            {/* Protected Routes */}
            <Route
              path="/"
              element={
                <AuthGuard>
                  <HomePage />
                </AuthGuard>
              }
            />
          </Routes>
        </Suspense>
        <Toaster />
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
