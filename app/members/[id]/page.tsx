import PagePlaceholder from "@/src/components/dev/PagePlaceholder";

export default function MemberDetailsPage() {
  return (
    <PagePlaceholder
      module="Member Management"
      page="Member Details"
      route="/members/[id]"
    />
  );
}
