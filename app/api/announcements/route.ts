import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import connectToDatabase from "@/src/lib/mongodb";
import Announcement from "@/src/db/models/Announcement";

export async function GET() {
  await connectToDatabase();
  const announcements = await Announcement.find({}).sort({ createdAt: -1 }).populate('club', 'name logoUrl');
  return NextResponse.json(announcements);
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  
  if (!session || !['super_admin', 'club_admin'].includes(session.user.role as string)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  await connectToDatabase();

  try {
    const announcement = await Announcement.create(body);
    return NextResponse.json(announcement, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
