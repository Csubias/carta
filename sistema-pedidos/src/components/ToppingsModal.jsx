import React, { useState } from "react";

function ToppingsModal({ product, onClose, onAddToCart }) {
  const [selectedToppings, setSelectedToppings] = useState([]);

  const handleToggleTopping = (topping) => {
    setSelectedToppings((prev) =>
      prev.includes(topping)
        ? prev.filter((t) => t !== topping)
        : [...prev, topping]
    );
  };

  const handleSubmit = () => {
    onAddToCart(selectedToppings);
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h3>
          {product.type === "charola"
            ? "Elige tus toppings para tu charola:"
            : `Elige tus toppings para ${product.name}`}
        </h3>
        <div className="topping-options">
          {/* Suponiendo que tienes una lista de toppings */}
          {["Chocolate", "Nuez", "Fresa", "Crema"].map((topping) => (
            <label key={topping}>
              <input
                type="checkbox"
                checked={selectedToppings.includes(topping)}
                onChange={() => handleToggleTopping(topping)}
              />
              {topping}
            </label>
          ))}
        </div>
        <div className="modal-buttons">
          <button onClick={onClose}>Cerrar</button>
          <button onClick={handleSubmit}>Añadir al Carrito</button>
        </div>
      </div>
    </div>
  );
}

export default ToppingsModal;
