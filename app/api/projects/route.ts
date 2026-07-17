import { NextResponse } from "next/server";
import clientPromise from "@/src/lib/mongodb-client";

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db();

    const projects = await db
      .collection("projects")
      .find({})
      .sort({ createdAt: -1 })
      .toArray();

    return NextResponse.json(projects);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to fetch projects" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const client = await clientPromise;
    const db = client.db();

    const project = {
      title: body.title,
      description: body.description,
      techStack: body.techStack ?? [],
      githubUrl: body.githubUrl ?? "",
      demoUrl: body.demoUrl ?? "",
      image: body.image ?? "",
      owner: body.owner ?? "",
      likes: 0,
      views: 0,
      createdAt: new Date(),
    };

    const result = await db.collection("projects").insertOne(project);

    return NextResponse.json(
      {
        _id: result.insertedId,
        ...project,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to create project" },
      { status: 500 }
    );
  }
}