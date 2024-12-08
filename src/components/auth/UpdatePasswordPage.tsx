import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Rss } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";

const UpdatePasswordPage = () => {
  const navigate = typeof window !== "undefined" ? useNavigate() : () => {};
  const { toast } = useToast();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (typeof window === "undefined") return;

    if (password !== confirmPassword) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Passwords do not match",
      });
      return;
    }

    try {
      setLoading(true);
      const { error } = await supabase.auth.updateUser({
        password: password,
      });
      if (error) throw error;

      toast({
        title: "Success",
        description: "Your password has been updated",
      });
      navigate("/login");
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description:
          error instanceof Error ? error.message : "Failed to update password",
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

          <h2 className="text-3xl font-semibold mb-2">Update your password</h2>
          <p className="text-muted-foreground">Enter your new password below</p>
        </div>

        <div className="bg-card p-8 rounded-lg border">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="password">New Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your new password"
                className="w-full"
                disabled={loading}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm New Password</Label>
              <Input
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm your new password"
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
              {loading ? "Updating password..." : "Update password"}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdatePasswordPage;
