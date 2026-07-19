import PagePlaceholder from "@/src/components/dev/PagePlaceholder";

export default function EventDetailsPage() {
  return (
    <PagePlaceholder
      module="Events"
      page="Event Details"
      route="/events/[id]"
    />
  );
}
