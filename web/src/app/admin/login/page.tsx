import type { Metadata } from "next";
import { LoginForm } from "@/components/admin/LoginForm";

export const metadata: Metadata = {
  title: "Sign in — EvalLense CMS",
  robots: { index: false, follow: false },
};

export default function LoginPage() {
  return (
    <div className="admin-login">
      <div className="admin-login__card">
        <h1 className="admin-login__title">EvalLense CMS</h1>
        <LoginForm />
      </div>
    </div>
  );
}
