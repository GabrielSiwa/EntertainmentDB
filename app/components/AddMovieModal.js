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
    <div className="modal-overlay">
      <div className="modal">
        <div className="modal-header">
          <h2>Add New Movie</h2>
          <button className="modal-close" onClick={onClose}>
            ×
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className={errors.title ? "input-error" : ""}
            />
            {errors.title && <p className="error-message">{errors.title}</p>}
          </div>

          <div className="form-group">
            <label htmlFor="releaseYear">Release Year</label>
            <input
              type="text"
              id="releaseYear"
              name="releaseYear"
              value={formData.releaseYear}
              onChange={handleChange}
              className={errors.releaseYear ? "input-error" : ""}
            />
            {errors.releaseYear && (
              <p className="error-message">{errors.releaseYear}</p>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="actors">Actors (comma separated)</label>
            <textarea
              id="actors"
              name="actors"
              value={formData.actors}
              onChange={handleChange}
              className={errors.actors ? "input-error" : ""}
              placeholder="e.g. Tom Hanks, Robin Wright, Gary Sinise"
            />
            {errors.actors && <p className="error-message">{errors.actors}</p>}
          </div>

          <div className="modal-actions">
            <button type="button" className="button-cancel" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="button-save">
              Save Movie
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddMovieModal;
