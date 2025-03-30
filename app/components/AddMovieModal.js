"use client";

import { useState } from "react";

const AddMovieModal = ({ onClose, onSave }) => {
  const [formData, setFormData] = useState({
    title: "",
    releaseYear: "",
    actors: "",
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      // Convert actors string to array
      const actorsArray = formData.actors
        .split(",")
        .map((actor) => actor.trim());
      onSave({
        title: formData.title,
        releaseYear: Number.parseInt(formData.releaseYear),
        actors: actorsArray,
      });
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg w-11/12 max-w-md max-h-[90vh] overflow-y-auto shadow-lg">
        <div className="flex justify-between items-center p-4 border-b border-gray-200">
          <h2 className="text-xl font-bold">Add New Movie</h2>
          <button className="text-2xl text-gray-600" onClick={onClose}>
            ×
          </button>
        </div>
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
              Save Movie
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddMovieModal;
