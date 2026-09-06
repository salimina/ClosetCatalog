import { useEffect, useState } from "react";
import "../styles/addItemModal.css";

const SERVER_URL = "http://localhost:5000";

const emptyForm = {
  name: "",
  category: "tops",
  color: "",
  brand: "",
  size: "",
};

function AddItemModal({ onClose, onItemAdded }) {
  const [form, setForm] = useState(emptyForm);
  const [photo, setPhoto] = useState(null);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  /*
    Close the modal when the user presses Escape.
  */
  useEffect(() => {
    function handleEscape(event) {
      if (event.key === "Escape") {
        onClose();
      }
    }

    window.addEventListener("keydown", handleEscape);

    return () => {
      window.removeEventListener("keydown", handleEscape);
    };
  }, [onClose]);

  function handleTextChange(event) {
    const { name, value } = event.target;

    setForm((currentForm) => ({
      ...currentForm,
      [name]: value,
    }));
  }

  function handlePhotoChange(event) {
    setPhoto(event.target.files[0] || null);
  }

  async function handleSubmit(event) {
    event.preventDefault();

    setError("");
    setIsSubmitting(true);

    const formData = new FormData();

    formData.append("name", form.name);
    formData.append("category", form.category);
    formData.append("color", form.color);
    formData.append("brand", form.brand);
    formData.append("size", form.size);

    if (photo) {
      formData.append("photo", photo);
    }

    try {
      const response = await fetch(`${SERVER_URL}/api/items`, {
        method: "POST",
        body: formData,
      });

      const newItem = await response.json();

      if (!response.ok) {
        throw new Error(newItem.error || "Could not add item");
      }

      /*
        Give the newly created item to Catalog.jsx.
      */
      onItemAdded(newItem);

      /*
        Close the popup after a successful upload.
      */
      onClose();
    } catch (error) {
      setError(error.message);
    } finally {
      setIsSubmitting(false);
    }
  }

  function handleOverlayClick(event) {
    /*
      Close only if the user clicked the dark background,
      not the form itself.
    */
    if (event.target === event.currentTarget) {
      onClose();
    }
  }

  return (
    <div
      className="modal-overlay"
      onMouseDown={handleOverlayClick}
      role="presentation"
    >
      <section
        className="add-item-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="add-item-title"
      >
        <div className="modal-header">
          <h2 id="add-item-title">Add to Your Closet</h2>

          <button
            type="button"
            className="modal-close-button"
            onClick={onClose}
            aria-label="Close popup"
          >
            ×
          </button>
        </div>

        <form className="add-item-form" onSubmit={handleSubmit}>
          <label>
            Item name

            <input
              name="name"
              type="text"
              value={form.name}
              onChange={handleTextChange}
              placeholder="Black mini dress"
              required
            />
          </label>

          <label>
            Category

            <select
              name="category"
              value={form.category}
              onChange={handleTextChange}
              required
            >
              <option value="shoes">Shoes</option>
              <option value="tops">Tops</option>
              <option value="bottoms">Bottoms</option>
              <option value="outerwear">Outerwear</option>
            </select>
          </label>

          <label>
            Color

            <input
              name="color"
              type="text"
              value={form.color}
              onChange={handleTextChange}
              placeholder="Black"
            />
          </label>

          <label>
            Brand

            <input
              name="brand"
              type="text"
              value={form.brand}
              onChange={handleTextChange}
              placeholder="Aritzia"
            />
          </label>

          <label>
            Size

            <input
              name="size"
              type="text"
              value={form.size}
              onChange={handleTextChange}
              placeholder="Small"
            />
          </label>

          <label>
            Photo

            <input
              name="photo"
              type="file"
              accept="image/*"
              onChange={handlePhotoChange}
              required
            />
          </label>

          {error && (
            <p className="modal-error">
              {error}
            </p>
          )}

          <div className="modal-actions">
            <button
              type="button"
              className="cancel-button"
              onClick={onClose}
            >
              Cancel
            </button>

            <button
              type="submit"
              className="save-button"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Adding..." : "Add Item"}
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}

export default AddItemModal;