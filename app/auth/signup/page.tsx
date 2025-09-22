// app/auth/signup/page.tsx
import AuthForm from "@/src/components/AuthForm";

export default function SignupPage() {
  return (
    <section className="py-12">
      <AuthForm type="signup" />
    </section>
  );
}
