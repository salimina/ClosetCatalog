import { useState } from "react";
import "../styles/itemCard.css";

const SERVER_URL = "http://localhost:5000";

function ItemCard({ item, showDelete, onDeleted }) {
  const [error, setError] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  async function handleDelete() {
    const confirmed = window.confirm(`Delete "${item.name}" from your closet?`);

    if (!confirmed) {
      return;
    }

    setIsDeleting(true);
    setError("");

    try {
      const response = await fetch(
        `http://localhost:5000/api/items/${item.id}`,
        {
          method: "DELETE",
        },
      );

      if (!response.ok) {
        /*
                Error responses from your backend contain JSON,
                but the successful 204 response does not.
            */
        const data = await response.json();

        throw new Error(data.error || "Could not delete item");
      }

      /*
            The database deletion succeeded, so remove the card
            from the Catalog's React state.
            */
      onDeleted(item.id);
    } catch (error) {
      setError(error.message);
    } finally {
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
          <div className="image-placeholder">No photo</div>
        )}

        {/* Dark gradient over the image */}
        <div className="card-gradient" />

        {/* Size box in the top-right */}
        {item.size && <div className="size-info">{item.size}</div>}

        {/* Text over the bottom of the image */}
        <div className="clothing-info">
          <p className="clothing-label">{item.brand || item.category}</p>

          <h2 className="clothing-name">{item.name}</h2>
        </div>

        {/* Only visible during page edit mode */}
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

        {error && <p className="item-card-error">{error}</p>}
      </div>
    </article>
  );
}

export default ItemCard;
