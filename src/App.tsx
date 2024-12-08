import { Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./components/home";
import Header from "./components/Header";
import LoginPage from "./components/auth/LoginPage";
import SignUpPage from "./components/auth/SignUpPage";
import SettingsLayout from "./components/settings/SettingsLayout";
import ResetPasswordPage from "./components/auth/ResetPasswordPage";
import UpdatePasswordPage from "./components/auth/UpdatePasswordPage";
import LoadingScreen from "./components/ui/loading-screen";
import FeedCatalog from "./components/discover/FeedCatalog";
import { AuthProvider, useAuth } from "./lib/auth.tsx";
import { Toaster } from "./components/ui/toaster";

function PrivateRoute({ children }: { children: React.ReactNode }) {
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

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">{children}</main>
    </div>
  );
}

function AuthLayout({ children }: { children: React.ReactNode }) {
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

function AppRoutes() {
  return (
    <Suspense fallback={<LoadingScreen />}>
      <Routes>
        {/* Auth Routes */}
        <Route
          path="login"
          element={
            <AuthLayout>
              <LoginPage />
            </AuthLayout>
          }
        />
        <Route
          path="signup"
          element={
            <AuthLayout>
              <SignUpPage />
            </AuthLayout>
          }
        />
        <Route
          path="reset-password"
          element={
            <AuthLayout>
              <ResetPasswordPage />
            </AuthLayout>
          }
        />
        <Route
          path="update-password"
          element={
            <AuthLayout>
              <UpdatePasswordPage />
            </AuthLayout>
          }
        />

        {/* Protected Routes */}
        <Route
          path="/"
          element={
            <PrivateRoute>
              <Layout>
                <Home />
              </Layout>
            </PrivateRoute>
          }
        />
        <Route
          path="discover"
          element={
            <PrivateRoute>
              <Layout>
                <FeedCatalog />
              </Layout>
            </PrivateRoute>
          }
        />
        <Route
          path="settings"
          element={
            <PrivateRoute>
              <Layout>
                <SettingsLayout />
              </Layout>
            </PrivateRoute>
          }
        />

        {/* Catch all route */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Suspense>
  );
}

function App() {
  // In design view, don't wrap with AuthProvider
  if (typeof window === "undefined") {
    return <AppRoutes />;
  }

  return (
    <AuthProvider>
      <AppRoutes />
      <Toaster />
    </AuthProvider>
  );
}

export default App;
