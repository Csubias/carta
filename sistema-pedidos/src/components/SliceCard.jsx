// src/components/SliceCard.jsx
import React from "react";

// El componente SliceCard recibe propiedades desde SelectSlice.jsx
const SliceCard = ({ name, description, price, onClick }) => {
  const handleClick = () => {
    console.log(`Card clicked: ${name}`); // Debugging
    onClick();
  };

  return (
    <div
      className="slice-card"
      onClick={handleClick}
      style={{
        cursor: "pointer",
        border: "1px solid #ddd",
        padding: "10px",
        borderRadius: "5px",
        margin: "10px",
      }}
    >
      <h3>{name}</h3>
      <p>{description}</p>
      <p>${price}</p>
    </div>
  );
};

export default SliceCard;
