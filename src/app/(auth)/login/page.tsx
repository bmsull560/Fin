import LoginPage from "@/components/auth/LoginPage";
import { AuthLayout } from "@/components/auth/AuthLayout";

export default function Login() {
  return (
    <AuthLayout>
      <LoginPage />
    </AuthLayout>
  );
}
