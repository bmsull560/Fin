import { Suspense } from "react";
import { useRoutes, Routes, Route } from "react-router-dom";
import Home from "./components/home";
import Header from "./components/Header";
import LoginPage from "./components/auth/LoginPage";
import routes from "tempo-routes";

function App() {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/*"
          element={
            <div className="min-h-screen flex flex-col">
              <Header />
              <main className="flex-1">
                <Routes>
                  <Route path="/" element={<Home />} />
                </Routes>
                {import.meta.env.VITE_TEMPO === "true" && useRoutes(routes)}
              </main>
            </div>
          }
        />
      </Routes>
    </Suspense>
  );
}

export default App;
