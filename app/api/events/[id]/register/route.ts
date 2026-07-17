import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import clientPromise from "@/src/lib/mongodb-client";

export async function POST(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const client = await clientPromise;
  const db = client.db();

  await db.collection("events").updateOne(
    {
      _id: new ObjectId(id),
    },
    {
      $inc: {
        attendees: 1,
      },
    }
  );

  return NextResponse.json({
    success: true,
  });
}