import PagePlaceholder from "@/src/components/dev/PagePlaceholder";

export default function AttendancePage() {
  return (
    <PagePlaceholder
      module="Events"
      page="Attendance"
      route="/events/[id]/attendance"
    />
  );
}
