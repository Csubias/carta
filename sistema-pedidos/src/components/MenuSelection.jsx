// src/components/MenuSelection.jsx
import React from "react";
import { useNavigate } from "react-router-dom";

function MenuSelection() {
  const navigate = useNavigate();

  const handleSelection = (type) => {
    navigate(`/products/${type}`);
  };

  return (
    <div className="menu-selection">
      <h2>Elige una opción:</h2>
      <button onClick={() => handleSelection("rebanada")}>Rebanada</button>
      <button onClick={() => handleSelection("charola")}>Charola</button>
      <button onClick={() => handleSelection("vaso")}>Vaso</button>
    </div>
  );
}

export default MenuSelection;
