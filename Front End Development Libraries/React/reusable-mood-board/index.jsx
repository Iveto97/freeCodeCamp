export function MoodBoardItem({ id, color, image, description }) {
  return (
    <div
      className="mood-board-item"
      style={{ backgroundColor: color }}
      id={`${id}-${description}`}
    >
      <img className="mood-board-image" src={image} />
      <h3 className="mood-board-text">{description}</h3>
    </div>
  );
}

export function MoodBoard() {
  const moods = [
    {
      id: 1,
      color: "#3399ff",
      image: "https://cdn.freecodecamp.org/curriculum/labs/pathway.jpg",
      description: "pathway",
    },
    {
      id: 2,
      color: "#3399ff",
      image: "https://cdn.freecodecamp.org/curriculum/labs/shore.jpg",
      description: "shore",
    },
    {
      id: 3,
      color: "#3399ff",
      image: "https://cdn.freecodecamp.org/curriculum/labs/grass.jpg",
      description: "grass",
    },
    {
      id: 4,
      color: "#3399ff",
      image: "https://cdn.freecodecamp.org/curriculum/labs/ship.jpg",
      description: "ship",
    },
    {
      id: 5,
      color: "#3399ff",
      image: "https://cdn.freecodecamp.org/curriculum/labs/santorini.jpg",
      description: "santorini",
    },
    {
      id: 6,
      color: "#3399ff",
      image: "https://cdn.freecodecamp.org/curriculum/labs/pigeon.jpg",
      description: "pigeon",
    },
  ];
  return (
    <div>
      <h1 className="mood-board-heading">Destination Mood Board</h1>
      <div className="mood-board">
        {moods.map((mood) => (
          <MoodBoardItem
            id={mood.id}
            color={mood.color}
            image={mood.image}
            description={mood.description}
          />
        ))}
      </div>
    </div>
  );
}
