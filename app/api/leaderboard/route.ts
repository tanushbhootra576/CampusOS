import { NextResponse } from "next/server";
import clientPromise from "@/src/lib/mongodb-client";

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db();

    const users = await db.collection("users").find({}).toArray();
    const projects = await db.collection("projects").find({}).toArray();
    const blogs = await db.collection("blogs").find({}).toArray();
    const events = await db.collection("events").find({}).toArray();

    const leaderboard = users.map((user) => {
      const userProjects = projects.filter(
        (p) => p.owner === user.email
      );

      const userBlogs = blogs.filter(
        (b) => b.author === user.email
      );

      const registeredEvents = events.filter(
        (e) => (e.registeredUsers ?? []).includes(user.email)
      );

      const score =
        userProjects.length * 50 +
        userBlogs.length * 25 +
        registeredEvents.length * 10;

      return {
        id: user._id,
        name: user.name,
        email: user.email,
        image: user.image,
        score,
        projects: userProjects.length,
        blogs: userBlogs.length,
        events: registeredEvents.length,
      };
    });

    leaderboard.sort((a, b) => b.score - a.score);

    return NextResponse.json(leaderboard);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error: "Failed to generate leaderboard",
      },
      {
        status: 500,
      }
    );
  }
}