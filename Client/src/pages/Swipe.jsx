import { useEffect, useState } from "react";
import Carousel from "../components/Carousel";
import "../styles/swipe.css";

const SERVER_URL = "http://localhost:5000";

const categories = [
  { title: "Tops", value: "tops" },
  { title: "Bottoms", value: "bottoms" },
  { title: "Shoes", value: "shoes" },
];

function Swipe() {
  const [items, setItems] = useState([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await fetch(`${SERVER_URL}/api/items`);

        if (!response.ok) {
          throw new Error("Could not load clothing items.");
        }

        const data = await response.json();
        setItems(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchItems();
  }, []);

  const getItemsByCategory = (category) => {
    return items.filter(
      (item) => item.category?.toLowerCase() === category.toLowerCase(),
    );
  };

  if (isLoading) {
    return <p className="swipe-message">Loading outfits...</p>;
  }

  if (error) {
    return <p className="swipe-error">{error}</p>;
  }

  return (
    <main className="swipe-page">
      <header className="swipe-heading">
        <h1>Build an Outfit</h1>
        <p>Swipe through your closet to create an outfit.</p>
      </header>

      <div className="carousel-stack">
        {categories.map((category) => (
          <Carousel
            key={category.value}
            title={category.title}
            items={getItemsByCategory(category.value)}
          />
        ))}
      </div>
    </main>
  );
}

export default Swipe;
