import PagePlaceholder from "@/src/components/dev/PagePlaceholder";

export default function EditMemberPage() {
  return (
    <PagePlaceholder
      module="Member Management"
      page="Edit Member"
      route="/members/[id]/edit"
    />
  );
}
