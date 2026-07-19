import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import clientPromise from "@/src/lib/mongodb-client";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const client = await clientPromise;
  const db = client.db();

  const project = await db.collection("projects").findOne({
    _id: new ObjectId(id),
  });

  if (!project) {
    return NextResponse.json(
      { error: "Project not found" },
      { status: 404 }
    );
  }

  return NextResponse.json(project);
}

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const body = await req.json();

  const client = await clientPromise;
  const db = client.db();

  await db.collection("projects").updateOne(
    {
      _id: new ObjectId(id),
    },
    {
      $set: body,
    }
  );

  return NextResponse.json({
    message: "Project updated",
  });
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const client = await clientPromise;
  const db = client.db();

  await db.collection("projects").deleteOne({
    _id: new ObjectId(id),
  });

  return NextResponse.json({
    message: "Project deleted",
  });
}