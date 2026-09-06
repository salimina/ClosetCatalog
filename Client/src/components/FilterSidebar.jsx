import "../styles/filterSidebar.css";

const categories = ["all", "shoes", "tops", "bottoms", "outerwear"];

function FilterSidebar({ selectedCategory, onSelectCategory }) {
  return (
    <aside className="filter-sidebar">
      <h2>Categories</h2>

      <div className="filter-options">
        {categories.map((category) => (
          <button
            key={category}
            type="button"
            className={
              selectedCategory === category
                ? "filter-button active"
                : "filter-button"
            }
            onClick={() => onSelectCategory(category)}
          >
            {category === "all"
              ? "All Clothes"
              : category.charAt(0).toUpperCase() + category.slice(1)}
          </button>
        ))}
      </div>
    </aside>
  );
}

export default FilterSidebar;
