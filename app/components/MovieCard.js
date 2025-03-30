/*
Author: Alessandra Nicole Claur
Date: 30/03/2025
Description:
This React component displays details of a movie, including its title, release year, and a list of actors.
It also provides edit and delete functionalities if the user has admin privileges.

Inputs:
- movie: An object containing movie details (title, release year, and actors list).
- onEdit: A function triggered when the edit button is clicked.
- onDelete: A function triggered when the delete button is clicked.

Processing:
- The component renders the movie details inside a styled card.
- If the user is an admin, edit and delete buttons are displayed.

Outputs:
- A card displaying the movie information.
- Admin users can access buttons for editing and deleting the movie entry.
*/

"use client";

import { useAdmin } from "../context/AdminContext";

const MovieCard = ({ movie, onEdit, onDelete }) => {
  const { adminView } = useAdmin();

  return (
    <div className="bg-white border border-gray-500 rounded">
      <div className="p-6">
        <h2 className="text-xl font-bold mb-1">{movie.title}</h2>
        <p className="text-gray-600 mb-4">Released: {movie.releaseYear}</p>

        <div>
          <p className="font-medium mb-2">Actors:</p>
          <div className="flex flex-wrap gap-2 mb-4">
            {movie.actors.map((actor, index) => (
              <span
                key={index}
                className="bg-gray-200 px-2 py-1 rounded-md text-sm"
              >
                {actor}
              </span>
            ))}
          </div>
        </div>

        {adminView && (
          <div className="flex gap-2">
            <button
              className="flex items-center px-3 py-1.5 border border-gray-300 rounded text-sm bg-white"
              onClick={onEdit}
            >
              <svg
                width="16"
                height="16"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                className="mr-1"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                ></path>
              </svg>
              Edit
            </button>
            <button
              className="flex items-center px-3 py-1.5 bg-red-500 text-white rounded text-sm border-none"
              onClick={onDelete}
            >
              <svg
                width="16"
                height="16"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                className="mr-1"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                ></path>
              </svg>
              Delete
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default MovieCard;
