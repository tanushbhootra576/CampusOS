import PagePlaceholder from "@/src/components/dev/PagePlaceholder";

export default function AttendancePage() {
  return (
    <PagePlaceholder
      module="Member Management"
      page="Attendance"
      route="/members/[id]/attendance"
    />
  );
}
