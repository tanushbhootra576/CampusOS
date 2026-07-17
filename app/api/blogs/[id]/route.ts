import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import clientPromise from "@/src/lib/mongodb-client";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const client = await clientPromise;
  const db = client.db();

  const blog = await db.collection("blogs").findOne({
    _id: new ObjectId(params.id),
  });

  if (!blog) {
    return NextResponse.json(
      { error: "Blog not found" },
      { status: 404 }
    );
  }

  return NextResponse.json(blog);
}

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  const body = await req.json();

  const client = await clientPromise;
  const db = client.db();

  await db.collection("blogs").updateOne(
    {
      _id: new ObjectId(params.id),
    },
    {
      $set: body,
    }
  );

  return NextResponse.json({
    message: "Blog updated",
  });
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  const client = await clientPromise;
  const db = client.db();

  await db.collection("blogs").deleteOne({
    _id: new ObjectId(params.id),
  });

  return NextResponse.json({
    message: "Blog deleted",
  });
}