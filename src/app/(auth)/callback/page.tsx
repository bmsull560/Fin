import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase/client";

export default function AuthCallbackPage() {
  const navigate = useNavigate();

  useEffect(() => {
    supabase.auth.onAuthStateChange((event) => {
      if (event === "SIGNED_IN") {
        navigate("/");
      }
    });
  }, [navigate]);

  return (
    <div className="flex h-screen w-screen items-center justify-center">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
    </div>
  );
}
