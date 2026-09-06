import { useState } from "react";
import "../styles/ItemCard.css";

const SERVER_URL = "http://localhost:5000";

function ItemCard({ item, showDelete, onDeleted }) {
  const [error, setError] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  async function handleDelete() {
    const confirmed = window.confirm(
      `Delete "${item.name}" from your closet?`
    );

    if (!confirmed) {
      return;
    }

    setIsDeleting(true);
    setError("");

    try {
      const response = await fetch(
        `${SERVER_URL}/api/items/${item.id}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        const data = await response.json();

        throw new Error(data.error || "Could not delete item");
      }

      onDeleted(item.id);
    } catch (error) {
      setError(error.message);
      setIsDeleting(false);
    }
  }

  return (
    <article className="clothing-card">
      <div className="clothing-image-container">
        {item.image_url ? (
          <img
            className="clothing-image"
            src={`${SERVER_URL}${item.image_url}`}
            alt={item.name}
          />
        ) : (
          <div className="image-placeholder">
            No photo
          </div>
        )}

        {showDelete && (
          <button
            type="button"
            className="card-delete-button"
            onClick={handleDelete}
            disabled={isDeleting}
            aria-label={`Delete ${item.name}`}
          >
            {isDeleting ? "Deleting..." : "Delete"}
          </button>
        )}
      </div>

      <div className="clothing-info">
        <h2>{item.name}</h2>
        <p>{item.category}</p>

        {item.color && <p>Color: {item.color}</p>}
        {item.brand && <p>Brand: {item.brand}</p>}
        {item.size && <p>Size: {item.size}</p>}

        {error && (
          <p className="item-card-error">{error}</p>
        )}
      </div>
    </article>
  );
}

export default ItemCard;