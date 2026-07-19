import { NextResponse } from "next/server";
import clientPromise from "@/src/lib/mongodb-client";

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db();

    const blogs = await db
      .collection("blogs")
      .find({})
      .sort({ createdAt: -1 })
      .toArray();

    return NextResponse.json(blogs);
  } catch (error) {
    console.error("MongoDB connection failed, returning mock data:", error);
    return NextResponse.json([
      {
        _id: "mock1",
        title: "How to Build a Startup in College",
        description: "A complete guide on balancing academics and building a successful startup right from your dorm room.",
        author: "Alex Rivera",
        category: "Entrepreneurship",
        image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=800&auto=format&fit=crop",
        likes: 120,
        createdAt: new Date().toISOString()
      },
      {
        _id: "mock2",
        title: "Top 10 Open Source Projects to Contribute To",
        description: "Boost your resume by contributing to these beginner-friendly open-source repositories.",
        author: "Sarah Jenkins",
        category: "Open Source",
        image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=800&auto=format&fit=crop",
        likes: 85,
        createdAt: new Date().toISOString()
      }
    ]);
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const blog = {
      title: body.title,
      description: body.description,
      content: body.content,
      author: body.author,
      category: body.category,
      tags: body.tags ?? [],
      image: body.image ?? "",
      likes: 0,
      createdAt: new Date(),
    };

    const client = await clientPromise;
    const db = client.db();

    const result = await db.collection("blogs").insertOne(blog);

    return NextResponse.json(
      {
        _id: result.insertedId,
        ...blog,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to create blog" },
      { status: 500 }
    );
  }
}