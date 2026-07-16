import PagePlaceholder from "@/src/components/dev/PagePlaceholder";

export default function SignupPage() {
  return (
    <PagePlaceholder
      module="Authentication"
      page="Signup"
      route="/auth/signup"
      note="Only needed if a Credentials provider is added alongside Google OAuth."
    />
  );
}
