import SignUpPage from "@/components/auth/SignUpPage";
import { AuthLayout } from "@/components/auth/AuthLayout";

export default function SignUp() {
  return (
    <AuthLayout>
      <SignUpPage />
    </AuthLayout>
  );
}
