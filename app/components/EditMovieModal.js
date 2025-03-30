"use client"; /*
Author: Lulubelle Fontelo
Date: 30/03/2025  
Description:  
This React component displays a modal form that allows users to edit the details of an existing movie.  
It receives a movie object as input and pre-fills the form fields with the movie's current title, release year,  
and actors. The actors array is converted to a comma-separated string for display. Input validation ensures  
that all fields are filled and that the release year is a valid 4-digit number.  

Inputs:  
- movie: An object containing the movie’s current information (id, title, releaseYear, and actors list).  
- onClose: A function that closes the modal when the Cancel button or close (×) icon is clicked.  
- onSave: A function triggered when the form is submitted with valid data, receiving the updated movie details.  

Processing:  
- Converts the incoming movie data into a local form state on component mount.  
- Validates user input before allowing submission.  
- Converts the actors string back into an array before sending the updated movie data.  

Outputs:  
- A styled modal with a form to edit movie details.  
- On submission, sends the updated movie object to the parent component via the onSave callback.  
*/

import { useState, useEffect } from "react";

const EditMovieModal = ({ movie, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    id: "",
    title: "",
    releaseYear: "",
    actors: "",
  });
  const [errors, setErrors] = useState({});

  // Load movie data into form fields on component mount/update
  useEffect(() => {
    // Convert actors array to string for the form
    const actorsString = Array.isArray(movie.actors)
      ? movie.actors.join(", ")
      : "";

    setFormData({
      id: movie.id,
      title: movie.title || "",
      releaseYear: movie.releaseYear?.toString() || "",
      actors: actorsString,
    });
  }, [movie]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Validate the form fields before submitting
  const validateForm = () => {
    const newErrors = {};
    if (!formData.title.trim()) newErrors.title = "Title is required";
    if (!formData.releaseYear.trim())
      newErrors.releaseYear = "Release year is required";
    if (!/^\d{4}$/.test(formData.releaseYear))
      newErrors.releaseYear = "Release year must be a 4-digit number";
    if (!formData.actors.trim()) newErrors.actors = "Actors are required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission and pass updated movie data to parent
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      // Convert actors string to array
      const actorsArray = formData.actors
        .split(",")
        .map((actor) => actor.trim());
      onSave({
        id: formData.id,
        title: formData.title,
        releaseYear: Number.parseInt(formData.releaseYear),
        actors: actorsArray,
      });
    }
  };

  return (
    // Modal overlay
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      {/* Modal container */}
      <div className="bg-white rounded-lg w-11/12 max-w-md max-h-[90vh] overflow-y-auto shadow-lg">
        {/* Header section */}
        <div className="flex justify-between items-center p-4 border-b border-gray-200">
          <h2 className="text-xl font-bold">Edit Movie</h2>
          <button className="text-2xl text-gray-600" onClick={onClose}>
            ×
          </button>
        </div>

        {/* Form section */}
        <form onSubmit={handleSubmit} className="p-6">
          <div className="mb-5">
            <label htmlFor="title" className="block mb-2 font-medium">
              Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className={`w-full p-2 border ${
                errors.title ? "border-red-500" : "border-gray-300"
              } rounded`}
            />
            {errors.title && (
              <p className="text-red-500 text-sm mt-1">{errors.title}</p>
            )}
          </div>

          {/* Release Year field */}

          <div className="mb-5">
            <label htmlFor="releaseYear" className="block mb-2 font-medium">
              Release Year
            </label>
            <input
              type="text"
              id="releaseYear"
              name="releaseYear"
              value={formData.releaseYear}
              onChange={handleChange}
              className={`w-full p-2 border ${
                errors.releaseYear ? "border-red-500" : "border-gray-300"
              } rounded`}
            />
            {errors.releaseYear && (
              <p className="text-red-500 text-sm mt-1">{errors.releaseYear}</p>
            )}
          </div>

          {/* Actors field */}
          <div className="mb-5">
            <label htmlFor="actors" className="block mb-2 font-medium">
              Actors (comma separated)
            </label>
            <textarea
              id="actors"
              name="actors"
              value={formData.actors}
              onChange={handleChange}
              className={`w-full p-2 border ${
                errors.actors ? "border-red-500" : "border-gray-300"
              } rounded min-h-[100px] resize-y`}
              placeholder="e.g. Tom Hanks, Robin Wright, Gary Sinise"
            />
            {errors.actors && (
              <p className="text-red-500 text-sm mt-1">{errors.actors}</p>
            )}
          </div>

          {/* Action buttons */}
          <div className="flex justify-end gap-3 mt-6">
            <button
              type="button"
              className="px-4 py-2 bg-white border border-gray-300 rounded text-sm"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-black text-white rounded text-sm"
            >
              Update Movie
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditMovieModal;
