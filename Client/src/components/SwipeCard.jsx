const SERVER_URL = "http://localhost:5000";

function SwipeCard({ item }) {
  return (
    <article className="swipe-card">
      {item.image_url ? (
        <img
          className="clothing-image"
          src={`${SERVER_URL}${item.image_url}`}
          alt={item.name}
        />
      ) : (
        <div className="image-placeholder">No photo</div>
      )}

      <div className="swipe-card-details">
        <h3>{item.name}</h3>

        {item.brand && <p>{item.brand}</p>}
        {item.size && <span className="swipe-card-size">{item.size}</span>}
      </div>
    </article>
  );
}

export default SwipeCard;
