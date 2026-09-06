import { useState } from "react";

function Wishlist() {
  const [link, setLink] = useState("");

  function handleSubmit(event) {
    event.preventDefault();

    console.log("Wishlist link:", link);

    setLink("");
  }

  return (
    <div>
      <h1>Wishlist</h1>
      <p>Save links to clothing you might want to purchase.</p>

      <form onSubmit={handleSubmit}>
        <label htmlFor="wishlist-link">
          Clothing link
        </label>

        <input
          id="wishlist-link"
          type="url"
          value={link}
          onChange={(event) => setLink(event.target.value)}
          placeholder="https://example.com/clothing-item"
          required
        />

        <button type="submit">
          Add to Wishlist
        </button>
      </form>
    </div>
  );
}

export default Wishlist;