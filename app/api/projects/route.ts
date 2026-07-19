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
    console.error("MongoDB connection failed, returning mock data:", error);
    return NextResponse.json([
      {
        _id: "mock1",
        title: "Campus AI Assistant",
        description: "An AI-powered chatbot designed to help students navigate campus resources, schedules, and club activities.",
        techStack: ["Next.js", "OpenAI API", "TailwindCSS"],
        githubUrl: "#",
        demoUrl: "#",
        image: "",
        owner: "AI Club",
        likes: 15,
        views: 240,
        stars: 12
      },
      {
        _id: "mock2",
        title: "Smart Course Planner",
        description: "A drag-and-drop course scheduling tool with prerequisite tracking and auto-conflict resolution.",
        techStack: ["React", "Node.js", "MongoDB"],
        githubUrl: "#",
        demoUrl: "#",
        image: "",
        owner: "CS Dept",
        likes: 8,
        views: 110,
        stars: 5
      }
    ]);
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