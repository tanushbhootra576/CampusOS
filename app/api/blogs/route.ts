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
    console.error(error);
    return NextResponse.json(
      { error: "Failed to fetch blogs" },
      { status: 500 }
    );
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