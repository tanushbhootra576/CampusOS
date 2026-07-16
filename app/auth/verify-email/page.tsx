import PagePlaceholder from "@/src/components/dev/PagePlaceholder";

export default function VerifyEmailPage() {
  return (
    <PagePlaceholder
      module="Authentication"
      page="Verify Email"
      route="/auth/verify-email"
      note="Only needed if a Credentials provider is added alongside Google OAuth."
    />
  );
}
