/*
Author: Mitzi Vera Escartin
Date: 30/03/2025
Description:
This React component displays information about a movie, including its title, release year, and list of actors.
Admin users are given access to edit and delete buttons for managing the movie entry.

Inputs:
- movie: An object containing the movie's details (title, release year, and list of actors).
- onEdit: A callback function that is executed when the edit button is clicked.
- onDelete: A callback function that is executed when the delete button is clicked.

Processing:
- The component creates a card with the movie's details.
- It checks for admin privileges and shows edit and delete buttons accordingly.

Outputs:
- A styled card with movie details (title, release year, and actors list).
- Edit and delete buttons for admin users to manage the movie entry.
*/

import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";

// Force dynamic rendering for this route
export const dynamic = "force-dynamic";

// GET a specific movie by ID
export async function GET(request, { params }) {
  try {
    const { id } = params;

    // // During build time, return a mock response
    // if (process.env.NEXT_PHASE === "phase-production-build") {
    //   return NextResponse.json({
    //     id: "mock-id",
    //     title: "Sample Movie",
    //     releaseYear: 2023,
    //     actors: ["Actor 1", "Actor 2"],
    //   });
    // }

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
