import { Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import LoadingScreen from "./components/ui/loading-screen";
import RootLayout from "./app/layout";

// Auth pages
import LoginPage from "./app/(auth)/login/page";
import SignUpPage from "./app/(auth)/signup/page";
import ResetPasswordPage from "./app/(auth)/reset-password/page";
import UpdatePasswordPage from "./app/(auth)/update-password/page";

// Protected pages
import HomePage from "./app/page";
import DiscoverPage from "./app/(protected)/discover/page";
import SettingsPage from "./app/(protected)/settings/page";

function App() {
  return (
    <RootLayout>
      <Suspense fallback={<LoadingScreen />}>
        <Routes>
          {/* Auth Routes */}
          <Route path="login" element={<LoginPage />} />
          <Route path="signup" element={<SignUpPage />} />
          <Route path="reset-password" element={<ResetPasswordPage />} />
          <Route path="update-password" element={<UpdatePasswordPage />} />

          {/* Protected Routes */}
          <Route path="/" element={<HomePage />} />
          <Route path="discover" element={<DiscoverPage />} />
          <Route path="settings" element={<SettingsPage />} />

          {/* Catch all route */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>
    </RootLayout>
  );
}

export default App;
