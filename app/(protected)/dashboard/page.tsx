import AdminDashboard from "@/src/modules/dashboard/AdminDashboard";

export default function Dashboard() {
  return (
    <main className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-7xl px-6 py-8">
        <AdminDashboard />
      </div>
    </main>
  );
}