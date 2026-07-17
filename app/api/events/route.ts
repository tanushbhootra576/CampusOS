import { NextResponse } from "next/server";
import clientPromise from "@/src/lib/mongodb-client";

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db();

    const events = await db
      .collection("events")
      .find({})
      .sort({ date: 1 })
      .toArray();

    return NextResponse.json(events);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to fetch events" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const event = {
      title: body.title,
      description: body.description,
      category: body.category,
      location: body.location,
      date: body.date,
      image: body.image ?? "",
      attendees: 0,
      createdAt: new Date(),
    };

    const client = await clientPromise;
    const db = client.db();

    const result = await db.collection("events").insertOne(event);

    return NextResponse.json(
      {
        _id: result.insertedId,
        ...event,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to create event" },
      { status: 500 }
    );
  }
}