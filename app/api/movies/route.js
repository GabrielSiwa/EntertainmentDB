// /*
// Author: Mitzi Vera Escartin
// Date: 30/03/2025
// Description:
// This file handles API operations (GET and POST) for the movies database.
// The GET function fetches all movie records, ordered by their creation date.
// The POST function adds a new movie record to the database after validating the input.

// Inputs:
// - For GET: No specific inputs required.
// - For POST:
//   - title: The title of the movie (string).
//   - actors: The list of actors in the movie (array or comma-separated string).
//   - releaseYear: The year the movie was released (integer).

// Processing:
// - GET retrieves all movies from the database, ordered by the most recently created.
// - POST validates the input fields and creates a new movie record in the database.

// Outputs:
// - GET: A JSON array of movie records (title, actors, releaseYear, createdAt).
// - POST: The newly created movie record in JSON format.
// - Errors: Returns an error message with appropriate status codes if issues occur (e.g., missing fields, server error).
// */

// import { NextResponse } from "next/server";
// import prisma from "@/app/libs/prismadb";

// export async function GET() {
//   try {
//     const movies = await prisma.movie.findMany({
//       orderBy: {
//         createdAt: "desc",
//       },
//     });

//     return NextResponse.json(movies);
//   } catch (error) {
//     console.error("Error fetching movies:", error);
//     return NextResponse.json(
//       { message: "Error fetching movies" },
//       { status: 500 }
//     );
//   }
// }

// export async function POST(request) {
//   try {
//     const body = await request.json();
//     const { title, actors, releaseYear } = body;

//     // Validation
//     if (!title || !actors || !releaseYear) {
//       return NextResponse.json(
//         { message: "Missing required fields" },
//         { status: 400 }
//       );
//     }

//     // Create movie
//     const movie = await prisma.movie.create({
//       data: {
//         title,
//         actors,
//         releaseYear,
//       },
//     });

//     return NextResponse.json(movie, { status: 201 });
//   } catch (error) {
//     console.error("Error creating movie:", error);
//     return NextResponse.json(
//       { message: "Error creating movie" },
//       { status: 500 }
//     );
//   }
// }

import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";

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
        releaseYear: Number.parseInt(releaseYear),
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
