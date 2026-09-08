const SERVER_URL = "http://localhost:5000";

function SwipeCard({ title, item }) {
  return (
    <article className="swipe-card">
      {title !== "Empty" ? (
        <img
          className={
            title === "Bottoms" ? "swipe-card-bottom-image" : (title === "Shoes" ? "swipe-card-shoe-image" : "swipe-card-image")
          }
          src={`${SERVER_URL}${item.image_url}`}
          alt={item.name}
        />
      ) : (
        <div className="swipe-card">
          <img
            className="swipe-card-image"
            src={`${item.image_url}`}
            alt={`${title} placeholder`}
          />
        </div>
      )}
    </article>
  );
}

export default SwipeCard;
