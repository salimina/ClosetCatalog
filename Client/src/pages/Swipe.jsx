const sampleOptions = [
  {
    id: 1,
    name: "Outfit One",
    image: "https://placehold.co/300x400?text=Outfit+One",
  },
  {
    id: 2,
    name: "Outfit Two",
    image: "https://placehold.co/300x400?text=Outfit+Two",
  },
  {
    id: 3,
    name: "Outfit Three",
    image: "https://placehold.co/300x400?text=Outfit+Three",
  },
];

function Swipe() {
  return (
    <div>
      <h1>Swipe Through Options</h1>
      <p>Swipe horizontally to browse outfit options.</p>

      <div className="carousel">
        {sampleOptions.map((option) => (
          <article className="carousel-card" key={option.id}>
            <img src={option.image} alt={option.name} />
            <h2>{option.name}</h2>
          </article>
        ))}
      </div>
    </div>
  );
}

export default Swipe;