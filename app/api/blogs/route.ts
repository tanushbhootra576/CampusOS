import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import connectToDatabase from "@/src/lib/mongodb";
import Blog from "@/src/db/models/Blog";

export async function GET() {
  await connectToDatabase();
  const blogs = await Blog.find({}).sort({ createdAt: -1 }).populate('author', 'name image');
  return NextResponse.json(blogs);
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  body.author = session.user.id;
  await connectToDatabase();

  try {
    const blog = await Blog.create(body);
    return NextResponse.json(blog, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}