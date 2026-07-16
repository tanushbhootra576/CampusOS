// One-off scaffold generator for the real CampusOS repo conventions:
// - routes live in root app/ (not src/app/)
// - import alias is "@/src/..." (tsconfig paths -> "./*")
// - PagePlaceholder is a default export
// Run with: node scaffold-routes.mjs
//
// Skips any route where page.tsx already exists, so real work
// (events, blogs, leaderboard, projects, dashboard, auth/signin) is untouched.

import fs from "fs";
import path from "path";

const APP_DIR = path.join(process.cwd(), "app");

const routes = [
  // ---------- Public (about / communities list only — events/blogs/etc already exist at root) ----------
  { route: "(public)/about", module: "Public", page: "About" },
  { route: "(public)/communities", module: "Public", page: "Communities" },

  // ---------- Authentication ----------
  // NOTE: current auth is Google OAuth only (see app/auth/signin). These are
  // placeholders in case the team later adds a Credentials provider (e.g.
  // college-email signup/verification) — confirm with the team before
  // building these out for real.
  { route: "auth/signup", module: "Authentication", page: "Signup", note: "Only needed if a Credentials provider is added alongside Google OAuth." },
  { route: "auth/forgot-password", module: "Authentication", page: "Forgot Password", note: "Only needed if a Credentials provider is added alongside Google OAuth." },
  { route: "auth/reset-password", module: "Authentication", page: "Reset Password", note: "Only needed if a Credentials provider is added alongside Google OAuth." },
  { route: "auth/verify-email", module: "Authentication", page: "Verify Email", note: "Only needed if a Credentials provider is added alongside Google OAuth." },
  { route: "auth/complete-profile", module: "Authentication", page: "Complete Profile" },

  // ---------- Student Dashboard (extends existing (protected) group) ----------
  { route: "(protected)/my-clubs", module: "Student Dashboard", page: "My Clubs" },
  { route: "(protected)/my-events", module: "Student Dashboard", page: "My Events" },
  { route: "(protected)/my-certificates", module: "Student Dashboard", page: "My Certificates" },
  { route: "(protected)/my-blogs", module: "Student Dashboard", page: "My Blogs" },
  { route: "(protected)/my-projects", module: "Student Dashboard", page: "My Projects" },
  { route: "(protected)/notifications", module: "Student Dashboard", page: "Notifications" },
  { route: "(protected)/settings", module: "Student Dashboard", page: "Settings" },

  // ---------- Community Pages ----------
  { route: "communities/[slug]", isLayout: true, module: "Community", page: "Community Layout" },
  { route: "communities/[slug]", module: "Community", page: "Community Home" },
  { route: "communities/[slug]/about", module: "Community", page: "About" },
  { route: "communities/[slug]/members", module: "Community", page: "Members" },
  { route: "communities/[slug]/events", module: "Community", page: "Events" },
  { route: "communities/[slug]/blogs", module: "Community", page: "Blogs" },
  { route: "communities/[slug]/projects", module: "Community", page: "Projects" },
  { route: "communities/[slug]/gallery", module: "Community", page: "Gallery" },
  { route: "communities/[slug]/leaderboard", module: "Community", page: "Leaderboard" },
  { route: "communities/[slug]/announcements", module: "Community", page: "Announcements" },
  { route: "communities/[slug]/join", module: "Community", page: "Join Community" },

  // ---------- Events (extends existing events/page.tsx) ----------
  { route: "events/create", module: "Events", page: "Create Event" },
  { route: "events/my-registrations", module: "Events", page: "My Registrations" },
  { route: "events/[id]", module: "Events", page: "Event Details" },
  { route: "events/[id]/register", module: "Events", page: "Register" },
  { route: "events/[id]/attendance", module: "Events", page: "Attendance" },
  { route: "events/[id]/certificate", module: "Events", page: "Certificate" },
  { route: "events/[id]/edit", module: "Events", page: "Edit Event" },
  { route: "events/[id]/manage-registrations", module: "Events", page: "Manage Registrations" },
  { route: "events/[id]/analytics", module: "Events", page: "Analytics" },

  // ---------- Member Management ----------
  { route: "members", module: "Member Management", page: "Members List" },
  { route: "members/add", module: "Member Management", page: "Add Member" },
  { route: "members/bulk-import", module: "Member Management", page: "Bulk Import" },
  { route: "members/bulk-export", module: "Member Management", page: "Bulk Export" },
  { route: "members/[id]", module: "Member Management", page: "Member Details" },
  { route: "members/[id]/edit", module: "Member Management", page: "Edit Member" },
  { route: "members/[id]/role", module: "Member Management", page: "Role Assignment" },
  { route: "members/[id]/attendance", module: "Member Management", page: "Attendance" },

  // ---------- Blogs (extends existing blogs/page.tsx) ----------
  { route: "blogs/write", module: "Blogs", page: "Write Blog" },
  { route: "blogs/drafts", module: "Blogs", page: "Drafts" },
  { route: "blogs/my-blogs", module: "Blogs", page: "My Blogs" },
  { route: "blogs/categories", module: "Blogs", page: "Categories" },
  { route: "blogs/admin-approval", module: "Blogs", page: "Admin Approval" },
  { route: "blogs/bookmarks", module: "Blogs", page: "Bookmarks" },
  { route: "blogs/[id]", module: "Blogs", page: "Blog Details" },
  { route: "blogs/[id]/edit", module: "Blogs", page: "Edit Blog" },

  // ---------- Projects (extends existing projects/page.tsx) ----------
  { route: "projects/add", module: "Projects", page: "Add Project" },
  { route: "projects/my-projects", module: "Projects", page: "My Projects" },
  { route: "projects/approval-queue", module: "Projects", page: "Approval Queue" },
  { route: "projects/categories", module: "Projects", page: "Categories" },
  { route: "projects/search", module: "Projects", page: "Search" },
  { route: "projects/[id]", module: "Projects", page: "Project Details" },
  { route: "projects/[id]/edit", module: "Projects", page: "Edit Project" },

  // ---------- Gallery ----------
  { route: "gallery", module: "Gallery", page: "Gallery" },
  { route: "gallery/upload", module: "Gallery", page: "Upload Photos" },
  { route: "gallery/manage", module: "Gallery", page: "Album Management" },
  { route: "gallery/[albumId]", module: "Gallery", page: "Album" },
  { route: "gallery/[albumId]/download", module: "Gallery", page: "Download Album" },
  { route: "gallery/[albumId]/[imageId]", module: "Gallery", page: "Image Viewer" },

  // ---------- Leaderboard (extends existing leaderboard/page.tsx) ----------
  { route: "leaderboard/my-rank", module: "Leaderboard", page: "My Rank" },
  { route: "leaderboard/achievements", module: "Leaderboard", page: "Achievement History" },
  { route: "leaderboard/community/[slug]", module: "Leaderboard", page: "Community Leaderboard" },

  // ---------- Admin Dashboard ----------
  // NOTE: distinct from (protected)/dashboard, which currently renders the
  // AdminDashboard component directly. Confirm with the team whether
  // /dashboard and /admin should be merged or kept separate before building
  // these out — flagged, not decided here.
  { route: "admin", isLayout: true, module: "Admin", page: "Admin Layout" },
  { route: "admin", module: "Admin", page: "Overview" },
  { route: "admin/analytics", module: "Admin", page: "Analytics" },
  { route: "admin/communities", module: "Admin", page: "Community Management" },
  { route: "admin/events", module: "Admin", page: "Event Management" },
  { route: "admin/announcements", module: "Admin", page: "Announcement Management" },
  { route: "admin/blogs", module: "Admin", page: "Blog Management" },
  { route: "admin/projects", module: "Admin", page: "Project Approval" },
  { route: "admin/gallery", module: "Admin", page: "Gallery Management" },
  { route: "admin/reports", module: "Admin", page: "User Reports" },
  { route: "admin/activity-logs", module: "Admin", page: "Activity Logs" },
  { route: "admin/notifications", module: "Admin", page: "Notifications" },
  { route: "admin/settings", module: "Admin", page: "Settings" },

  // ---------- Super Admin ----------
  // NOTE: the User model's `role` enum is currently 'student' | 'admin' |
  // 'faculty' — it doesn't have 'super-admin' yet. This needs a data-model
  // decision from the team before real access control can be added here.
  { route: "super-admin", isLayout: true, module: "Super Admin", page: "Super Admin Layout" },
  { route: "super-admin", module: "Super Admin", page: "Platform Dashboard" },
  { route: "super-admin/communities", module: "Super Admin", page: "All Communities" },
  { route: "super-admin/communities/create", module: "Super Admin", page: "Create Community" },
  { route: "super-admin/admins", module: "Super Admin", page: "Admin Management" },
  { route: "super-admin/users", module: "Super Admin", page: "User Management" },
  { route: "super-admin/analytics", module: "Super Admin", page: "Platform Analytics" },
  { route: "super-admin/audit-logs", module: "Super Admin", page: "Audit Logs" },
  { route: "super-admin/roles-permissions", module: "Super Admin", page: "Roles & Permissions" },
  { route: "super-admin/system-settings", module: "Super Admin", page: "System Settings" },
  { route: "super-admin/email-templates", module: "Super Admin", page: "Email Templates" },
  { route: "super-admin/feature-flags", module: "Super Admin", page: "Feature Flags" },
  { route: "super-admin/backup-restore", module: "Super Admin", page: "Backup & Restore" },
];

function toUrlPath(route) {
  return (
    "/" +
    route
      .split("/")
      .filter((seg) => !seg.startsWith("("))
      .join("/")
  );
}

function pageComponentName(page) {
  return page.replace(/[^a-zA-Z0-9]/g, "") + "Page";
}

let created = 0;
let skipped = 0;

for (const entry of routes) {
  const dir = path.join(APP_DIR, entry.route);
  fs.mkdirSync(dir, { recursive: true });

  if (entry.isLayout) {
    const filePath = path.join(dir, "layout.tsx");
    if (fs.existsSync(filePath)) {
      skipped++;
      continue;
    }
    const content = `export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  // TODO: add shared nav/sidebar for the "${entry.module}" section here.
  return <>{children}</>;
}
`;
    fs.writeFileSync(filePath, content);
    created++;
    continue;
  }

  const filePath = path.join(dir, "page.tsx");
  if (fs.existsSync(filePath)) {
    skipped++;
    continue;
  }

  const urlPath = toUrlPath(entry.route);
  const componentName = pageComponentName(entry.page);
  const noteProp = entry.note ? `\n      note="${entry.note}"` : "";

  const content = `import PagePlaceholder from "@/src/components/dev/PagePlaceholder";

export default function ${componentName}() {
  return (
    <PagePlaceholder
      module="${entry.module}"
      page="${entry.page}"
      route="${urlPath}"${noteProp}
    />
  );
}
`;
  fs.writeFileSync(filePath, content);
  created++;
}

console.log(`Created ${created} route files, skipped ${skipped} existing files.`);
