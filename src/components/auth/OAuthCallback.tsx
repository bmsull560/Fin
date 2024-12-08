import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/lib/supabase";

const OAuthCallback = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const handleOAuthCallback = async () => {
      try {
        // Get the access token from the URL hash
        const params = new URLSearchParams(window.location.hash.slice(1));
        const accessToken = params.get("access_token");

        if (accessToken) {
          // Get user data using the access token
          const {
            data: { user },
            error,
          } = await supabase.auth.getUser(accessToken);

          if (error) throw error;

          if (user) {
            toast({
              title: "Success",
              description: "Logged in successfully!",
            });
            navigate("/");
          }
        } else {
          navigate("/login");
          toast({
            variant: "destructive",
            title: "Error",
            description: "Authentication failed. Please try again.",
          });
        }
      } catch (error) {
        console.error("OAuth callback error:", error);
        toast({
          variant: "destructive",
          title: "Error",
          description:
            error instanceof Error ? error.message : "Authentication failed",
        });
        navigate("/login");
      }
    };

    handleOAuthCallback();
  }, [navigate, toast]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <p className="text-muted-foreground">Completing login...</p>
    </div>
  );
};

export default OAuthCallback;
