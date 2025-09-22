// app/auth/login/page.tsx
import AuthForm from "@/src/components/AuthForm";

export default function LoginPage() {
  return (
    <section className="py-12">
      <AuthForm type="login" />
    </section>
  );
}
