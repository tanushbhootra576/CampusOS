import PagePlaceholder from "@/src/components/dev/PagePlaceholder";

export default function EditEventPage() {
  return (
    <PagePlaceholder
      module="Events"
      page="Edit Event"
      route="/events/[id]/edit"
    />
  );
}
