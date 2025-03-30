import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";

// GET a specific movie by ID
export async function GET(request, { params }) {
  try {
    const { id } = params;

    const movie = await prisma.movie.findUnique({
      where: {
        id: id,
      },
    });

    if (!movie) {
      return NextResponse.json({ error: "Movie not found" }, { status: 404 });
    }

    return NextResponse.json(movie);
  } catch (error) {
    console.error("Error fetching movie:", error);
    return NextResponse.json(
      { error: "Failed to fetch movie" },
      { status: 500 }
    );
  }
}

// UPDATE a movie by ID
export async function PUT(request, { params }) {
  try {
    const { id } = params;
    const body = await request.json();
    const { title, releaseYear, actors } = body;

    if (!title || !releaseYear || !actors) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Ensure actors is an array
    const actorsArray = Array.isArray(actors)
      ? actors
      : actors.split(",").map((actor) => actor.trim());

    const movie = await prisma.movie.update({
      where: {
        id: id,
      },
      data: {
        title,
        releaseYear: parseInt(releaseYear),
        actors: actorsArray,
      },
    });

    return NextResponse.json(movie);
  } catch (error) {
    console.error("Error updating movie:", error);
    return NextResponse.json(
      { error: "Failed to update movie" },
      { status: 500 }
    );
  }
}

// DELETE a movie by ID
export async function DELETE(request, { params }) {
  try {
    const { id } = params;

    await prisma.movie.delete({
      where: {
        id: id,
      },
    });

    return NextResponse.json({ message: "Movie deleted successfully" });
  } catch (error) {
    console.error("Error deleting movie:", error);
    return NextResponse.json(
      { error: "Failed to delete movie" },
      { status: 500 }
    );
  }
}
