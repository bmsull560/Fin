import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { LineChart, BarChart3, Rss } from "lucide-react";

const LoginPage = () => {
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

          <form className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email">Email address</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                className="w-full"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                className="w-full"
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
              <Button variant="link" className="text-sm">
                Forgot password?
              </Button>
            </div>

            <Button className="w-full" size="lg">
              Sign in
            </Button>

            <p className="text-center text-sm text-muted-foreground">
              Don't have an account?{" "}
              <Button variant="link" className="text-sm">
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
