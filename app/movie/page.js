"use client";

import { useState, useEffect } from "react";
import MovieCard from "./../components/MovieCard";
import AddMovieModal from "./../components/AddMovieModal";
import EditMovieModal from "./../components/EditMovieModal";
import { useAdmin } from "./../context/AdminContext";

export default function Home() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [currentMovie, setCurrentMovie] = useState(null);
  const { adminView } = useAdmin();

  // Fetch movies from the API
  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch("./api/movies");
        if (!response.ok) {
          throw new Error("Failed to fetch movies");
        }
        const data = await response.json();
        setMovies(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  // Handle adding a new movie
  const handleAddMovie = async (movieData) => {
    try {
      const response = await fetch("./api/movies", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(movieData),
      });

      if (!response.ok) {
        throw new Error("Failed to add movie");
      }

      const newMovie = await response.json();
      setMovies([...movies, newMovie]);
      setShowAddModal(false);
    } catch (err) {
      console.error("Error adding movie:", err);
      alert("Failed to add movie. Please try again.");
    }
  };

  // Handle editing a movie
  const handleEditMovie = async (movieData) => {
    try {
      const response = await fetch(`./api/movies/${movieData.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(movieData),
      });

      if (!response.ok) {
        throw new Error("Failed to update movie");
      }

      const updatedMovie = await response.json();
      setMovies(
        movies.map((movie) =>
          movie.id === updatedMovie.id ? updatedMovie : movie
        )
      );
      setShowEditModal(false);
      setCurrentMovie(null);
    } catch (err) {
      console.error("Error updating movie:", err);
      alert("Failed to update movie. Please try again.");
    }
  };

  // Handle deleting a movie
  const handleDeleteMovie = async (id) => {
    if (window.confirm("Are you sure you want to delete this movie?")) {
      try {
        const response = await fetch(`./api/movies/${id}`, {
          method: "DELETE",
        });

        if (!response.ok) {
          throw new Error("Failed to delete movie");
        }

        setMovies(movies.filter((movie) => movie.id !== id));
      } catch (err) {
        console.error("Error deleting movie:", err);
        alert("Failed to delete movie. Please try again.");
      }
    }
  };

  // Open edit modal with current movie data
  const openEditModal = (movie) => {
    setCurrentMovie(movie);
    setShowEditModal(true);
  };

  if (loading) {
    return <div className="max-w-7xl mx-auto px-4 py-8">Loading movies...</div>;
  }

  if (error) {
    return <div className="max-w-7xl mx-auto px-4 py-8">Error: {error}</div>;
  }

  return (
    <main className="max-w-7xl mx-auto px-4 py-8">
      <div className="justify-between items-center mb-8 text-center">
        <div>
          <h1 className="text-3xl font-bold mb-2">Entertainment Database</h1>
          <p className="text-gray-600">THIS IS A DESCRIPTION</p>
        </div>
      </div>

      <button
        className="flex items-center bg-black text-white px-4 py-2 rounded text-sm"
        onClick={() => setShowAddModal(true)}
      >
        <svg
          width="20"
          height="20"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          className="mr-2"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M12 6v6m0 0v6m0-6h6m-6 0H6"
          ></path>
        </svg>
        Add Movie
      </button>

      {movies.length === 0 ? (
        <div className="text-center py-12 text-gray-600">
          <p>
            No movies found.{" "}
            {adminView && "Add your first movie to get started!"}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
          {movies.map((movie) => (
            <MovieCard
              key={movie.id}
              movie={movie}
              onEdit={() => openEditModal(movie)}
              onDelete={() => handleDeleteMovie(movie.id)}
            />
          ))}
        </div>
      )}

      {showAddModal && (
        <AddMovieModal
          onClose={() => setShowAddModal(false)}
          onSave={handleAddMovie}
        />
      )}

      {showEditModal && currentMovie && (
        <EditMovieModal
          movie={currentMovie}
          onClose={() => {
            setShowEditModal(false);
            setCurrentMovie(null);
          }}
          onSave={handleEditMovie}
        />
      )}
    </main>
  );
}
