import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import clientPromise from "@/src/lib/mongodb-client";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const client = await clientPromise;
  const db = client.db();

  const event = await db.collection("events").findOne({
    _id: new ObjectId(params.id),
  });

  if (!event) {
    return NextResponse.json(
      { error: "Event not found" },
      { status: 404 }
    );
  }

  return NextResponse.json(event);
}

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  const body = await req.json();

  const client = await clientPromise;
  const db = client.db();

  await db.collection("events").updateOne(
    { _id: new ObjectId(params.id) },
    { $set: body }
  );

  return NextResponse.json({
    message: "Event updated",
  });
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  const client = await clientPromise;
  const db = client.db();

  await db.collection("events").deleteOne({
    _id: new ObjectId(params.id),
  });

  return NextResponse.json({
    message: "Event deleted",
  });
}