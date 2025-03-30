/*
Author: Mitzi Vera Escartin
Date: 30/03/2025
Description:
This file handles API operations (GET and POST) for the movies database.
The GET function fetches all movie records, ordered by their creation date.
The POST function adds a new movie record to the database after validating the input.

Inputs:
- For GET: No specific inputs required.
- For POST:
  - title: The title of the movie (string).
  - actors: The list of actors in the movie (array or comma-separated string).
  - releaseYear: The year the movie was released (integer).

Processing:
- GET retrieves all movies from the database, ordered by the most recently created.
- POST validates the input fields and creates a new movie record in the database.

Outputs:
- GET: A JSON array of movie records (title, actors, releaseYear, createdAt).
- POST: The newly created movie record in JSON format.
- Errors: Returns an error message with appropriate status codes if issues occur (e.g., missing fields, server error).
*/

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
