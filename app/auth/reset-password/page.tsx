import PagePlaceholder from "@/src/components/dev/PagePlaceholder";

export default function ResetPasswordPage() {
  return (
    <PagePlaceholder
      module="Authentication"
      page="Reset Password"
      route="/auth/reset-password"
      note="Only needed if a Credentials provider is added alongside Google OAuth."
    />
  );
}
