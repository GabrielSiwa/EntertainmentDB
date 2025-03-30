import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";

export async function GET() {
  try {
    const movies = await prisma.movie.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(movies);
  } catch (error) {
    console.error("Error fetching movies:", error);
    return NextResponse.json(
      { message: "Error fetching movies" },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { title, actors, releaseYear } = body;

    // Validation
    if (!title || !actors || !releaseYear) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }

    // Create movie
    const movie = await prisma.movie.create({
      data: {
        title,
        actors,
        releaseYear,
      },
    });

    return NextResponse.json(movie, { status: 201 });
  } catch (error) {
    console.error("Error creating movie:", error);
    return NextResponse.json(
      { message: "Error creating movie" },
      { status: 500 }
    );
  }
}
