import Home from "@/components/home";
import Header from "@/components/Header";
import { PrivateRoute } from "@/components/auth/PrivateRoute";

export default function HomePage() {
  return (
    <PrivateRoute>
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">
          <Home />
        </main>
      </div>
    </PrivateRoute>
  );
}
