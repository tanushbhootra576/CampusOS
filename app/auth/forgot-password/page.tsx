import PagePlaceholder from "@/src/components/dev/PagePlaceholder";

export default function ForgotPasswordPage() {
  return (
    <PagePlaceholder
      module="Authentication"
      page="Forgot Password"
      route="/auth/forgot-password"
      note="Only needed if a Credentials provider is added alongside Google OAuth."
    />
  );
}
