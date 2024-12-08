import SettingsLayout from "@/components/settings/SettingsLayout";
import Header from "@/components/Header";
import { PrivateRoute } from "@/components/auth/PrivateRoute";

export default function SettingsPage() {
  return (
    <PrivateRoute>
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">
          <SettingsLayout />
        </main>
      </div>
    </PrivateRoute>
  );
}
