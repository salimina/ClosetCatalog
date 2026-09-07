import { useEffect, useState } from "react";
import "../styles/wishlist.css";

const statusFilters = ["all", "need", "want", "maybe"];
const SERVER_URL = "http://localhost:5000";

const emptyForm = {
  name: "",
  link: "",
  brand: "",
  price: "",
  category: "",
  note: "",
  status: "want",
};

function Wishlist() {
  const [items, setItems] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [formData, setFormData] = useState(emptyForm);

  useEffect(() => {
    async function loadWishlist() {
      try {
        const response = await fetch(`${SERVER_URL}/api/wishlist`);
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || "Could not load wishlist");
        }

        setItems(data);
      } catch (error) {
        setError(error.message);
      }
    }

    loadWishlist();
  }, []);
  const [error, setError] = useState("");

  const filteredItems =
    selectedStatus === "all"
      ? items
      : items.filter((item) => item.status === selectedStatus);

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData((currentData) => ({
      ...currentData,
      [name]: value,
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");

    try {
      const response = await fetch(`${SERVER_URL}/api/wishlist`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Could not add wishlist piece");
      }

      setItems((currentItems) => [data, ...currentItems]);
      setFormData(emptyForm);
      setIsFormOpen(false);
    } catch (error) {
      setError(error.message);
    }
  }

  return (
    <main className="wishlist-page">
      <header className="wishlist-header">
        <div>
          <p className="wishlist-count">
            {items.length} {items.length === 1 ? "piece" : "pieces"} coveted
          </p>
        </div>

        <div className="wishlist-actions">
          <div className="status-filters">
            {statusFilters.map((status) => (
              <button
                key={status}
                type="button"
                className={
                  selectedStatus === status
                    ? "status-filter active"
                    : "status-filter"
                }
                onClick={() => setSelectedStatus(status)}
              >
                {status}
              </button>
            ))}
          </div>

          <button
            type="button"
            className="add-piece-button"
            onClick={() => setIsFormOpen((current) => !current)}
          >
            {isFormOpen ? "Close" : "+ Add Piece"}
          </button>
        </div>
      </header>

      {isFormOpen && (
        <form className="wishlist-form" onSubmit={handleSubmit}>
          <input
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Piece name"
            required
          />

          <input
            name="link"
            type="url"
            value={formData.link}
            onChange={handleChange}
            placeholder="Product link"
            required
          />

          <input
            name="brand"
            value={formData.brand}
            onChange={handleChange}
            placeholder="Brand"
          />

          <input
            name="price"
            type="number"
            min="0"
            step="0.01"
            value={formData.price}
            onChange={handleChange}
            placeholder="Price"
          />

          <input
            name="category"
            value={formData.category}
            onChange={handleChange}
            placeholder="Category"
          />

          <input
            name="note"
            value={formData.note}
            onChange={handleChange}
            placeholder="Note"
          />

          <select name="status" value={formData.status} onChange={handleChange}>
            <option value="need">Need</option>
            <option value="want">Want</option>
            <option value="maybe">Maybe</option>
          </select>

          <button type="submit">Save Piece</button>
        </form>
      )}
      {error && <p className="wishlist-error">{error}</p>}
      <div className="wishlist-table-container">
        <table className="wishlist-table">
          <thead>
            <tr>
              <th>Piece</th>
              <th>Brand</th>
              <th>Price</th>
              <th>Category</th>
              <th>Note</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {filteredItems.map((item) => (
              <tr key={item.id}>
                <td>
                  <a
                    href={item.link}
                    target="_blank"
                    rel="noreferrer"
                    className="piece-link"
                  >
                    {item.name} ↗
                  </a>
                </td>

                <td>{item.brand || "—"}</td>
                <td>
                  {item.price_cents === null
                    ? "—"
                    : new Intl.NumberFormat("en-US", {
                        style: "currency",
                        currency: "USD",
                      }).format(item.price_cents / 100)}
                </td>
                <td>{item.category || "—"}</td>
                <td>{item.note || "—"}</td>

                <td>
                  <span className={`wishlist-status ${item.status}`}>
                    {item.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filteredItems.length === 0 && (
          <p className="empty-wishlist">No wishlist pieces in this category.</p>
        )}
      </div>
    </main>
  );
}

export default Wishlist;
