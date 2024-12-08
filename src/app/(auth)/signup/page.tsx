import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/lib/auth/auth-provider";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { Loader2 } from "lucide-react";

export default function SignUpPage() {
  const navigate = useNavigate();
  const { signUp } = useAuth();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);

    const formData = new FormData(event.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    const { error } = await signUp(email, password);

    if (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message,
      });
      setLoading(false);
      return;
    }

    toast({
      title: "Check your email",
      description: "We sent you a confirmation link.",
    });
    setLoading(false);
    navigate("/auth/login");
  }

  return (
    <div className="flex h-screen w-screen items-center justify-center">
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <div className="flex flex-col space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">
            Create an account
          </h1>
          <p className="text-sm text-muted-foreground">
            Enter your email below to create your account
          </p>
        </div>

        <form onSubmit={onSubmit}>
          <div className="grid gap-6">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                placeholder="name@example.com"
                type="email"
                autoCapitalize="none"
                autoComplete="email"
                autoCorrect="off"
                disabled={loading}
                name="email"
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                disabled={loading}
                name="password"
                required
              />
            </div>
            <Button disabled={loading}>
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Sign Up
            </Button>
          </div>
        </form>

        <div className="text-center text-sm">
          Already have an account?{" "}
          <Button
            variant="link"
            className="underline"
            onClick={() => navigate("/auth/login")}
          >
            Sign in
          </Button>
        </div>
      </div>
    </div>
  );
}
