import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import connectToDatabase from "@/src/lib/mongodb";
import Project from "@/src/db/models/Project";

export async function GET() {
  await connectToDatabase();
  const projects = await Project.find({}).sort({ createdAt: -1 }).populate('owner', 'name image');
  return NextResponse.json(projects);
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  body.owner = session.user.id;
  await connectToDatabase();

  try {
    const project = await Project.create(body);
    return NextResponse.json(project, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}