import "../styles/filterSidebar.css";

const categories = ["all", "tops", "bottoms", "dresses", "shoes", "outerwear"];

function FilterSidebar({ selectedCategory, onSelectCategory, categoryCounts }) {
  return (
    <aside className="filter-sidebar">
      {/* <h2>Categories</h2> */}

      <div className="filter-options">
        {categories.map((category) => {
          const label =
            category === "all"
              ? "All Clothes"
              : category.charAt(0).toUpperCase() + category.slice(1);

          return (
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
              <span>{label}</span>

              <span className="category-count">
                {categoryCounts[category] || 0}
              </span>
            </button>
          );
        })}
      </div>
    </aside>
  );
}

export default FilterSidebar;
