import FeedCatalog from "@/components/discover/FeedCatalog";
import Header from "@/components/Header";
import { PrivateRoute } from "@/components/auth/PrivateRoute";

export default function DiscoverPage() {
  return (
    <PrivateRoute>
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">
          <FeedCatalog />
        </main>
      </div>
    </PrivateRoute>
  );
}
