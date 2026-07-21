import type { Metadata } from "next";
import { BrandLogo } from "@/components/BrandLogo";
import { LoginForm } from "@/components/admin/LoginForm";

export const metadata: Metadata = {
  title: "Sign in — EvalLens CMS",
  robots: { index: false, follow: false },
};

export default function LoginPage() {
  return (
    <div className="admin-login">
      <div className="admin-login__card">
        <h1 className="admin-login__title" aria-label="EvalLens CMS">
          <BrandLogo tone="dark" />
          <span>CMS</span>
        </h1>
        <LoginForm />
      </div>
    </div>
  );
}
