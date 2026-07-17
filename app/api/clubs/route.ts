import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import connectToDatabase from "@/src/lib/mongodb";
import Community from "@/src/db/models/Community";

export async function GET() {
  await connectToDatabase();
  const clubs = await Community.find({}).populate('members', 'name email');
  return NextResponse.json(clubs);
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  
  if (!session || session.user.role !== 'super_admin') {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  await connectToDatabase();

  try {
    const club = await Community.create(body);
    return NextResponse.json(club, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
