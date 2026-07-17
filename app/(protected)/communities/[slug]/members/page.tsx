import PagePlaceholder from "@/src/components/dev/PagePlaceholder";

export default function MembersPage() {
  return (
    <PagePlaceholder
      module="Community"
      page="Members"
      route="/communities/[slug]/members"
    />
  );
}
