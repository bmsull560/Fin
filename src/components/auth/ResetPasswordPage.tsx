import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Rss, KeyRound } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";

const ResetPasswordPage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/update-password`,
      });
      if (error) throw error;

      toast({
        title: "Success",
        description: "Check your email for the password reset link",
      });
      navigate("/login");
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description:
          error instanceof Error ? error.message : "Failed to reset password",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <div className="flex items-center justify-center gap-2 mb-8">
            <Rss className="h-8 w-8" />
            <h1 className="text-2xl font-bold">RSS Reader</h1>
          </div>

          <h2 className="text-3xl font-semibold mb-2">Reset your password</h2>
          <p className="text-muted-foreground">
            Enter your email address and we'll send you a link to reset your
            password
          </p>
        </div>

        <div className="bg-card p-8 rounded-lg border">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email">Email address</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full"
                disabled={loading}
                required
              />
            </div>

            <Button
              className="w-full"
              size="lg"
              type="submit"
              disabled={loading}
            >
              {loading ? "Sending reset link..." : "Send reset link"}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <Button
              variant="link"
              className="text-sm"
              onClick={() => navigate("/login")}
            >
              Back to login
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPasswordPage;
