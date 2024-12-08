import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { LineChart, BarChart3, Rss, Github } from "lucide-react";
import { useAuth } from "@/lib/auth.tsx";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/lib/supabase";
import { Separator } from "@/components/ui/separator";

const LoginPage = () => {
  const { signIn } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      const { error } = await signIn(email, password);
      if (error) throw error;
      navigate("/");
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description:
          error instanceof Error ? error.message : "Failed to sign in",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleOAuthLogin = async (provider: "google" | "github") => {
    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider,
        options: {
          redirectTo: `${window.location.origin}/oauth/callback`,
        },
      });
      if (error) throw error;
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description:
          error instanceof Error ? error.message : "Failed to sign in",
      });
    }
  };

  return (
    <div className="min-h-screen bg-background flex">
      {/* Left Panel - Login Form */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center px-8 lg:px-16">
        <div className="max-w-md w-full mx-auto">
          <div className="flex items-center gap-2 mb-8">
            <Rss className="h-8 w-8" />
            <h1 className="text-2xl font-bold">RSS Reader</h1>
          </div>

          <h2 className="text-3xl font-semibold mb-2">Welcome back</h2>
          <p className="text-muted-foreground mb-8">
            Sign in to continue to RSS Reader
          </p>

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

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="w-full"
                disabled={loading}
                required
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Checkbox id="remember" />
                <label
                  htmlFor="remember"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Remember me
                </label>
              </div>
              <Button
                variant="link"
                className="text-sm"
                onClick={() => navigate("/reset-password")}
              >
                Forgot password?
              </Button>
            </div>

            <Button
              className="w-full"
              size="lg"
              type="submit"
              disabled={loading}
            >
              {loading ? "Signing in..." : "Sign in"}
            </Button>

            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <Separator className="w-full" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">
                  Or continue with
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Button
                variant="outline"
                onClick={() => handleOAuthLogin("google")}
                disabled={loading}
                className="w-full"
              >
                <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
                  <path
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    fill="#4285F4"
                  />
                  <path
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    fill="#34A853"
                  />
                  <path
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    fill="#FBBC05"
                  />
                  <path
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    fill="#EA4335"
                  />
                </svg>
                Google
              </Button>

              <Button
                variant="outline"
                onClick={() => handleOAuthLogin("github")}
                disabled={loading}
                className="w-full"
              >
                <Github className="mr-2 h-4 w-4" />
                GitHub
              </Button>
            </div>

            <p className="text-center text-sm text-muted-foreground">
              Don't have an account?{" "}
              <Button
                variant="link"
                className="text-sm"
                onClick={() => navigate("/signup")}
              >
                Sign up
              </Button>
            </p>
          </form>
        </div>
      </div>

      {/* Right Panel - Feature Showcase */}
      <div className="hidden lg:flex w-1/2 bg-muted items-center justify-center p-8">
        <div className="max-w-md space-y-6">
          <h2 className="text-2xl font-semibold mb-4">
            Stay Updated with RSS Reader
          </h2>
          <div className="space-y-8">
            <div className="flex items-start gap-4">
              <div className="p-2 rounded-lg bg-background">
                <LineChart className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-medium mb-1">Track Your Reading</h3>
                <p className="text-sm text-muted-foreground">
                  Monitor your reading habits and stay on top of your favorite
                  content
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="p-2 rounded-lg bg-background">
                <BarChart3 className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-medium mb-1">Insightful Analytics</h3>
                <p className="text-sm text-muted-foreground">
                  Get detailed insights about your reading patterns and
                  interests
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="p-2 rounded-lg bg-background">
                <Rss className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-medium mb-1">Organized Feeds</h3>
                <p className="text-sm text-muted-foreground">
                  Keep all your favorite RSS feeds organized in one place
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
