import { useEffect, useMemo, useState } from "react";
import FilterSidebar from "../components/FilterSidebar";
import AddItemModal from "../components/AddItemModal";
import ItemCard from "../components/ItemCard";
import "../styles/catalog.css";

const SERVER_URL = "http://localhost:5000";

function Catalog() {
  const [items, setItems] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [error, setError] = useState("");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);

  const categoryCounts = useMemo(() => {
    const counts = {
      all: items.length,
      tops: 0,
      bottoms: 0,
      dresses: 0,
      shoes: 0,
      outerwear: 0,
    };

    items.forEach((item) => {
      const category = item.category?.toLowerCase();

      if (category in counts && category !== "all") {
        counts[category] += 1;
      }
    });

    return counts;
  }, [items]);

  useEffect(() => {
    async function loadItems() {
      try {
        const response = await fetch(`${SERVER_URL}/api/items`);
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || "Could not load closet");
        }

        setItems(data);
      } catch (error) {
        setError(error.message);
      }
    }

    loadItems();
  }, []);

  function handleItemAdded(newItem) {
    setItems((currentItems) => [newItem, ...currentItems]);
  }
  const filteredItems =
    selectedCategory === "all"
      ? items
      : items.filter(
          (item) => item.category.toLowerCase() === selectedCategory,
        );

  function handleItemDeleted(deletedItemId) {
    setItems((currentItems) =>
      currentItems.filter((item) => item.id !== deletedItemId),
    );
  }

  return (
    <div className="catalog-layout">
      <FilterSidebar
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
        categoryCounts={categoryCounts}
      />

      <section className="catalog-content">
        <div className="catalog-heading">
          <div>
            <h1>My Closet</h1>

            {isEditMode && (
              <p className="edit-mode-message">
                Select the items you want to delete.
              </p>
            )}
          </div>

          <button
            type="button"
            className={
              isEditMode ? "catalog-save-button" : "catalog-edit-button"
            }
            onClick={() => setIsEditMode((currentMode) => !currentMode)}
          >
            {isEditMode ? "Save" : "Edit"}
          </button>
        </div>

        <p className="catalog-count">
          Showing {filteredItems.length} item
          {filteredItems.length !== 1 && "s"}
        </p>

        {error && <p className="error-message">{error}</p>}

        {!error && filteredItems.length === 0 && (
          <p>No items found in this category.</p>
        )}

        <div className="clothing-grid">
          {filteredItems.map((item) => (
            <ItemCard
              key={item.id}
              item={item}
              showDelete={isEditMode}
              onDeleted={handleItemDeleted}
            />
          ))}
        </div>
      </section>
      <button
        type="button"
        className="floating-add-button"
        onClick={() => setIsAddModalOpen(true)}
        aria-label="Add clothing item"
      >
        +
      </button>

      {isAddModalOpen && (
        <AddItemModal
          onClose={() => setIsAddModalOpen(false)}
          onItemAdded={handleItemAdded}
        />
      )}
    </div>
  );
}

export default Catalog;
